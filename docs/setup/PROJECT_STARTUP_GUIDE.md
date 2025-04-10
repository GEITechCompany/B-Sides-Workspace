# B-Sides Platform Startup Guide

This guide will help you set up and run the B-Sides platform project correctly on your local machine.

## Prerequisites

- Node.js (v18.17.0 or later recommended)
- npm (v9.0.0 or later recommended)
- A Supabase account with a project set up
- Git

## Initial Setup

### 1. Clone the Repository

```bash
git clone [your-repository-url]
cd united-platform
```

### 2. Install Dependencies

```bash
npm install
```

Wait for all dependencies to be installed. This may take a few minutes.

### 3. Environment Variables

Create a `.env.local` file in the project root:

```bash
# Create and open .env.local file
touch .env.local
nano .env.local  # or use any text editor
```

Add the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://hqbnxraoozwekkyfajxq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxYm54cmFvb3p3ZWtreWZhanhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NzU4MDAsImV4cCI6MjA1OTQ1MTgwMH0.msHb88nm6EMbLDPSldrAxaubxLxhkQCTMJ68UnS6p4I
```

### 4. Supabase Setup

1. Login to the [Supabase Dashboard](https://app.supabase.com)
2. Navigate to your B-Sides project
3. Set up storage buckets:
   - Go to Storage → Buckets
   - Create three buckets: `documents`, `client-files`, and `project-files`
   - Set all buckets to be private (not public)
4. Set up RLS (Row Level Security) policies:
   - For each bucket, create policies that allow authenticated users to read/write
   - Ensure anonymous users have restricted access

## Running the Project

### Development Server

```bash
# Make sure you're in the project directory
cd united-platform

# Start the development server
npm run dev
```

If you encounter the "next: command not found" error, refer to the `NEXT_COMMAND_ERROR_FIX.md` file for troubleshooting steps.

The development server should start on [http://localhost:3000](http://localhost:3000) (or port 3006 if configured differently).

### Running with npx (Alternative)

If you encounter issues with npm scripts, you can run Next.js directly:

```bash
npx next dev
```

## Project Structure

- `/app` - Next.js application router components and pages
- `/components` - Reusable React components
- `/contexts` - React context providers for state management
- `/lib` - Utility functions and shared code
- `/public` - Static assets like images and fonts
- `/styles` - CSS and Tailwind configuration
- `/supabase` - Supabase related configuration and utilities

## Testing Supabase Connection

To verify your Supabase connection is working correctly:

```bash
node -e "const { createClient } = require('@supabase/supabase-js'); const supabase = createClient('https://hqbnxraoozwekkyfajxq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxYm54cmFvb3p3ZWtreWZhanhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NzU4MDAsImV4cCI6MjA1OTQ1MTgwMH0.msHb88nm6EMbLDPSldrAxaubxLxhkQCTMJ68UnS6p4I'); console.log('Supabase client created'); supabase.auth.getSession().then(({ data, error }) => { if (error) console.error('Error:', error.message); else console.log('Session:', data); });"
```

## Common Issues and Solutions

### 1. Module Not Found Errors

If you encounter module not found errors, try:

```bash
npm install --force
```

### 2. Supabase Connection Issues

Verify that:
- Your `.env.local` file exists with the correct Supabase URL and anon key
- Your Supabase project is active
- Your IP is not blocked by Supabase

### 3. TypeScript Errors

Run TypeScript checking:

```bash
npx tsc --noEmit
```

Fix any type errors before proceeding.

## Development Workflow

1. Start the development server: `npm run dev`
2. Make your changes to the codebase
3. Test your changes in the browser at http://localhost:3000
4. Commit your changes: `git add . && git commit -m "Your message"`
5. Push your changes: `git push origin main`

## Useful Commands

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) 