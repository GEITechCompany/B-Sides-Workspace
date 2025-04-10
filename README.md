# B-Sides Platform Documentation

Welcome to the B-Sides Platform - a comprehensive project management system built with Next.js, TypeScript, and Supabase.

## About B-Sides Platform

B-Sides is a modern project management platform designed to facilitate collaboration between clients and service providers. It features document sharing, task management, and team communication capabilities in a secure and user-friendly interface.

## Recent Fixes

We've recently addressed several issues in the platform:

- Fixed the "next: command not found" error for the development server
- Reorganized documentation files into a structured directory system
- Fixed broken documentation links after the reorganization

For a complete summary of fixes, see the [Fix Summary](docs/FIX_SUMMARY.md) document.

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Deployment**: Render.com

## Documentation Organization

All documentation is organized into the following categories:

- `docs/setup/` - Project setup and initialization guides
- `docs/database/` - Database schema and Supabase configuration
- `docs/optimization/` - Performance optimization resources
- `docs/debugging/` - Troubleshooting and debugging guides
- `docs/templates/` - Templates for common tasks and requests
- `scripts/testing/` - Testing and utility scripts

## Guides and Documentation

We've prepared a comprehensive set of guides to help you get started with the B-Sides platform:

### Setup Guides

- [Project Startup Guide](docs/setup/PROJECT_STARTUP_GUIDE.md) - Complete instructions for setting up the project locally
- [General Setup Guide](docs/setup/SETUP_GUIDE.md) - Additional setup information

### Database Documentation

- [SQL Schema Guide](docs/database/SQL_SCHEMA_GUIDE.md) - Database schema setup and management

### Debugging Guides

- [Debugging Guide](docs/debugging/DEBUG_GUIDE.md) - Troubleshooting common issues
- [Next Command Not Found Fix](docs/debugging/NEXT_COMMAND_ERROR_FIX.md) - Solving the common "next: command not found" error

### Optimization Guides

- [Project Optimization Guide](docs/optimization/PROJECT_OPTIMIZATION_GUIDE.md) - Comprehensive strategies for optimizing performance
- [Optimization Checklist](docs/optimization/OPTIMIZATION_CHECKLIST.md) - Prioritized list of high-impact optimizations
- [Optimization Request Template](docs/optimization/OPTIMIZATION_REQUEST_PROMPT.md) - Template for requesting specific optimizations
- [Optimization Debugging Prompt](docs/optimization/OPTIMIZATION_DEBUGGING_PROMPT.md) - Guide for debugging optimization-related issues
- [Optimization Debugging Example](docs/optimization/OPTIMIZATION_DEBUGGING_EXAMPLE.md) - Real-world example of debugging an optimization error
- [Stress Test Prompt](docs/optimization/STRESS_TEST_PROMPT.md) - Template for planning and requesting stress testing
- [Stress Test Guide](docs/optimization/STRESS_TEST_GUIDE.md) - Comprehensive guide for stress testing

### Templates

- [Error Fix Prompt](docs/templates/ERROR_FIX_PROMPT.md) - Template for creating detailed error reports
- [Link Verification Prompt](docs/templates/LINK_VERIFICATION_PROMPT.md) - Template for verifying UI and documentation links
- [Route Verification Prompt](docs/templates/ROUTE_VERIFICATION_PROMPT.md) - Template for checking and implementing missing routes

### Utility Scripts

- [Fix Broken Links](scripts/testing/fix-broken-links.js) - Script to find and fix broken documentation links after reorganization
- [Find Missing Routes](scripts/testing/find-missing-routes.js) - Script to detect and generate missing route pages

## Project Structure

The B-Sides platform codebase is organized as follows:

- `/united-platform` - Main project directory
- `/src` - Source code
- `/supabase` - Supabase configuration
- `/scripts` - Utility scripts
  - `/scripts/testing` - Testing scripts and utilities

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`
4. Configure Supabase by following the [SQL Schema Guide](docs/database/SQL_SCHEMA_GUIDE.md)
5. Start the development server: `npm run dev`
6. Visit [http://localhost:3000](http://localhost:3000) to view the application

> **Note:** If you encounter the "next: command not found" error, refer to our [troubleshooting guide](docs/debugging/NEXT_COMMAND_ERROR_FIX.md).

## Fixing Broken Links

After the documentation reorganization, you may encounter broken links. To fix them:

1. Install required dependencies: `npm install glob`
2. Run the link checker: `node scripts/testing/fix-broken-links.js`
3. To automatically fix broken links: `node scripts/testing/fix-broken-links.js --fix`

## Verifying and Fixing Missing Routes

To ensure all links in the UI have corresponding route handlers:

1. Check for missing routes: `node scripts/testing/find-missing-routes.js`
2. To automatically generate route templates: `node scripts/testing/find-missing-routes.js --fix`
3. For more detailed analysis: `node scripts/testing/find-missing-routes.js --verbose`

This helps prevent 404 errors when users click on links in the interface. For a comprehensive approach to route verification, refer to the [Route Verification Prompt](docs/templates/ROUTE_VERIFICATION_PROMPT.md).

## Key Features

- **Project Management**: Create and manage projects with detailed information
- **Document Management**: Upload, organize, and share documents securely
- **Task Tracking**: Assign and monitor tasks with status updates
- **Team Collaboration**: Work together with team members and clients
- **Authentication**: Secure login and role-based permissions
- **Storage**: Dedicated storage buckets for different document types

## Contributing

Contributions to the B-Sides platform are welcome! Before contributing, please read through the documentation and ensure you understand the project structure and coding conventions.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## Support

If you need assistance or have questions about the B-Sides platform, please refer to the debugging guide or create an issue in the repository. 