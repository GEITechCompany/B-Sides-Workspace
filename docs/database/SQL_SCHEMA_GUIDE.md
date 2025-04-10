# Supabase Database Schema Setup Guide for B-Sides Platform

This guide walks you through setting up the required database schema for the B-Sides platform in Supabase.

## Prerequisites

- A Supabase account
- Access to the B-Sides Supabase project
- Basic understanding of SQL

## Initial Schema Setup

### Accessing the SQL Editor

1. Log in to the [Supabase Dashboard](https://app.supabase.com)
2. Navigate to your B-Sides project
3. In the left sidebar, click on "SQL Editor"
4. Click "New query" to create a new SQL script

### Creating Database Tables

Copy and paste the following SQL into the SQL Editor to set up the core tables:

```sql
-- Profiles table for user information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  role TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  client_id UUID REFERENCES profiles(id),
  project_manager_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'on-hold', 'cancelled')),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Documents table for project documents
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  uploader_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Project team members junction table
CREATE TABLE IF NOT EXISTS project_members (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'member', 'client', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  PRIMARY KEY (project_id, user_id)
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'to-do' CHECK (status IN ('to-do', 'in-progress', 'in-review', 'completed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assignee_id UUID REFERENCES profiles(id),
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Comments table for tasks
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

### Setting Up RLS (Row Level Security) Policies

For secure data access, set up the following RLS policies:

```sql
-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "Project members can view projects"
ON projects FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM project_members
    WHERE project_members.project_id = id
    AND project_members.user_id = auth.uid()
  )
);

CREATE POLICY "Project admins and managers can update projects"
ON projects FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM project_members
    WHERE project_members.project_id = id
    AND project_members.user_id = auth.uid()
    AND project_members.role IN ('admin', 'manager')
  )
);

-- Similar policies for other tables...
```

## Setting Up Database Triggers

Create triggers to automatically update timestamps:

```sql
-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to tables
CREATE TRIGGER set_timestamp_profiles
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER set_timestamp_projects
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER set_timestamp_documents
BEFORE UPDATE ON documents
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER set_timestamp_tasks
BEFORE UPDATE ON tasks
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER set_timestamp_comments
BEFORE UPDATE ON comments
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
```

## Setting Up Database Functions

Create useful database functions:

```sql
-- Function to get all project members with their profiles
CREATE OR REPLACE FUNCTION get_project_members(project_id UUID)
RETURNS TABLE (
  user_id UUID,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  role TEXT
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.first_name,
    p.last_name,
    p.email,
    pm.role
  FROM profiles p
  JOIN project_members pm ON p.id = pm.user_id
  WHERE pm.project_id = $1;
END;
$$;

-- Function to get project statistics
CREATE OR REPLACE FUNCTION get_project_stats(project_id UUID)
RETURNS TABLE (
  total_tasks INT,
  completed_tasks INT,
  overdue_tasks INT,
  documents_count INT
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM tasks WHERE tasks.project_id = $1) as total_tasks,
    (SELECT COUNT(*) FROM tasks WHERE tasks.project_id = $1 AND tasks.status = 'completed') as completed_tasks,
    (SELECT COUNT(*) FROM tasks WHERE tasks.project_id = $1 AND tasks.due_date < CURRENT_DATE AND tasks.status != 'completed') as overdue_tasks,
    (SELECT COUNT(*) FROM documents WHERE documents.project_id = $1) as documents_count;
END;
$$;
```

## Verifying the Schema

After running these SQL scripts, you can verify them by:

1. Navigate to "Table Editor" in the Supabase Dashboard
2. Check that all tables have been created with the correct columns
3. Try inserting test data to ensure the constraints and RLS policies work correctly

## Testing RLS Policies

To test your RLS policies, you can use the SQL Editor:

```sql
-- First set the role to a test user
SELECT set_config('request.jwt.claims', '{"sub": "<user-uuid>"}', false);

-- Then try various SELECT, INSERT, UPDATE queries to ensure
-- the policies are working correctly
SELECT * FROM projects;
```

## Troubleshooting

If you encounter issues:

1. Check the SQL syntax for errors
2. Ensure all referenced tables and columns exist
3. Verify that your RLS policies have correct conditions
4. Try dropping and recreating problematic tables if needed (be cautious with production data)

## Keeping Schema Updated

As your application evolves:

1. Keep all schema changes in version control
2. Use migration scripts for making changes to the schema
3. Test migrations thoroughly before applying to production
4. Back up your database before applying significant changes

## Helpful Supabase SQL Commands

```sql
-- List all tables
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Get table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'your_table_name';

-- List RLS policies
SELECT * FROM pg_policies;
```

## Resources

- [Supabase SQL Documentation](https://supabase.com/docs/guides/database)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security) 