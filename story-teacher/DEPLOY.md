# Deploy Story Teacher: GitHub + Netlify + Supabase

Do the steps in this order. Total time is about 20 minutes.

## 1. Supabase (database + login)

1. Go to https://supabase.com, create a project and wait for it to finish setting up.
2. **SQL Editor > New query.** Paste all of `supabase/schema.sql` and click **Run**.
3. New query again. Paste all of `supabase/seed.sql` and click **Run**.
   It is a large file (about 225 KB). If the editor struggles, run `npm run seed:sql` to regenerate it, then split it into two or three parts at a blank line between statements and run each part.
4. **Authentication > Sign In / Providers (or Providers) > Email:** keep Email **enabled** and turn **Confirm email OFF**.
   This is what makes a new student signed in instantly after sign up. If confirmation stays on, students must click an email link first.
5. **Project Settings > API:** copy the **Project URL** and the **anon public** key. You need them in step 4.
   Never use the `service_role` key in this app.

## 2. Google sign-in

1. Go to https://console.cloud.google.com and create or pick a project.
2. **APIs & Services > OAuth consent screen:** choose External, fill in the app name and your email, save.
3. **APIs & Services > Credentials > Create credentials > OAuth client ID > Web application.**
   - **Authorized redirect URIs:** `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`
     (Supabase shows the exact URL on the Google provider page.)
   - **Authorized JavaScript origins:** `http://localhost:5173` and, later, your Netlify URL.
4. Copy the **Client ID** and **Client secret**.
5. In Supabase go to **Authentication > Sign In / Providers > Google**, switch it on and paste both values.
6. While the consent screen is in "Testing", only test users you add can sign in. Click **Publish app** when you are ready for everyone.

## 3. GitHub

```bash
cd story-teacher
git init
git add .
git commit -m "Story Teacher"
git branch -M main
git remote add origin https://github.com/YOUR-NAME/story-teacher.git
git push -u origin main
```

`.env` is in `.gitignore`, so your keys are not uploaded.

## 4. Netlify

1. https://app.netlify.com > **Add new site > Import an existing project > GitHub** and pick the repo.
2. Build settings are read from `netlify.toml`: command `npm run build`, publish directory `dist`.
3. **Site configuration > Environment variables**, add:
   - `VITE_SUPABASE_URL` = your Project URL
   - `VITE_SUPABASE_ANON_KEY` = your anon public key
4. Deploy. Netlify gives you a URL like `https://your-site.netlify.app`.
   These variables are baked in at build time, so if you add or change them later, trigger a new deploy.

## 5. Tell Supabase your site address

**Authentication > URL Configuration:**
- **Site URL:** `https://your-site.netlify.app`
- **Redirect URLs:** add `https://your-site.netlify.app/**` and `http://localhost:5173/**`

Also add the Netlify URL to the Google client's **Authorized JavaScript origins** (step 2.3).
Do the same for a custom domain if you add one.

## 6. Test

1. Open the site and click **Sign up**. Create an account with email. You should land inside the app, already signed in.
2. Sign out, then **Sign in with Google**.
3. Finish a quiz. In Supabase **Table Editor** you should see rows in `quiz_results` and `topic_progress` under your user id.

## Run locally

```bash
cp .env.example .env     # then fill in the two values
npm install
npm run dev              # http://localhost:5173
```

Without the two values the app still runs as a local guest with no login.

## Troubleshooting

| Problem | Fix |
|---|---|
| After sign up it says "check your email" | Turn **Confirm email** off (step 1.4). |
| Google says `redirect_uri_mismatch` | The redirect URI in Google must be exactly `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`. |
| Google sign-in returns to the wrong site or `localhost` | Fix **Site URL** and **Redirect URLs** (step 5). |
| "Google sign-in is not turned on yet" | Enable the Google provider in Supabase (step 2.5). |
| Page not found on refresh | Keep `netlify.toml` / `public/_redirects` in the repo. |
| Progress does not save | Check both `VITE_` variables on Netlify, then redeploy. Also confirm `schema.sql` ran without errors. |
| Blank curriculum | Run `seed.sql` (step 1.3). |
