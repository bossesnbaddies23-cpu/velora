
# Velora AI SaaS (Render + Cloudflare Deployment)

## Overview

Velora is a simple AI web app with:

* Node.js backend
* OpenAI integration
* Static frontend UI

This project is designed to deploy on:

* Render (backend hosting)
* Cloudflare (domain DNS)

---

## Requirements

* Node.js
* OpenAI API key
* Render account
* Cloudflare domain connected

---

## Setup (Local - optional)

1. Install dependencies:

```
npm install
```

2. Create `.env` file:

```
OPENAI_API_KEY=sk-xxxxx
```

3. Run:

```
node server.js
```

4. Open:

```
http://localhost:3000
```

---

## Deploy to Render

1. Push this repo to GitHub

2. In Render:

* New → Web Service
* Connect repo

3. Use:

* Build Command:

```
npm install
```

* Start Command:

```
node server.js
```

4. Add Environment Variable:

```
OPENAI_API_KEY=sk-xxxxx
```

5. Deploy

---

## Connect Domain (Cloudflare)

Go to DNS and add:

CNAME:

* Name: @
* Target: your-app.onrender.com

CNAME:

* Name: www
* Target: your-app.onrender.com

⚠️ IMPORTANT:

* No https
* No trailing slash

---

## Add Domain in Render

In Render:

* Settings → Custom Domains
* Add:

  * bossesnbaddies.com
  * [www.bossesnbaddies.com](http://www.bossesnbaddies.com)

---

## Done

Your app will be live at:
https://bossesnbaddies.com
