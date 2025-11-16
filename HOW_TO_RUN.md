# How to Run the Development Servers

## Quick Start

### Option 1: Run from Root Directory

```bash
# Install all dependencies first (if not done)
npm run install:all

# Run Admin Panel
npm run dev:admin

# Run Storefront (in a new terminal)
npm run dev:storefront
```

### Option 2: Run from Individual Directories

**Admin Panel:**
```bash
cd admin
npm install  # if not already installed
npm run dev
```
Access at: `http://localhost:5173` (or the port shown)

**Storefront:**
```bash
cd storefront
npm install  # if not already installed
npm run dev
```
Access at: `http://localhost:5174` (or the port shown)

## Important Notes

1. **You need to run BOTH servers separately** - they are two different applications
2. **Environment Variables Required:**
   - Create `admin/.env.local` with Supabase credentials
   - Create `storefront/.env.local` with Supabase credentials
   - See `SETUP_ENV.md` for details

3. **If you get errors:**
   - Make sure dependencies are installed: `npm install` in each directory
   - Check that environment variables are set
   - Verify Supabase is configured

## Running Both at Once

Open two terminal windows:
- Terminal 1: `npm run dev:admin`
- Terminal 2: `npm run dev:storefront`

Or use a tool like `concurrently`:
```bash
npm install -g concurrently
concurrently "npm run dev:admin" "npm run dev:storefront"
```

## Troubleshooting

### "npm run dev" not found
- Make sure you're in the correct directory
- Use `npm run dev:admin` or `npm run dev:storefront` from root
- Or `cd admin` then `npm run dev`

### Port already in use
- Vite will automatically use the next available port
- Check the terminal output for the actual URL

### Module not found errors
- Run `npm install` in the directory with the error
- Delete `node_modules` and `package-lock.json`, then `npm install` again

