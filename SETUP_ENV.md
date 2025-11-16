# Environment Variables Setup

## Quick Setup

1. **Get Supabase Credentials:**
   - Go to https://supabase.com
   - Create a new project (or use existing)
   - Go to Settings → API
   - Copy your **Project URL** and **anon/public key**

2. **Update Environment Files:**

   Edit `admin/.env.local`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   Edit `storefront/.env.local`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Run Database Migrations:**
   - In Supabase Dashboard → SQL Editor
   - Run `supabase/migrations/001_initial_schema.sql`
   - Run `supabase/migrations/002_rls_policies.sql`

4. **Create Storage Bucket:**
   - In Supabase Dashboard → Storage
   - Create bucket named `product-images`
   - Make it **public**

5. **Start Development Servers:**

   Admin Panel:
   ```bash
   cd admin
   npm run dev
   ```

   Storefront:
   ```bash
   cd storefront
   npm run dev
   ```

## Without Supabase (Preview Only)

If you just want to preview the UI without Supabase:

1. The apps will show errors for API calls, but you can see the UI
2. Start the dev servers:
   ```bash
   cd admin && npm run dev
   cd storefront && npm run dev
   ```

