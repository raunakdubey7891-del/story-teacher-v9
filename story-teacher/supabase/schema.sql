-- Story Teacher schema with Supabase Auth.
-- Run this first in the Supabase SQL editor, then run seed.sql. Safe to re-run, and safe on a project that used the older prototype schema.

-- 1. Curriculum (public read) -------------------------------------------------------------
create table if not exists classes(id text primary key,name text not null,level text not null,blurb text,sort int default 0);
create table if not exists subjects(id text primary key,class_id text not null references classes(id) on delete cascade,name text not null,stream text,sort int default 0);
create table if not exists chapters(id text primary key,subject_id text not null references subjects(id) on delete cascade,name text not null,sort int default 0);
create table if not exists topics(id text primary key,chapter_id text not null references chapters(id) on delete cascade,name text not null,description text default '',subtopics jsonb default '[]',sort int default 0);
alter table topics add column if not exists description text default '';
create table if not exists topic_content(topic_id text references topics(id) on delete cascade,language text not null default 'English',content jsonb not null,primary key(topic_id,language));

-- 2. Students: one row per signed-in user (id = auth user id) ----------------------------------
create table if not exists students(id uuid primary key,created_at timestamptz default now());
alter table students add column if not exists name text;
-- Rows from the old prototype used random device ids and cannot belong to a real user. Remove them before linking to auth.
delete from students where id not in (select id from auth.users);
alter table students drop constraint if exists students_id_fkey;
alter table students add constraint students_id_fkey foreign key(id) references auth.users(id) on delete cascade;

create table if not exists topic_progress(student_id uuid references students(id) on delete cascade,topic_id text references topics(id) on delete cascade,status text not null check(status in('not_started','learning','mastered')),updated_at timestamptz default now(),primary key(student_id,topic_id));
create table if not exists quiz_results(id bigserial primary key,student_id uuid references students(id) on delete cascade,topic_id text references topics(id) on delete cascade,score int not null,total int not null,correct jsonb default '[]',missed jsonb default '[]',created_at timestamptz default now());
create table if not exists weak_concepts(student_id uuid references students(id) on delete cascade,topic_id text references topics(id) on delete cascade,concept text not null,created_at timestamptz default now(),primary key(student_id,topic_id,concept));
create index if not exists quiz_results_student on quiz_results(student_id,created_at);

-- 3. Create the student row automatically when someone signs up (email or Google) -----------------
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.students(id,name) values(new.id,coalesce(new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'name')) on conflict(id) do nothing;
  return new;
end;$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
-- People who already signed up before this ran:
insert into students(id) select id from auth.users on conflict do nothing;

-- 4. Row level security -----------------------------------------------------------------
alter table classes enable row level security;alter table subjects enable row level security;alter table chapters enable row level security;alter table topics enable row level security;alter table topic_content enable row level security;
alter table students enable row level security;alter table topic_progress enable row level security;alter table quiz_results enable row level security;alter table weak_concepts enable row level security;

-- Remove the old open prototype policies, if they exist.
drop policy if exists "proto students" on students;drop policy if exists "proto progress" on topic_progress;drop policy if exists "proto results" on quiz_results;drop policy if exists "proto weak" on weak_concepts;

-- Curriculum: anyone can read, nobody can write from the browser.
drop policy if exists "read classes" on classes;create policy "read classes" on classes for select using(true);
drop policy if exists "read subjects" on subjects;create policy "read subjects" on subjects for select using(true);
drop policy if exists "read chapters" on chapters;create policy "read chapters" on chapters for select using(true);
drop policy if exists "read topics" on topics;create policy "read topics" on topics for select using(true);
drop policy if exists "read content" on topic_content;create policy "read content" on topic_content for select using(true);

-- Student data: each signed-in user can only see and change their own rows.
drop policy if exists "own student" on students;create policy "own student" on students for all to authenticated using(id=(select auth.uid())) with check(id=(select auth.uid()));
drop policy if exists "own progress" on topic_progress;create policy "own progress" on topic_progress for all to authenticated using(student_id=(select auth.uid())) with check(student_id=(select auth.uid()));
drop policy if exists "own results" on quiz_results;create policy "own results" on quiz_results for all to authenticated using(student_id=(select auth.uid())) with check(student_id=(select auth.uid()));
drop policy if exists "own weak" on weak_concepts;create policy "own weak" on weak_concepts for all to authenticated using(student_id=(select auth.uid())) with check(student_id=(select auth.uid()));
