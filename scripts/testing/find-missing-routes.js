/**
 * Script to find missing routes in a Next.js application
 * 
 * This script:
 * 1. Scans source files for Link components and router.push calls
 * 2. Extracts the route paths from these navigation methods
 * 3. Checks if the corresponding route files exist
 * 4. Outputs a report of missing routes
 * 
 * Usage:
 * node scripts/testing/find-missing-routes.js
 * 
 * Optional flags:
 * --fix: Generate template files for missing routes
 * --verbose: Show more detailed information
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

// Configuration
const APP_DIR = path.join(__dirname, '../../src/app');
const PAGES_DIR = path.join(__dirname, '../../src/pages');
const SRC_DIR = path.join(__dirname, '../../src');
const TEMPLATE_DIR = path.join(__dirname, '../../docs/templates');

// Using App Router by default, change to false if using Pages Router
const isUsingAppRouter = true;
const rootDir = isUsingAppRouter ? APP_DIR : PAGES_DIR;

// Parse command line arguments
const args = process.argv.slice(2);
const shouldFix = args.includes('--fix');
const isVerbose = args.includes('--verbose');

// Regular expressions to extract routes
const linkRegex = /<Link[^>]*href=["'](\/[^"']*?)["'][^>]*>/g;
const routerPushRegex = /router\.push\(["'](\/[^"']*?)["']\)/g;
const navigateRegex = /navigate\(["'](\/[^"']*?)["']\)/g;
const paramRegex = /\/\[([^\]]+)\]/g;

/**
 * Find all TypeScript files in a directory recursively
 */
async function findTsxFiles(dir) {
  const { stdout } = await execAsync(`find ${dir} -name "*.tsx" -o -name "*.ts"`);
  return stdout.trim().split('\n').filter(file => file);
}

/**
 * Extract route paths from a file
 */
async function extractRoutePaths(filePath) {
  const content = await fs.promises.readFile(filePath, 'utf8');
  const routes = new Set();
  
  // Find Link components
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    routes.add(match[1]);
  }
  
  // Find router.push calls
  while ((match = routerPushRegex.exec(content)) !== null) {
    routes.add(match[1]);
  }
  
  // Find navigate calls
  while ((match = navigateRegex.exec(content)) !== null) {
    routes.add(match[1]);
  }
  
  return [...routes];
}

/**
 * Convert a route path to a file path
 */
function routeToFilePath(route) {
  // Remove trailing slash if it exists
  route = route.endsWith('/') ? route.slice(0, -1) : route;
  
  // Handle root route
  if (route === '/') {
    return isUsingAppRouter 
      ? path.join(rootDir, 'page.tsx')
      : path.join(rootDir, 'index.tsx');
  }
  
  // Handle dynamic routes
  let filePath = route.replace(/^\//, ''); // Remove leading slash
  
  if (isUsingAppRouter) {
    // For App Router, the file should be page.tsx inside the directory
    return path.join(rootDir, filePath, 'page.tsx');
  } else {
    // For Pages Router, convert to file path
    return path.join(rootDir, `${filePath}.tsx`);
  }
}

/**
 * Check if a route file exists
 */
function routeFileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Generate dynamic route parameters for Next.js
 */
function extractDynamicParams(route) {
  const params = [];
  let match;
  
  while ((match = paramRegex.exec(route)) !== null) {
    params.push(match[1]);
  }
  
  return params;
}

/**
 * Determine whether a route is dynamic (has path parameters)
 */
function isDynamicRoute(route) {
  return paramRegex.test(route);
}

/**
 * Create parent directories if they don't exist
 */
function ensureDirectoryExists(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
    console.log(`Created directory: ${dirname}`);
  }
}

/**
 * Read template file based on route type
 */
async function getTemplateForRoute(route) {
  try {
    const isEditRoute = route.includes('/edit');
    const isDynamic = isDynamicRoute(route);
    
    let templateContent;
    
    if (isEditRoute) {
      // Use edit page template
      templateContent = await fs.promises.readFile(
        path.join(TEMPLATE_DIR, 'ROUTE_VERIFICATION_PROMPT.md'),
        'utf8'
      );
      
      // Extract the edit page template section
      const editTemplateMatch = templateContent.match(/### Edit Page Template\s+```typescript([\s\S]+?)```/);
      if (editTemplateMatch) {
        return editTemplateMatch[1];
      }
    } else if (isDynamic) {
      // Use dynamic page template
      templateContent = await fs.promises.readFile(
        path.join(TEMPLATE_DIR, 'ROUTE_VERIFICATION_PROMPT.md'),
        'utf8'
      );
      
      // Extract the dynamic page template section
      const dynamicTemplateMatch = templateContent.match(/### Dynamic Page Template\s+```typescript([\s\S]+?)```/);
      if (dynamicTemplateMatch) {
        return dynamicTemplateMatch[1];
      }
    } else {
      // Use static page template
      templateContent = await fs.promises.readFile(
        path.join(TEMPLATE_DIR, 'ROUTE_VERIFICATION_PROMPT.md'),
        'utf8'
      );
      
      // Extract the static page template section
      const staticTemplateMatch = templateContent.match(/### Static Page Template\s+```typescript([\s\S]+?)```/);
      if (staticTemplateMatch) {
        return staticTemplateMatch[1];
      }
    }
    
    // Fallback to simple template if extraction fails
    return `'use client'\n\nexport default function Page() {\n  return <div>Route for ${route}</div>\n}\n`;
  } catch (error) {
    console.warn(`Could not read template: ${error.message}`);
    return `'use client'\n\nexport default function Page() {\n  return <div>Route for ${route}</div>\n}\n`;
  }
}

/**
 * Create a route file from template
 */
async function createRouteFile(route, filePath) {
  try {
    ensureDirectoryExists(filePath);
    
    // Get appropriate template
    let template = await getTemplateForRoute(route);
    
    // Do some basic customization
    const routeName = route.split('/').filter(Boolean).pop() || 'Home';
    const parentRoute = route.split('/').slice(0, -1).join('/') || '/';
    const routeDisplayName = routeName.charAt(0).toUpperCase() + routeName.slice(1);
    
    template = template
      .replace(/\[Route Name\]/g, routeDisplayName)
      .replace(/\[Route Description\]/g, `Details for ${routeDisplayName}`)
      .replace(/\[parent route\]/g, parentRoute)
      .replace(/\[parent route name\]/g, parentRoute === '/' ? 'Home' : parentRoute.split('/').pop());
    
    // Write the file
    await fs.promises.writeFile(filePath, template);
    console.log(`Created route file: ${filePath}`);
  } catch (error) {
    console.error(`Failed to create route file ${filePath}: ${error.message}`);
  }
}

/**
 * Extract entity name from route
 */
function getEntityFromRoute(route) {
  const parts = route.split('/').filter(Boolean);
  return parts[0] || 'unknown';
}

/**
 * Find all route paths in the codebase and check if they exist
 */
async function findMissingRoutes() {
  try {
    // Find all TypeScript files
    const tsxFiles = await findTsxFiles(SRC_DIR);
    if (isVerbose) {
      console.log(`Found ${tsxFiles.length} TypeScript files to scan`);
    }
    
    // Extract routes from all files
    let allRoutes = new Set();
    for (const file of tsxFiles) {
      const routes = await extractRoutePaths(file);
      routes.forEach(route => allRoutes.add(route));
    }
    
    console.log(`Found ${allRoutes.size} unique routes in the codebase`);
    
    // Check which routes don't have corresponding files
    const missingRoutes = [];
    
    for (const route of allRoutes) {
      const filePath = routeToFilePath(route);
      
      if (!routeFileExists(filePath)) {
        missingRoutes.push({ route, filePath });
      }
    }
    
    // Organize missing routes by entity
    const missingByEntity = {};
    
    for (const { route, filePath } of missingRoutes) {
      const entity = getEntityFromRoute(route);
      if (!missingByEntity[entity]) {
        missingByEntity[entity] = [];
      }
      missingByEntity[entity].push({ route, filePath });
    }
    
    // Display report
    console.log('\n=== Missing Routes Report ===\n');
    
    if (missingRoutes.length === 0) {
      console.log('✅ All routes have corresponding files.');
    } else {
      console.log(`❌ Found ${missingRoutes.length} missing routes:`);
      
      for (const entity in missingByEntity) {
        console.log(`\n${entity.toUpperCase()}:`);
        for (const { route, filePath } of missingByEntity[entity]) {
          console.log(`  ${route} => ${filePath}`);
          
          // Create the route file if --fix flag is provided
          if (shouldFix) {
            await createRouteFile(route, filePath);
          }
        }
      }
      
      if (!shouldFix) {
        console.log('\nTo automatically generate template files for these routes, run:');
        console.log('node scripts/testing/find-missing-routes.js --fix');
      }
    }
    
    return missingRoutes;
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}

// Run the script
findMissingRoutes(); 