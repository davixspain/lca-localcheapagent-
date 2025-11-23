# Chimera WebUI

A lightweight Vite + React dashboard for visualizing the Chimera hardened browser stack, including sandbox controls, process hierarchy, telemetry, and a live audit console. A prebuilt, browser-ready bundle lives in `dist/` so you can distribute or host the UI without running Node.

## Getting started

Install dependencies and launch the dev server:

```bash
npm install
npm run dev
```

Then open the printed localhost URL (default: http://localhost:3000). Tailwind classes are provided via CDN for quick styling.

### Serve a built bundle with Python

If you prefer not to run the Vite dev server, you can host the production bundle with the built-in Python HTTP server. A ready-to-distribute bundle is already checked into `dist/` and can be served directly:

```bash
python3 serve.py --host 0.0.0.0 --port 3000
```

The server binds to `0.0.0.0:3000` by default so it is reachable from your browser in the container environment. The shipped `dist/` bundle references React, Lucide, and charting libraries from a public CDN; keep an internet connection available when hosting this static build.

You can verify the Python server wiring without a full Node build by running a local smoke test that boots the handler against
an ephemeral directory:

```bash
python3 server_smoke_test.py
```

## Build

```bash
npm run build
```

This produces a production bundle in `dist/`.
