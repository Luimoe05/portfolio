# Luis-Angel Moreno’s Portfolio

A personal portfolio built with TypeScript, Tailwind CSS, and static HTML.

## Run locally

Install [Node.js](https://nodejs.org/) 22 or later, then run:

```sh
git clone https://github.com/Luimoe05/portfolio.git
cd portfolio
npm ci
npm run dev
```

Open **http://localhost:5173** in your browser. Changes to source files and public assets rebuild automatically; refresh the browser to see them. Press `Ctrl+C` to stop the server.

To use a different port:

```sh
npm run dev -- --port 5174
```

## Build and check

```sh
npm run build     # Check TypeScript and generate the site in dist/
npm run preview   # Build and serve a production preview locally
```

## Customize

- `src/templates.ts`: page layouts and homepage content.
- `src/projects.ts`: project descriptions, images, and links.
- `src/photography.ts`: photography gallery content.
- `src/styles.css`: styles, colors, and responsive layouts.
- `src/app.ts`: browser interactions.
- `public/`: images, fonts, and résumé.

The contact form uses FormSubmit. If you change its recipient, activate the new address through FormSubmit before expecting messages to arrive.

Deploy the generated `dist/` folder to a static host. A Vercel configuration is included.
