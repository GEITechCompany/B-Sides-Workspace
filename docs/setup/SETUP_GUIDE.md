# B-Sides United Platform - Setup Guide

This guide walks you through the remaining steps to fully set up and deploy your B-Sides business management platform.

## 1. Supabase Setup

### Create a Supabase Project
1. Go to [Supabase](https://supabase.com/) and sign up or log in
2. Create a new project and give it a name (e.g., "b-sides-platform")
3. Note your project URL and anon key from the API settings

### Set Up Database
1. Go to the SQL Editor in your Supabase dashboard
2. Open the `supabase/schema/init.sql` file from this project
3. Copy and paste the SQL into the editor and run it
4. This will create all the tables and relationships needed for the platform

### Storage Setup
1. In the Supabase dashboard, go to Storage
2. Create the following buckets:
   - `documents` (for all uploaded files)
   - `client-files` (for client-specific files)
   - `project-files` (for project-specific files)
3. Set the privacy settings to allow authenticated users to access files

### Authentication Setup
1. Go to Authentication > Settings in your Supabase dashboard
2. Configure your authentication providers:
   - Email/password (enabled by default)
   - (Optional) Set up additional providers like Google, GitHub, etc.
3. Configure email templates for password reset, confirmation emails, etc.

## 2. Environment Configuration

1. Update the `.env.local` file with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Development and Testing

1. Install dependencies (if not already done):
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:3000 in your browser
4. Test the following features:
   - Login/authentication flow
   - Client management
   - Project creation and tracking
   - Task assignment
   - File uploads
   - Budget tracking
   - Quote generation

## 4. GitHub Repository Setup

1. Create a new GitHub repository
2. Initialize git in your project (if not already done):
```bash
git init
```

3. Add all files and commit:
```bash
git add .
git commit -m "Initial commit"
```

4. Connect to your GitHub repository and push:
```bash
git remote add origin https://github.com/your-username/b-sides-platform.git
git push -u origin main
```

## 5. Deployment to Render.com

1. Sign up for [Render](https://render.com/) (free tier available)
2. Connect your GitHub account to Render
3. Create a new Web Service:
   - Select your GitHub repository
   - Give it a name (e.g., "b-sides-platform")
   - Set the build command: `npm install && npm run build`
   - Set the start command: `npm start`
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NODE_ENV=production`
4. Deploy the service

## 6. Adding Additional Features

As your business needs grow, consider implementing these additional features:

### Calendar Integration
1. Implement a full calendar view in the `src/app/(dashboard)/calendar` directory
2. Add integration with Google Calendar or other external calendars

### Advanced Reporting
1. Create visualizations for budget tracking
2. Add project timeline views
3. Implement financial reporting dashboards

### Mobile Responsiveness
1. Test all interfaces on mobile devices
2. Optimize UI components for small screens

### Notifications System
1. Implement in-app notifications
2. Set up email notifications for project updates, task assignments, etc.

## 7. Regular Maintenance

1. Keep dependencies updated:
```bash
npm outdated
npm update
```

2. Monitor Supabase usage and adjust plans as needed
3. Regularly back up your database
4. Monitor application performance and optimize as needed

## Need Help?

Refer to the following documentation:
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Render.com Documentation](https://render.com/docs) 