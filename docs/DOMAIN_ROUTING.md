# Domain Routing Configuration

## Current Setup ✅

Your domains are configured as follows:

- **`admin.zarly.store`** → Admin Panel (Production deployment)
- **`zarly.store`** → Storefront (redirects to `www.zarly.store`)

## How It Works

This routing is handled at the **Vercel deployment level**, not in the code:

1. **Two Separate Vercel Projects**:
   - One project for Admin Panel (root: `admin/`)
   - One project for Storefront (root: `storefront/`)

2. **Domain Assignment**:
   - Each project has its domain assigned in Vercel Settings → Domains
   - Vercel handles the routing automatically

3. **No Code Changes Needed**:
   - Both apps work independently
   - Domain routing is transparent to the application code

## Deployment Structure

```
GitHub Repository: gmpfaraz6-cloud/zarly
├── admin/          → Deployed as separate Vercel project → admin.zarly.store
└── storefront/     → Deployed as separate Vercel project → zarly.store
```

## Verification Checklist

- [x] Admin domain: `admin.zarly.store` → Valid Configuration
- [x] Storefront domain: `zarly.store` → Valid Configuration (with www redirect)
- [ ] Both projects deployed to Vercel
- [ ] Environment variables set in both Vercel projects
- [ ] Supabase redirect URLs updated

## Environment Variables

Make sure both Vercel projects have:

**Admin Project:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

**Storefront Project:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Testing

1. **Test Admin**: Visit `https://admin.zarly.store`
   - Should show admin login page
   - Login should work

2. **Test Storefront**: Visit `https://zarly.store`
   - Should redirect to `https://www.zarly.store`
   - Should show customer storefront
   - All features should work

## Important Notes

1. **Separate Deployments**: Each app must be deployed as a separate Vercel project
2. **Same Repository**: Both projects can use the same GitHub repo with different root directories
3. **Independent Updates**: Changes to admin don't affect storefront and vice versa
4. **SSL Certificates**: Vercel automatically provisions SSL for both domains

## Troubleshooting

### Domain shows "Invalid Configuration"
- Check DNS records are correct
- Wait for DNS propagation (up to 24 hours)
- Verify domain is added in correct Vercel project

### App not loading
- Check deployment status in Vercel
- Verify environment variables are set
- Check build logs for errors

### Redirect not working
- Verify www redirect is configured in Vercel
- Check domain settings in storefront project

