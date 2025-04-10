# B-Sides Platform Debugging Guide

This guide provides strategies for identifying and resolving common issues that may occur during the setup and operation of your B-Sides business management platform.

## Environment and Setup Issues

### "next: command not found" Error

If you encounter `sh: next: command not found` when running `npm run dev`:

1. **Verify node_modules directory exists**:
   ```bash
   ls -la node_modules
   ```

2. **Reinstall dependencies**:
   ```bash
   npm install
   ```

3. **Use npx to run Next.js directly**:
   ```bash
   npx next dev
   ```

4. **Check for PATH issues**:
   ```bash
   echo $PATH
   which node
   which npm
   ```

5. **Verify package.json script**:
   Make sure your package.json has the correct dev script:
   ```json
   "scripts": {
     "dev": "next dev",
     "build": "next build",
     "start": "next start"
   }
   ```

### Directory Structure Issues

1. **Check the current directory**:
   ```bash
   pwd
   ```
   Ensure you're in the `united-platform` directory when running commands.

2. **Verify files are in the correct location**:
   ```bash
   find . -name "package.json"
   ```

## Supabase Connection Issues

### Authentication and Connection Errors

1. **Test Supabase connectivity**:
   ```bash
   node -e "const { createClient } = require('@supabase/supabase-js'); const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_KEY'); console.log('Supabase client created');"
   ```

2. **Verify environment variables**:
   ```bash
   cat .env.local
   ```
   Ensure your `.env.local` contains:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Check Row-Level Security (RLS) policies**: 
   If you encounter "new row violates row-level security policy" errors, you need to create appropriate policies in your Supabase dashboard.

### Storage Bucket Setup

If you encounter issues creating storage buckets programmatically:

1. **Manually create through Supabase Dashboard**:
   - Log in to Supabase dashboard
   - Navigate to Storage
   - Create buckets: "documents", "client-files", "project-files"
   - Set appropriate permissions

## Frontend and UI Issues

### React Component Errors

1. **Check component imports**:
   ```bash
   grep -r "import " --include="*.tsx" src/components/
   ```
   Look for missing or incorrect imports.

2. **Verify Tailwind CSS setup**:
   ```bash
   cat tailwind.config.js
   cat postcss.config.js
   ```
   Ensure they're properly configured.

3. **Check for TypeScript errors**:
   ```bash
   npx tsc --noEmit
   ```

## Database Issues

### Schema and Query Errors

1. **Verify schema execution**:
   Run the SQL script from `supabase/schema/init.sql` in your Supabase SQL Editor.

2. **Check for RLS policies**:
   Ensure you have proper RLS policies for authenticated users.

3. **Test database queries**:
   Create a simple test script that queries your database.

## Deployment Issues

### Render.com Deployment Failures

1. **Check build logs** on Render.com

2. **Verify environment variables** are properly set in Render.com dashboard

3. **Test build locally**:
   ```bash
   npm run build
   ```

## Advanced Debugging

### Creating Detailed Error Logs

1. **Add console logging**:
   ```javascript
   console.log('Debug - Current state:', { data, error });
   ```

2. **Check browser console** for frontend errors

3. **Use server-side logging** for API route issues:
   ```javascript
   export default async function handler(req, res) {
     console.log('API request:', req.method, req.url, req.body);
     // ...
   }
   ```

### Performance Issues

1. **Check network tab** in browser dev tools for slow requests

2. **Profile React components** using React DevTools

3. **Optimize Supabase queries** by minimizing data transferred

## Getting Help

- **Supabase documentation**: https://supabase.com/docs
- **Next.js documentation**: https://nextjs.org/docs
- **Tailwind CSS documentation**: https://tailwindcss.com/docs
- **Create a minimal reproduction** of your issue when seeking help online

Remember to always check for the most basic issues first (proper directory, installed dependencies, environment variables) before diving into more complex debugging. 