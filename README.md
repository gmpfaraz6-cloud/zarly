# ShopFraz - E-commerce Platform

A modern, full-featured e-commerce platform built with React, Vite, and Supabase.

## Project Structure

```
shopfraz/
├── admin/              # Admin panel (React + Vite)
├── storefront/         # Customer-facing store (React + Vite)
├── shared/            # Shared utilities/types
├── supabase/          # Database migrations & config
└── docs/              # Documentation
```

## Features

### Admin Panel
- **Dashboard**: Analytics overview with sales, orders, products, and customers metrics
- **Product Management**: Full CRUD operations with image uploads, categories, and featured products
- **Order Management**: View, filter, and update order statuses (pending, processing, shipped, delivered, cancelled)
- **Inventory Management**: Track stock levels, low stock alerts, and inventory value
- **Customer Management**: View customers and their order history
- **Settings**: Configure store information, address, tax rate, and payment settings
- **Authentication**: Secure admin login with role-based access

### Storefront
- **Homepage**: Beautiful hero section with featured products and animations
- **Product Catalog**: Browse products with search, category filters, and pagination
- **Product Detail**: Detailed product pages with image galleries, quantity selector, and add to cart
- **Shopping Cart**: Real-time cart updates with quantity management and item removal
- **Checkout Flow**: Complete checkout process with shipping address form and COD payment
- **Order Tracking**: View order history with status updates and shipping information
- **User Authentication**: Sign up, login, and password reset functionality
- **Responsive Design**: Mobile-first design that works on all devices

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Routing**: React Router v6
- **Deployment**: Vercel/Netlify

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Setup

1. Clone the repository

2. Install dependencies for admin:
```bash
cd admin
npm install
```

3. Install dependencies for storefront:
```bash
cd ../storefront
npm install
```

4. Set up Supabase:
   - Create a new Supabase project
   - Run the migrations from `supabase/migrations/` in your Supabase SQL editor
   - Create a storage bucket named "product-images" (public)
   - Get your project URL and anon key from Settings > API

5. Configure environment variables:

Create `admin/.env.local`:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Create `storefront/.env.local`:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

6. Run the development servers:

Admin:
```bash
cd admin
npm run dev
```

Storefront:
```bash
cd storefront
npm run dev
```

## Database Setup

1. Run `001_initial_schema.sql` to create tables
2. Run `002_rls_policies.sql` to set up Row Level Security

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import both projects to Vercel as **separate projects**:
   - **Admin Project**: Root directory = `admin`
   - **Storefront Project**: Root directory = `storefront`
3. Set environment variables in each Vercel project
4. Configure domains:
   - `admin.zarly.store` → Admin project
   - `zarly.store` → Storefront project
5. Deploy!

See [docs/DOMAIN_SETUP.md](docs/DOMAIN_SETUP.md) for detailed domain configuration.

### Domain Routing

- **`admin.zarly.store`** → Admin Panel
- **`zarly.store`** → Storefront

This is configured at the Vercel deployment level. Each app is deployed as a separate project with its own domain.

## License

MIT

