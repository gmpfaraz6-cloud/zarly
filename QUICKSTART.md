# 🚀 Quick Start Guide

Get your authentication app running in 5 minutes!

## Step 1: Create Your `.env` File

**IMPORTANT**: You need to create a `.env` file manually in the root directory.

1. In the root directory of this project (same level as `package.json`), create a new file called `.env`

2. Copy and paste this content into your `.env` file:

```env
VITE_SUPABASE_URL=your-project-url-here
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. **Keep this file for now** - We'll update it in the next step

## Step 2: Create a Supabase Project (2 minutes)

1. Go to [https://supabase.com](https://supabase.com) and click "Start your project"

2. Sign up or log in (you can use GitHub)

3. Click "New Project" and fill in:
   - **Name**: `zarly` (or any name you want)
   - **Database Password**: Create a strong password (save it somewhere!)
   - **Region**: Choose closest to you
   
4. Click "Create new project" and wait 1-2 minutes

## Step 3: Get Your API Keys

1. In your Supabase dashboard, look on the left sidebar and click the ⚙️ **Settings** icon

2. Click **API** in the settings menu

3. You'll see:
   - **Project URL**: Something like `https://abcdefghijk.supabase.co`
   - **Project API keys → anon public**: A long key starting with `eyJ...`

4. Copy these two values

## Step 4: Update Your `.env` File

1. Open your `.env` file again

2. Replace the placeholder values with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Save the file

## Step 5: Run Your App! 🎉

In your terminal:

```bash
npm run dev
```

Your app should now be running at `http://localhost:5174` (or another port if shown in the terminal)

## Step 6: Test It Out

1. Open the URL in your browser
2. Click "Get started →" to go to the sign up page
3. Enter an email and password
4. You should be redirected to the dashboard!

## 🎊 Success!

Your authentication is now fully working with Supabase!

### What You Can Do Now:

- ✅ Sign up new users
- ✅ Sign in existing users
- ✅ Access protected dashboard
- ✅ Sign out
- ✅ All user data is stored in Supabase

### Optional: Enable Email Confirmation

By default, Supabase might require email confirmation. To test without email confirmation:

1. Go to your Supabase dashboard
2. Click **Authentication** → **Providers** → **Email**
3. Toggle OFF "Confirm email"
4. Click Save

Now you can sign up without waiting for email confirmation!

---

## 🆘 Having Issues?

### Can't find the .env file?
- Make sure you're creating it in the ROOT directory (same folder as package.json)
- The file name is exactly `.env` (with the dot at the beginning)
- On Windows, create it as `.env.` and it will automatically become `.env`

### "Missing Supabase environment variables" error?
- Check that your `.env` file has both variables
- Make sure variable names start with `VITE_` (all caps)
- Restart your dev server after creating/editing `.env` (Stop with Ctrl+C, then `npm run dev` again)

### Can't sign up or sign in?
- Double-check your Supabase URL and key in `.env`
- Make sure you copied the `anon public` key, not the `service_role` key
- Check there are no extra spaces or quotes around your values

---

## 📖 Want to Learn More?

Check out these files:
- `README.md` - Full documentation
- `SUPABASE_SETUP.md` - Detailed Supabase configuration guide

Need more help? Open an issue or check the Supabase docs at [supabase.com/docs](https://supabase.com/docs)

