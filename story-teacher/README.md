# Story Teacher

Stories, practice, quizzes and re-learning for Play Group to Class 5, in English. Sign up and sign in with email or Google (Supabase Auth).

**To publish with GitHub + Netlify + Supabase, follow [DEPLOY.md](./DEPLOY.md).**

---

AI-powered learning platform, Play Group to Class 5. React + Vite + TypeScript + Tailwind + React Router + Supabase (optional).

## Run locally
```
npm install
npm run dev
```
Open the URL Vite prints. The app works fully offline with no setup: it uses local curriculum data and saves progress in localStorage.

## Connect Supabase (optional)
1. Create a project at supabase.com.
2. SQL editor: run `supabase/schema.sql`, then `supabase/seed.sql`.
3. Copy `.env.example` to `.env` and fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (Project Settings, API).
4. Restart `npm run dev`.

With the keys set, the curriculum and lesson content load from the database, and topic progress, quiz results and weak concepts save per student (a device-generated id). If the database is unreachable the app falls back to local data and shows a toast.

After editing `src/data/curriculum.ts`, regenerate the seed with `npm run seed:sql` (Node 22.6+), then run the new `seed.sql`.

**Security note:** there is no login yet, so student tables are open to the anon key (see the policies in `schema.sql`). Add Supabase Auth and tighten them to `student_id = auth.uid()` before real students use it.


## Look and feel
Dark, minimal theme. Colours are tokens in `tailwind.config.js` (`paper` page, `surface` cards, `ink` text, `sun` the one warm accent). Headings use Nunito (rounded, friendly); story scenes are night-sky storybook illustrations tinted per subject (`src/components/SceneArt.tsx`).

## Deploy publicly
The app is a static site (`npm run build` creates `dist/`). It works with no backend; Supabase is optional.

**Vercel (easiest):** push this folder to a GitHub repo, then at vercel.com choose Add New, Project, import the repo, and click Deploy. Framework Vite is detected; `vercel.json` already handles page refreshes. You get a public `https://<name>.vercel.app` link.

**Netlify:** same idea (Add new site, Import from Git). `netlify.toml` and `public/_redirects` are included. Or run `npm run build` and drag the `dist` folder onto app.netlify.com/drop.

**Optional Supabase:** add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in the host's settings, then redeploy. Read the security note above first: without login, student tables are open to anyone with the key.

## Routes
`/` landing, `/classes`, `/subjects`, `/chapters`, `/topics`, `/learn`, `/story`, `/quiz`, `/result`, `/reteach`, `/dashboard`

## Where things live
- `src/data/classes/*.ts`: **the curriculum and all story content**, one file per class (`play-group.ts` ... `class-5.ts`). Each topic is `[name, description, storyTitle, scenes]`, so every topic has its own description and slides that follow it. Scene format: `'emoji|scene title|scene text'`. Only Play Group to Class 5 exist.
- `src/data/curriculum.ts`: builds ids, subtopics (taken from the scene titles) and `topicContent` from those files
- `src/data/stories/quizzes.ts`: optional quiz and re-learn lessons, keyed by `class|subject|chapter|topic`
- `src/components/SceneArt.tsx`: the illustrated, animated scene (sky, sun or moon, clouds, hills, bobbing characters), themed per subject, no image files needed
- `src/types/curriculum.ts`: types
- `src/store.tsx`: app state, localStorage, database sync
- `src/lib/db.ts`: every Supabase call
- `src/lib/supabase.ts`: client (null when env vars are missing)
- `src/App.tsx`: routes only
- `src/pages/*.tsx`: one file per screen
- `src/components/ui.tsx`: shared building blocks
- `src/components/layout/`: Nav and Footer
- `src/hooks/useCtx.ts`: resolves the selected class, subject, chapter and topic from the store
- `supabase/`: `schema.sql` (now with `topics.description`), `seed.sql`
- `scripts/check-content.ts`: `node --experimental-strip-types scripts/check-content.ts` checks every topic has a description, 4+ scenes and valid emoji
- `DESIGN-reference/DESIGN.md`: Stitch design system

## Content status
154 topics across 9 classes (Play Group to Class 5), 616 story scenes. Each class has different, age-appropriate topics: early classes cover sounds, letters, numbers, colours, my world; Classes 1 to 5 cover Mathematics, English, EVS and Hindi at their own level. Stories have a read-aloud button (browser speech, English and Hindi). Quiz, practice and re-learn exist only for Class 1 > EVS > Plants > Introduction to Plants; other topics show "coming soon" for those modes.

Re-run `npm run seed:sql`, then run `schema.sql` (it adds the new `description` column) and `seed.sql` in Supabase after any content change.

## Not built yet
Authentication, real AI generation, translated lesson text (language selection works, translations need rows in `topic_content`), payments, teacher/admin tools.


## Learning modes
Every topic has four modes: **Story**, **Practice**, **Quiz** and **Re-learn**.

- Questions are generated from the topic's own story scenes (`src/lib/questions.ts`), so every topic works without hand-written quizzes. A new set is made each time.
- **Practice** has three levels: Easy (recall, true/false), Medium (fill in the missing word or number), Hard (match a sentence to its scene, scene order, tricky fill-ins). 5 questions, hints, and instant feedback.
- **Quiz** is 6 mixed questions (2 easy, 2 medium, 2 hard) and saves a result.
- **Re-learn** takes the concepts (scene titles) missed in Practice or Quiz, shows the scene again, then asks a quick check until it is right.
- Hand-written questions in `src/data/stories/quizzes.ts` are still used if present (added to Medium and the Quiz).
- Weak concepts and best practice scores are saved in the browser (localStorage). Quiz results also sync to Supabase when it is configured.

Run `node --experimental-strip-types scripts/check-content.ts` to check that every topic produces valid questions.

## Accounts
- `/signup` and `/signin` use Supabase Auth (email + password, and Google). A new student is signed in right after sign up.
- All learning pages need a signed-in student. Without Supabase keys the app runs as a local guest.
- Each student's progress is saved per account in the browser, and synced to Supabase with row level security (`supabase/schema.sql`), so students only ever see their own data.
