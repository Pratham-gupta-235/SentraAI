# SentraAI Frontend

A responsive React + Vite SOC dashboard starter with fictional demonstration data.

## Requirements
- Node.js 20.19+ or 22.12+ recommended
- npm

## Run locally
Open this folder in a terminal and run these commands one at a time:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Verify the production build
```bash
npm run build
npm run preview
```

## What's included
- Overview, Alerts, Investigations, Investigation Dossier, Threat Intelligence, MITRE ATT&CK, and Settings pages
- Responsive dark SOC UI
- Fictional mock data and an API placeholder for later backend integration

## Important
- The UI currently uses local mock data. It does not connect to Wazuh, VirusTotal, Neo4j, n8n, or an LLM yet.
- Do not put API keys or secrets in frontend `.env` variables. `VITE_*` values are exposed to the browser.
- Before connecting a backend, agree on the API endpoints with the backend team and implement them in `src/services/api.js`.
