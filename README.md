# VT Next

## About

Application that provides an enhanced version of your scheduling software for universities that use "VT Agenda" software.

<img width="1374" alt="Capture d’écran 2023-03-14 à 18 24 22" src="https://user-images.githubusercontent.com/71132805/225091622-d9c1f6f7-d7c1-4b45-8439-c8b6521e7f87.png">

### Built With

-   [Svelte](https://svelte.dev/)
-   [Vite](https://vitejs.dev/)
-   [Cloudflare Pages](https://pages.cloudflare.com/)

## Run Locally

```bash
# Install dependencies
$ npm install

# Edit .env file with the local API
$ echo VITE_API_URL=http://localhost:8788 > .env

# Run the API (replace with the original "VT Agenda" website URL)
$ npx wrangler pages dev ./functions -b VT_AGENDA_URL="https://edt.example.fr"

# Run the app
$ npm run dev
```

## Deployment

-   You need to set up a Cloudflare Pages: https://developers.cloudflare.com/pages/get-started/

-   Add environment variables

```
VT_AGENDA_URL=https://edt.example.fr
NODE_VERSION=16.16.0
```

-   Edit .env file with your Cloudflare Pages URL

```
VITE_API_URL=https://example.pages.dev
```
