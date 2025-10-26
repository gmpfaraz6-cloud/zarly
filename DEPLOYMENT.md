# 🚀 Zarly E-commerce Platform - Deployment Guide

## 📋 Overview

This platform supports **separate domains** for admin and storefront:
- **Admin Domain**: `admin.yourdomain.com` → Dashboard/Backend
- **Store Domain**: `yourdomain.com` → Customer Storefront

## 🏗️ Architecture

```
admin.zarly.com  →  Admin Dashboard (Login, Products, Orders, etc.)
zarly.com        →  Customer Store (Products, Cart, Checkout)
```

The same codebase serves both domains based on the hostname!

## 📦 Deployment Options

### Option 1: Vercel (Recommended)

#### 1. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect via Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Import from GitHub: `gmpfaraz6-cloud/zarly`
3. Add environment variables:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Deploy!

#### 2. Configure Custom Domains in Vercel

In your Vercel project settings:

**Add Admin Domain:**
1. Domains → Add Domain
2. Enter: `admin.zarly.com`
3. Vercel provides DNS records

**Add Store Domain:**
1. Domains → Add Domain
2. Enter: `zarly.com` and `www.zarly.com`
3. Vercel provides DNS records

#### 3. Update DNS at Domain Registrar

**For admin.zarly.com:**
```
Type: CNAME
Name: admin
Value: cname.vercel-dns.com
```

**For zarly.com:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Option 2: Netlify

#### 1. Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

#### 2. Configure Custom Domains

**Add domains in Netlify:**
- `admin.zarly.com`
- `zarly.com`

**DNS Configuration:**
```
# For admin.zarly.com
Type: CNAME
Name: admin
Value: your-site.netlify.app

# For zarly.com
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

## 🔧 Configuration

### Environment Variables

Create `.env` file:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Add these to your hosting provider (Vercel/Netlify).

### Supabase Setup

1. **Create Supabase Project**: [supabase.com](https://supabase.com)
2. **Tables are already created** via migrations
3. **Get API Keys**:
   - Go to Settings → API
   - Copy `Project URL` and `anon/public` key

## 🌐 How Domain Routing Works

### Admin Access
Any of these will show the admin dashboard:
- `admin.yourdomain.com` → Dashboard
- `yourdomain.com/admin` → Dashboard
- `localhost:5174/admin` → Dashboard (dev)

### Store Access
- `yourdomain.com` → Storefront
- `www.yourdomain.com` → Storefront
- `localhost:5174` → Storefront (dev)

### Code Logic
```javascript
// In App.jsx
const isAdminDomain = hostname.startsWith('admin.') || 
                      hostname.includes('admin') ||
                      location.pathname.startsWith('/admin');

if (isAdminDomain) {
  // Show Admin Dashboard
} else {
  // Show Storefront
}
```

## 📊 Database Connection

The storefront automatically loads the correct store based on domain:

```javascript
// In StorefrontLayout.jsx
const hostname = window.location.hostname;

// Look up store by domain in database
const { data } = await supabase
  .from('domains')
  .select('store_id, stores(*)')
  .eq('domain', hostname)
  .single();
```

## ✅ Post-Deployment Checklist

### 1. Add Store Record
```sql
-- In Supabase SQL Editor
INSERT INTO stores (user_id, name, email, primary_domain)
VALUES ('your-user-id', 'Your Store Name', 'admin@yourstore.com', 'yourdomain.com');
```

### 2. Add Domain Records
In your admin dashboard (`admin.yourdomain.com`):
1. Go to Settings → Domains
2. Click "Connect existing domain"
3. Add your store domain: `yourdomain.com`
4. Set as primary domain

### 3. Test Both Domains

**Admin Domain:**
```
https://admin.yourdomain.com
→ Should show login page
→ After login: Dashboard with products, orders, etc.
```

**Store Domain:**
```
https://yourdomain.com
→ Should show storefront homepage
→ Browse products, add to cart, checkout
```

### 4. Add Products
1. Login to admin: `admin.yourdomain.com`
2. Go to Products → Add Product
3. Fill in details, upload images
4. Publish product
5. Visit store domain to see it live

## 🔒 Security

### Enable RLS in Supabase
All tables have Row Level Security enabled. Each user only sees their own store data.

### SSL Certificates
Both Vercel and Netlify provide free SSL certificates automatically.

## 📱 Testing Locally with Custom Domains

Edit your hosts file:

**Windows:** `C:\Windows\System32\drivers\etc\hosts`
**Mac/Linux:** `/etc/hosts`

Add:
```
127.0.0.1 admin.zarly.local
127.0.0.1 zarly.local
```

Then access:
- `http://admin.zarly.local:5174` → Admin
- `http://zarly.local:5174` → Store

## 🎯 Example Setup

**Scenario:** You own `zarly.store`

### DNS Configuration:
```
# Admin subdomain
admin.zarly.store → CNAME → cname.vercel-dns.com

# Main store domain
zarly.store → A → 76.76.21.21
www.zarly.store → CNAME → cname.vercel-dns.com
```

### Result:
- `admin.zarly.store` → Admin Dashboard
- `zarly.store` → Customer Store
- Both use the same Vercel deployment!

## 🆘 Troubleshooting

### Issue: "Store Not Found" on storefront
**Solution:** Ensure you have a store record in the database with the correct domain.

### Issue: Admin shows storefront
**Solution:** Check that your domain starts with `admin.` or includes `admin` in the hostname.

### Issue: Can't login
**Solution:** 
1. Check Supabase Auth is enabled
2. Verify environment variables are set
3. Check Site URL in Supabase settings

## 📚 Additional Resources

- [Vercel Custom Domains](https://vercel.com/docs/concepts/projects/domains)
- [Netlify Custom Domains](https://docs.netlify.com/domains-https/custom-domains/)
- [Supabase Documentation](https://supabase.com/docs)

## 🎉 You're Ready!

Your platform is now live with:
✅ Separate admin and store domains
✅ Full e-commerce functionality
✅ Secure authentication
✅ Real-time inventory
✅ Order management
✅ Customer accounts

**GitHub Repository:** https://github.com/gmpfaraz6-cloud/zarly.git

