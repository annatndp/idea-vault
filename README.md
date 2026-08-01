# Kho ý tưởng — private PWA + Supabase

An installable web app to save TikTok / Instagram / YouTube links by category,
private to you, synced across your phone and laptop via Supabase.

## Files
- `index.html` — the app (with login)
- `manifest.webmanifest`, `sw.js` — makes it installable + offline
- `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` — app icons
- `supabase-setup.sql` — run once to create the private database

## Setup (once)

### 1. Supabase — database + your account
1. supabase.com → **New project** (EU region, e.g. Frankfurt/Stockholm). Save the DB password.
2. **SQL Editor → New query** → paste `supabase-setup.sql` → **Run**.
3. **Authentication → Users → Add user** → enter YOUR email + a password → tick **Auto Confirm User** → create. (This is your one login.)
4. **Authentication → Sign In / Providers → Email** (or Auth → Settings): turn **OFF "Allow new users to sign up"** so nobody else can register.
5. **Project Settings → API** → copy **Project URL** and the **anon public** key.

### 2. Put the keys in the app
In `index.html`, near the bottom `<script>`:
```
const SUPABASE_URL = "PASTE_SUPABASE_URL_HERE";
const SUPABASE_ANON_KEY = "PASTE_SUPABASE_ANON_KEY_HERE";
```
Paste your two values, save.

### 3. GitHub Pages — hosting
1. New **public** repo (e.g. `idea-vault`) → **Add file → Upload files** → drag in all files → Commit.
2. **Settings → Pages → Deploy from a branch → main / (root) → Save.**
3. After ~1 min you get `https://YOUR-USERNAME.github.io/idea-vault/`.

> Public repo is fine: the anon key is meant to be public, and Row Level Security + your login are what keep the data private. Anyone opening your URL just sees a login screen.

### 4. Install + log in (once per device)
- **iPhone (Safari):** open the URL → Share → **Add to Home Screen** → open it → log in.
- **Android (Chrome):** open the URL → **Install app** → open it → log in.
- **Laptop:** open the URL → install from the address bar → log in.

You log in a single time on each device; the session is remembered after that.

## Saving with the fewest steps
- **Android:** TikTok/IG **Share → Kho ý tưởng** → app opens with the link filled → pick a category → Lưu.
- **iPhone:** Share → **Copy link** → open app → **📋 Dán link** → pick a category → Lưu.
  (iOS blocks share-target for web apps — ask me for a one-tap iOS Shortcut.)
