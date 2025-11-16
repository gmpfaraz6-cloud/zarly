# Deployment Guide

This guide will help you deploy both the admin panel and storefront to Vercel.

## Prerequisites

1. GitHub account (or GitLab/Bitbucket)
2. Vercel account (free tier works)
3. Supabase account (free tier works)

## Step 1: Push to GitHub

1. Initialize a git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub

3. Push your code:
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

## Step 2: Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project

2. In Supabase Dashboard:
   - Go to SQL Editor
   - Run the migrations from `supabase/migrations/001_initial_schema.sql`
   - Run the migrations from `supabase/migrations/002_rls_policies.sql`

3. Set up Storage:
   - Go to Storage
   - Create a new bucket named `product-images`
   - Make it public
   - Set up the bucket policies

4. Get your credentials:
   - Go to Settings > API
   - Copy your Project URL and anon/public key

5. (Optional) Create an admin user:
   - Go to Authentication > Users
   - Create a new user with email/password
   - In the user's metadata, add: `{"role": "admin"}`

## Step 3: Deploy Admin Panel to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in

2. Click "New Project"

3. Import your GitHub repository

4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `admin`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

6. Click "Deploy"

## Step 4: Deploy Storefront to Vercel

1. In Vercel, click "Add New..." > "Project"

2. Import the same GitHub repository

3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `storefront`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

5. Click "Deploy"

## Step 5: Configure Custom Domains (Optional)

1. In each Vercel project:
   - Go to Settings > Domains
   - Add your custom domain
   - Follow the DNS configuration instructions

## Step 6: Update Supabase Redirect URLs

1. In Supabase Dashboard:
   - Go to Authentication > URL Configuration
   - Add your deployed admin URL to Redirect URLs
   - Add your deployed storefront URL to Redirect URLs
   - Example: `https://admin.yourdomain.com`, `https://yourdomain.com`

## Step 7: Test Your Deployment

1. Visit your admin panel URL and login with admin credentials
2. Visit your storefront URL and test shopping functionality
3. Create a test product in the admin panel
4. Verify it appears in the storefront

## Troubleshooting

### Build Errors
- Check that all dependencies are listed in `package.json`
- Verify environment variables are set correctly
- Check build logs in Vercel dashboard

### Authentication Issues
- Verify redirect URLs are configured in Supabase
- Check that RLS policies are set up correctly
- Ensure user metadata has the correct role

### Image Upload Issues
- Verify storage bucket exists and is public
- Check bucket policies allow uploads
- Verify CORS settings in Supabase

## Post-Deployment Checklist

- [ ] Both apps deployed successfully
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Storage bucket created
- [ ] Redirect URLs updated in Supabase
- [ ] Admin user created with correct role
- [ ] Test product created
- [ ] Test order placed
- [ ] Custom domains configured (if applicable)

