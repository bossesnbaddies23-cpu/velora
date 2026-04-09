
- The main persona text lives in `config/channel-personality.txt`.
- The server loads that file automatically unless `CHANNEL_PERSONALITY` is set in your environment.
- Edit the text file any time you want to change the assistant's vibe without editing app logic.

Free deployment on Render

1. Put this project in a GitHub repo.
2. Create a free Render account and choose `New +` then `Blueprint`.
3. Connect the repo and let Render detect `render.yaml`.
4. Add your secret environment variables in Render:
   - `GROQ_API_KEY` if using Groq
   - `OPENAI_API_KEY` if using OpenAI
   - `ELEVENLABS_API_KEY` if you want premium voice output
   - `CHANNEL_PERSONALITY` to control the assistant's style
5. Deploy and open `/youtube.html` on your Render URL.

Static frontend plus API backend

- If you want the page itself to open instantly without Render's wake-up screen, host `public/` as a static site and keep the API on a separate backend.
- The frontend supports a separate backend URL through `?apiBase=https://your-api-host` and stores that backend URL for later visits.
- Example: `https://your-static-site.example/youtube.html?apiBase=https://your-api-host`
- Set `API_ALLOWED_ORIGINS` on the backend to a comma-separated list of allowed frontend origins.
- This removes the slow first paint from a sleeping Render web service, even if the API backend is still on Render.


Custom domain: bossesandbaddies.com

If you bought `bossesandbaddies.com`, connect it with one of these fast paths.

Render path (recommended if you deploy with `render.yaml`)

1. Open your Render service dashboard.
2. Go to **Settings → Custom Domains**.
3. Add:
   - `bossesandbaddies.com`
   - `www.bossesandbaddies.com`
4. Render will show DNS targets. In your domain registrar DNS panel, create the records Render asks for (usually a CNAME for `www` and either an ALIAS/ANAME/A record for apex).
5. Wait for DNS propagation, then click **Verify** in Render.
6. In Render, enable redirect from `www` to apex (or apex to `www`) so only one canonical host is used.
7. Set backend CORS env var so your site can call the API:
   - `API_ALLOWED_ORIGINS=https://bossesandbaddies.com,https://www.bossesandbaddies.com`
8. Redeploy once after updating env vars.

Cloudflare Worker path (if using `wrangler.toml`)

1. In Cloudflare DNS for `bossesandbaddies.com`, add your Worker custom domain route in the dashboard (Workers & Pages → your worker → Triggers → Custom Domains).
2. Add both hosts:
   - `bossesandbaddies.com`
   - `www.bossesandbaddies.com`
3. Keep the DNS records proxied (orange cloud) so traffic reaches the Worker.
4. Deploy your worker again: `npx wrangler deploy`.

Quick verification

- `https://bossesandbaddies.com/healthz` should return OK.
- `https://bossesandbaddies.com/` should load your homepage.
- If SSL is pending, wait a few minutes and retry.

Cloudflare Worker deploy

- The repo includes `wrangler.toml` and `worker/index.mjs` for a single Cloudflare deployment that serves both the static frontend and the `/api/*` backend routes.
- The frontend will prefer same-origin `/api/*` when `/healthz` is available, and otherwise fall back to the current Render backend.
- By default, the Worker uses Cloudflare Workers AI for chat if the `AI` binding is present, so you can deploy chat without Groq or OpenAI secrets.
- By default, the Worker also uses Cloudflare Workers AI text-to-speech with `@cf/deepgram/aura-2-en` and speaker `luna` when ElevenLabs is not configured.
- To deploy the Worker version:
  - Install Wrangler if needed: `npm install -D wrangler`
  - Log in to Cloudflare: `npx wrangler login`
  - Optional secrets if you want external providers instead of Workers AI:
    - `npx wrangler secret put GROQ_API_KEY`
    - `npx wrangler secret put OPENAI_API_KEY`
    - `npx wrangler secret put ELEVENLABS_API_KEY`
  - Set optional values in the Cloudflare dashboard or as Worker vars:
    - `PROVIDER`
    - `OPENAI_MODEL`
    - `ELEVENLABS_VOICE_ID`
    - `CHANNEL_PERSONALITY`
    - `CF_TTS_MODEL`
    - `CF_TTS_SPEAKER`
  - Deploy: `npx wrangler deploy`

Important notes

- The host can publish the site for free, but AI usage may still cost money depending on your provider limits.
