# Domain Setup Guide

This guide explains how to configure your domains so that:
- `zarly.store` → Storefront (customer-facing store)
- `admin.zarly.store` → Admin Panel (admin dashboard)

## Prerequisites

1. Both apps deployed to Vercel as separate projects
2. Domain `zarly.store` added to your Vercel account
3. Access to DNS settings for your domain

## Step 1: Deploy Both Projects to Vercel

### Deploy Admin Panel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository (`gmpfaraz6-cloud/zarly`)
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `admin`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Add Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click "Deploy"

### Deploy Storefront

1. In Vercel Dashboard, click "Add New..." → "Project"
2. Import the same GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `storefront`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Add Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click "Deploy"

## Step 2: Configure Domains

### For Admin Panel (`admin.zarly.store`)

1. Go to your Admin Panel project in Vercel
2. Navigate to **Settings** → **Domains**
3. Click "Add Domain"
4. Enter: `admin.zarly.store`
5. Follow DNS configuration instructions:
   - Add a CNAME record:
     - **Name**: `admin`
     - **Value**: `cname.vercel-dns.com` (or the value Vercel provides)
6. Wait for DNS propagation (can take a few minutes to 24 hours)

### For Storefront (`zarly.store`)

1. Go to your Storefront project in Vercel
2. Navigate to **Settings** → **Domains**
3. Click "Add Domain"
4. Enter: `zarly.store`
5. Follow DNS configuration instructions:
   - Add an A record or CNAME record (Vercel will show you which)
   - Usually: CNAME `@` → `cname.vercel-dns.com`
6. Wait for DNS propagation

## Step 3: Configure www Redirect (Optional)

If you want `www.zarly.store` to redirect to `zarly.store`:

1. In Storefront project → Settings → Domains
2. Add `www.zarly.store` as an additional domain
3. Vercel will automatically set up the redirect

## Step 4: Update Supabase Redirect URLs

1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add to **Redirect URLs**:
   - `https://zarly.store`
   - `https://admin.zarly.store`
   - `https://www.zarly.store` (if using www)
3. Update **Site URL** to: `https://zarly.store`

## Step 5: Verify Configuration

### Test Admin Panel
- Visit `https://admin.zarly.store`
- Should show the admin login page
- Login should work correctly

### Test Storefront
- Visit `https://zarly.store`
- Should show the customer-facing store
- All features should work

## DNS Configuration Summary

In your domain registrar (where you bought zarly.store), add these DNS records:

```
Type    Name    Value
CNAME   admin   cname.vercel-dns.com
CNAME   @       cname.vercel-dns.com
CNAME   www     cname.vercel-dns.com (optional)
```

**Note**: The exact values will be provided by Vercel when you add the domains.

## Troubleshooting

### Domain not working
- Check DNS propagation: Use `dig admin.zarly.store` or online DNS checker
- Verify DNS records are correct
- Wait up to 24 hours for full propagation
- Check Vercel domain status shows "Valid Configuration"

### SSL Certificate Issues
- Vercel automatically provisions SSL certificates
- Wait a few minutes after adding domain
- Check SSL status in Vercel dashboard

### Redirect Issues
- Verify both projects are deployed
- Check domain configuration in each project
- Ensure environment variables are set correctly

## Security Notes

1. **Admin Panel Protection**: Consider adding additional security:
   - IP whitelist (if possible)
   - Rate limiting
   - Strong password requirements

2. **Environment Variables**: Never commit `.env` files
   - Set them in Vercel dashboard
   - Use different Supabase projects for production if needed

3. **CORS Configuration**: Update Supabase CORS settings to include your domains

## Current Setup

Based on your Vercel configuration:
- ✅ `admin.zarly.store` → Admin Panel (Production)
- ✅ `zarly.store` → Storefront (with redirect to www.zarly.store)

Your domains are already configured correctly! 🎉

