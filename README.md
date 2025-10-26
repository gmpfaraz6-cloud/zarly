# Shopify-Style Auth Pages with Supabase

A modern, fully functional authentication application built with React, Vite, and Supabase, featuring Shopify-inspired sign in and sign up pages with complete backend integration.

## ✨ Features

### Authentication
- 🔐 **Email/Password Authentication** - Full sign up and sign in functionality
- 🌐 **OAuth Social Login** - Support for Google, Facebook, and Apple
- 🔒 **Protected Routes** - Secure dashboard accessible only to authenticated users
- 👤 **User Session Management** - Persistent sessions with automatic token refresh
- 📧 **Email Confirmation** - Optional email verification workflow

### UI/UX
- 🎨 **Beautiful Shopify-inspired Design** - Professional and modern interface
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- ⚡ **Fast & Smooth** - Optimized performance with Vite
- 🎯 **Intuitive Navigation** - Easy switching between sign in and sign up
- 💫 **Loading States** - Clear feedback during authentication processes
- ❌ **Error Handling** - User-friendly error messages
- ✅ **Success Notifications** - Confirmation messages for successful actions

### Technical
- ⚛️ **React 18** - Modern React with hooks
- 🚀 **Vite** - Lightning-fast build tool
- 🗄️ **Supabase** - Complete backend solution (Auth + Database)
- 🧭 **React Router** - Client-side routing
- 🎨 **Custom CSS** - No heavy CSS frameworks

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- A Supabase account (free tier available)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

Follow the detailed setup guide in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

**Quick Setup:**
1. Create a project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key
3. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5174` (or another port if 5174 is in use)

### 4. Test the Application

1. **Sign Up**: Navigate to the sign up page and create a new account
2. **Check Email**: Verify your email (if confirmation is enabled)
3. **Sign In**: Log in with your credentials
4. **Dashboard**: You'll be redirected to the dashboard
5. **Sign Out**: Click the sign out button to end your session

## 📁 Project Structure

```
zarly/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx    # Protected route wrapper
│   ├── context/
│   │   └── AuthContext.jsx       # Authentication state management
│   ├── lib/
│   │   └── supabase.js          # Supabase client configuration
│   ├── pages/
│   │   ├── SignIn.jsx           # Sign in page
│   │   ├── SignUp.jsx           # Sign up page
│   │   ├── Dashboard.jsx        # Protected dashboard page
│   │   ├── Auth.css             # Authentication pages styles
│   │   └── Dashboard.css        # Dashboard styles
│   ├── App.jsx                  # Main app with routing
│   ├── index.css                # Global styles
│   └── main.jsx                 # Application entry point
├── .env                         # Environment variables (create this)
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore file
├── SUPABASE_SETUP.md           # Detailed Supabase setup guide
├── package.json                # Project dependencies
└── README.md                   # This file
```

## 🔐 Authentication Flow

### Sign Up Flow
1. User enters email on sign up page
2. User enters password (minimum 6 characters)
3. Account is created in Supabase
4. Confirmation email is sent (if enabled)
5. User is redirected to dashboard

### Sign In Flow
1. User enters email on sign in page
2. User enters password
3. Credentials are verified with Supabase
4. Session is created and stored
5. User is redirected to dashboard

### OAuth Flow
1. User clicks social login button
2. Redirected to OAuth provider
3. User authorizes the application
4. Redirected back with authentication
5. Session is created
6. User is redirected to dashboard

## 🎨 Customization

### Styling
All styles are in CSS files and can be easily customized:
- `src/pages/Auth.css` - Sign in/sign up page styles
- `src/pages/Dashboard.css` - Dashboard styles
- `src/index.css` - Global styles

### Branding
- Replace the Shopify logo SVG in the components
- Update color schemes in CSS files
- Modify text content in the page components

### Functionality
The authentication logic is centralized in:
- `src/context/AuthContext.jsx` - Add custom auth methods
- `src/lib/supabase.js` - Configure Supabase options

## 🗄️ Database Integration

### Example: Creating a User Profile Table

```sql
-- In Supabase SQL Editor
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Allow users to read their own profile
create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );
```

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for more database examples.

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Environment Variables for Production

Make sure to set your production environment variables:
- `VITE_SUPABASE_URL` - Your production Supabase URL
- `VITE_SUPABASE_ANON_KEY` - Your production anon key

Update your Supabase project settings:
- **Site URL**: Your production domain
- **Redirect URLs**: Add your production callback URLs

## 🧪 Preview Production Build

```bash
npm run preview
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite 7** - Build tool and dev server
- **React Router DOM 7** - Client-side routing
- **Supabase** - Backend as a Service (Auth + Database + Storage)
- **@supabase/supabase-js** - Supabase JavaScript client
- **CSS3** - Styling with modern features

## 🚨 Troubleshooting

### "Missing Supabase environment variables"
- Ensure `.env` file exists in root directory
- Check variable names start with `VITE_`
- Restart dev server after creating/modifying `.env`

### Sign up/Sign in not working
- Verify Supabase credentials in `.env`
- Check Supabase dashboard for authentication errors
- Ensure email provider is enabled in Supabase

### OAuth not working
- Configure OAuth providers in Supabase dashboard
- Add correct redirect URLs
- Verify OAuth credentials are valid

### Page not found after OAuth redirect
- Check redirect URLs in Supabase settings
- Ensure routes match in `App.jsx`

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT

## 👨‍💻 Author

Created with ❤️ using React, Vite, and Supabase

---

## 🎯 Next Steps

After setting up the application:

1. ✅ Configure Supabase (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))
2. ✅ Test authentication flows
3. ✅ Create database tables for your app data
4. ✅ Set up Row Level Security policies
5. ✅ Customize the UI to match your brand
6. ✅ Add more features to the dashboard
7. ✅ Deploy to production (Vercel, Netlify, etc.)

Happy coding! 🚀
