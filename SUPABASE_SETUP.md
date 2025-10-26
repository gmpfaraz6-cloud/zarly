# Supabase Setup Guide

This guide will help you set up Supabase authentication and database for your application.

## 🚀 Quick Start

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Fill in your project details:
   - **Name**: Your project name (e.g., "zarly")
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for it to initialize (1-2 minutes)

### Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll find two important values:
   - **Project URL** (something like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (a long string starting with `eyJ...`)

### Step 3: Configure Environment Variables

1. In your project root directory, create a `.env` file:

```bash
# Create .env file (if it doesn't exist)
touch .env
```

2. Open `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the values with your actual credentials from Step 2.

**⚠️ IMPORTANT**: Never commit your `.env` file to git. It's already in `.gitignore`.

### Step 4: Enable Email Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled (it should be by default)
3. Configure email settings:
   - **Enable email confirmations**: Toggle ON if you want users to confirm their email
   - **Secure email change**: Recommended to keep ON
   - **Session URL**: Set to `http://localhost:5174` for development

### Step 5: Configure OAuth Providers (Optional)

If you want to enable social login (Google, Facebook, Apple):

#### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - **Authorized redirect URIs**: Add `https://your-project-id.supabase.co/auth/v1/callback`
5. Copy the Client ID and Client Secret
6. In Supabase: **Authentication** → **Providers** → **Google**
   - Enable Google provider
   - Add your Client ID and Client Secret
   - Save

#### Facebook OAuth Setup
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. In Settings → Basic, copy your App ID and App Secret
5. In Supabase: **Authentication** → **Providers** → **Facebook**
   - Enable Facebook provider
   - Add your App ID and App Secret
   - Copy the callback URL and add it to Facebook app settings
   - Save

#### Apple OAuth Setup
1. Go to [Apple Developer](https://developer.apple.com/)
2. Create a Services ID
3. Configure Sign in with Apple
4. In Supabase: **Authentication** → **Providers** → **Apple**
   - Enable Apple provider
   - Follow the detailed setup instructions
   - Save

### Step 6: Configure Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize the templates for:
   - Confirm signup
   - Magic Link
   - Change Email Address
   - Reset Password

### Step 7: Set Up Site URL

1. Go to **Authentication** → **URL Configuration**
2. Add your site URLs:
   - **Site URL**: `http://localhost:5174` (for development)
   - **Redirect URLs**: Add `http://localhost:5174/dashboard`

For production, add your actual domain.

## 🗄️ Database Setup (Optional)

### Creating Tables

Here's an example of creating a user profiles table:

1. Go to **SQL Editor** in Supabase dashboard
2. Run this SQL:

```sql
-- Create a profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Create policies
create policy "Users can view their own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update their own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Create a trigger to automatically create a profile on signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## 🧪 Testing Your Setup

1. Make sure your `.env` file has the correct credentials
2. Restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Start it again
npm run dev
```

3. Open your browser to `http://localhost:5174`
4. Try signing up with an email and password
5. Check your Supabase dashboard under **Authentication** → **Users** to see the new user

## 🔧 Troubleshooting

### "Missing Supabase environment variables"
- Make sure your `.env` file exists in the root directory
- Verify the variable names start with `VITE_`
- Restart your development server after changing `.env`

### "Invalid API key"
- Double-check you copied the `anon/public` key, not the `service_role` key
- Make sure there are no extra spaces or quotes around the key

### "Email not confirmed"
- Check your email for the confirmation link
- Or disable email confirmation in Supabase settings for testing

### Social login not working
- Verify redirect URLs are correctly configured
- Check that OAuth credentials are valid
- Ensure the provider is enabled in Supabase

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Database Functions](https://supabase.com/docs/guides/database/functions)

## 🔐 Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use Row Level Security (RLS)** on all tables
3. **Keep your service_role key secret** - never use it in client-side code
4. **Enable email verification** for production
5. **Set up proper CORS policies** for your domain
6. **Use strong database passwords**
7. **Regularly update your dependencies**

## 📝 Environment Variables Reference

```env
# Required
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional (for advanced configurations)
# VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (NEVER use in client-side!)
```

## 🎯 Next Steps

After setting up Supabase:

1. ✅ Test sign up and sign in functionality
2. ✅ Create your database schema
3. ✅ Set up Row Level Security policies
4. ✅ Customize email templates
5. ✅ Deploy your application
6. ✅ Update environment variables for production

---

Need help? Check the [Supabase Discord](https://discord.supabase.com) or [GitHub Discussions](https://github.com/supabase/supabase/discussions)

