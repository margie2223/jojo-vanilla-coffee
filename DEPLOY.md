# 🚀 Deploy JOJO Vanilla & Coffee to Netlify

Your site is **production-ready** — the build succeeds, the config is committed, and Netlify CLI is installed. Pick whichever path below works best for you.

---

## Option A — Netlify CLI (fastest, no GitHub needed) ⚡

Best if you just want the site live right now without setting up a Git repo.

### 1. Login to Netlify (opens your browser)

```bash
netlify login
```

Click "Authorize" in the browser window that opens. This connects the CLI to your `margie-mk49` team.

### 2. Initialize the site (links this folder to a Netlify site)

```bash
cd /home/z/my-project
netlify init
```

Choose:
- **+ Create & configure a new site**
- Select your team: **margie-mk49**
- Site name: `jojo-vanilla-coffee` (or whatever you like)
- Build command: `bun run build` (auto-detected from netlify.toml)
- Publish directory: `.next` (auto-detected)

### 3. Deploy to production 🚀

```bash
netlify deploy --build --prod
```

When it finishes, you'll get a live URL like `https://jojo-vanilla-coffee.netlify.app` — your site is public!

### 4. Future updates

Every time you want to push changes:

```bash
netlify deploy --build --prod
```

---

## Option B — GitHub + Netlify Dashboard (best for ongoing updates) 🔄

Best if you want automatic deploys every time you edit code.

### 1. Push this project to a GitHub repo

```bash
# Create a new repo at https://github.com/new (name it e.g. jojo-vanilla-coffee, set to Public or Private)
# Then push:
cd /home/z/my-project
git remote add origin https://github.com/YOUR_USERNAME/jojo-vanilla-coffee.git
git push -u origin main
```

### 2. Connect to Netlify

1. Go to **https://app.netlify.com/start**
2. Click **Import from Git** → **GitHub**
3. Authorize Netlify to access your GitHub
4. Pick the `jojo-vanilla-coffee` repo
5. Pick your team: **margie-mk49**
6. Netlify auto-detects Next.js and reads `netlify.toml` — no config needed
7. Click **Deploy site**

### 3. Future updates

Just `git push` to GitHub — Netlify auto-rebuilds and deploys in ~60 seconds.

---

## Option C — Drag & Drop (simplest, but limited) 🖱️

⚠️ Not recommended for Next.js sites (requires Netlify's Next.js runtime plugin, which only works via CLI or Git deploy). Use Option A or B instead.

---

## After deploying

Once your site is live:

- **Custom domain**: In the Netlify dashboard → Site settings → Domain management → Add custom domain (e.g. `jojovanilla.com`)
- **HTTPS**: Netlify auto-provisions a free SSL certificate
- **Form submissions**: If you add a contact form later, Netlify auto-detects it
- **Analytics**: Enable in Site settings → Analytics

## Troubleshooting

| Issue | Fix |
|---|---|
| Build fails on Netlify | Check the deploy log; common cause is missing env vars (Site settings → Environment variables) |
| Images don't load | Verify `/public/images/*` is committed to git |
| WhatsApp links don't work | They open `wa.me/256704438107` — make sure the number has country code, no `+` |
| Site shows old version | Run `netlify deploy --build --prod` again, or push a new commit to GitHub |

---

**Your site is ready to ship.** 💚
