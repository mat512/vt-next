# VT Next

## About

Application that provides an enhanced version of your scheduling software for universities that use "VT Agenda" software.

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
