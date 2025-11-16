# Environment Variables Guide

This document lists all required environment variables for both the admin panel and storefront.

## Admin Panel (.env.local)

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Storefront (.env.local)

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Getting Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the following:
   - **Project URL**: Use this for `VITE_SUPABASE_URL`
   - **anon/public key**: Use this for `VITE_SUPABASE_ANON_KEY`

## Security Notes

- Never commit `.env.local` files to git
- The `.env.local` file is already in `.gitignore`
- For production, set environment variables in your hosting platform (Vercel/Netlify)
- The anon key is safe to expose in client-side code (it's protected by RLS policies)

## Production Setup

When deploying to Vercel or Netlify:

1. Go to your project settings
2. Navigate to Environment Variables
3. Add both variables for all environments (Production, Preview, Development)

The apps will automatically use these variables when building.

