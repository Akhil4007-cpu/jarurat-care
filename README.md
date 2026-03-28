# Jarurat Care (Mini Healthcare Support Web App)

Concept-level web app for a healthcare NGO/community team.

## What it does

- **Patient Support Form**: patients submit a support request + urgency.
- **Volunteer Registration**: volunteers submit skills + availability.
- **Automation/AI idea (FAQ Chatbot)**: a built-in Healthcare Assistant answers common health FAQs instantly.

## AI / Automation idea

The chatbot in `script.js` uses a **keyword-based knowledge base** (30+ topics like `fever`, `headache`, `emergency`, `mental health`, etc.).

When a user message contains a keyword, it returns the matching guidance. This reduces repeated FAQ workload for NGO staff and offers 24/7 basic information.

## Tech stack

- **HTML/CSS/JavaScript** (static site)
- **LocalStorage** (demo storage for submitted forms)

## NGO use-case

- Collect patient needs in a structured format
- Onboard volunteers quickly
- Provide instant FAQ responses via chatbot

## Run locally

- Open `index.html` in a browser

## Deploy (Vercel / Netlify)

- **Vercel**: Import the GitHub repo in Vercel and deploy.
- **Netlify**: New site from Git → select repo → deploy.
