# Development Server Setup

## Quick Start

Run both servers simultaneously:
```bash
npm run dev
```

This will start:
- **Admin Panel**: http://localhost:5173
- **Storefront**: http://localhost:5174

## Individual Servers

Run servers separately:
```bash
# Admin only
npm run dev:admin

# Storefront only
npm run dev:storefront
```

## Port Configuration

- Admin Panel: `5173`
- Storefront: `5174`

## Troubleshooting

If you encounter module errors:
1. Clear node_modules cache: `rm -rf node_modules/.vite` (or `Remove-Item -Recurse node_modules/.vite` on Windows)
2. Reinstall dependencies: `npm run install:all`
3. Restart the dev server

## PostCSS Configuration

The PostCSS config files use `.mjs` extension for ES module support:
- `admin/postcss.config.mjs`
- `storefront/postcss.config.mjs`

These are automatically detected by Vite and PostCSS.

