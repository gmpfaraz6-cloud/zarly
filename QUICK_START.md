# Quick Start Guide

Get your ShopFraz e-commerce platform up and running in minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A GitHub account (for deployment)

## Step 1: Clone and Install

```bash
# Install dependencies for both projects
npm run install:all

# Or install separately:
cd admin && npm install
cd ../storefront && npm install
```

## Step 2: Set Up Supabase

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the database to be ready

2. **Run Database Migrations**
   - In Supabase Dashboard, go to SQL Editor
   - Run the SQL from `supabase/migrations/001_initial_schema.sql`
   - Run the SQL from `supabase/migrations/002_rls_policies.sql`

3. **Create Storage Bucket**
   - Go to Storage in Supabase Dashboard
   - Click "New bucket"
   - Name: `product-images`
   - Make it **public**
   - Create the bucket

4. **Get Your Credentials**
   - Go to Settings > API
   - Copy your **Project URL** and **anon/public key**

5. **Create Admin User**
   - Go to Authentication > Users
   - Click "Add user" > "Create new user"
   - Enter email and password
   - In the user metadata JSON, add: `{"role": "admin"}`
   - Save the user

## Step 3: Configure Environment Variables

### Admin Panel

Create `admin/.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Storefront

Create `storefront/.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 4: Run Development Servers

### Admin Panel

```bash
cd admin
npm run dev
```

Access at: http://localhost:5173 (or the port shown)

### Storefront

```bash
cd storefront
npm run dev
```

Access at: http://localhost:5174 (or the port shown)

## Step 5: First Steps

1. **Login to Admin Panel**
   - Use the admin credentials you created
   - You'll see the dashboard

2. **Add Your First Product**
   - Go to Products > Add Product
   - Fill in product details
   - Upload product images
   - Mark as "Featured" to show on homepage
   - Save

3. **View Your Store**
   - Open the storefront URL
   - See your product on the homepage
   - Try adding it to cart

4. **Test Checkout**
   - Add products to cart
   - Go to checkout
   - Fill in shipping details
   - Place order (COD)

5. **Manage Order**
   - Go back to admin panel
   - View the order in Orders
   - Update order status

## Step 6: Deploy (Optional)

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy to Vercel:
1. Push your code to GitHub
2. Import both projects to Vercel
3. Set environment variables
4. Deploy!

## Troubleshooting

### Can't login to admin?
- Verify user has `role: "admin"` in metadata
- Check environment variables are correct
- Ensure RLS policies were run

### Products not showing?
- Verify products exist in database
- Check RLS policies allow public read
- Refresh the page

### Images not uploading?
- Verify storage bucket exists and is public
- Check bucket policies allow uploads
- Ensure file size is under 50MB

### Build errors?
- Ensure all dependencies are installed
- Check Node.js version (18+)
- Clear node_modules and reinstall

## Next Steps

- Read [docs/ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md) for admin features
- Customize your store settings
- Add more products and categories
- Configure shipping rates
- Set up custom domain (if desired)

Happy selling! 🎉

