/**
 * Simplified script to find missing routes in a Next.js application
 * Enhanced to handle Next.js 13+ App Router with layout groups
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const SRC_DIR = './src';
const APP_DIR = './src/app';

// Regular expressions to extract routes
const linkRegex = /<Link[^>]*href=["'](\/[^"']*?)["'][^>]*>/g;
const routerPushRegex = /router\.push\(["'](\/[^"']*?)["']\)/g;

/**
 * Extracts routes from a file
 */
function extractRoutes(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
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
    
    return [...routes];
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error.message}`);
    return [];
  }
}

/**
 * Find layout group directories like (dashboard)
 */
function findLayoutGroups(appDir) {
  try {
    const items = fs.readdirSync(appDir);
    const layoutGroups = {};
    
    for (const item of items) {
      const fullPath = path.join(appDir, item);
      if (fs.statSync(fullPath).isDirectory() && item.startsWith('(') && item.endsWith(')')) {
        // This is a layout group
        const groupContent = fs.readdirSync(fullPath);
        layoutGroups[item] = groupContent;
      }
    }
    
    return layoutGroups;
  } catch (error) {
    console.error(`Error finding layout groups: ${error.message}`);
    return {};
  }
}

/**
 * Check if a route belongs to a layout group
 */
function findLayoutGroupForRoute(route, layoutGroups) {
  // Extract the first segment of the route
  const firstSegment = route.split('/')[1];
  
  // Check if this segment exists as a directory in any layout group
  for (const [groupName, contents] of Object.entries(layoutGroups)) {
    if (contents.includes(firstSegment)) {
      return {
        groupName,
        routeInGroup: true
      };
    }
  }
  
  return {
    groupName: null,
    routeInGroup: false
  };
}

/**
 * Converts a route to a file path, handling App Router layout groups
 */
function routeToFilePath(route, layoutGroups) {
  // Remove trailing slash if it exists
  route = route.endsWith('/') ? route.slice(0, -1) : route;
  
  // Handle root route
  if (route === '/') {
    return path.join(APP_DIR, 'page.tsx');
  }
  
  // Handle dynamic routes
  let filePath = route.replace(/^\//, ''); // Remove leading slash
  
  // Check if this belongs to a layout group
  const { groupName, routeInGroup } = findLayoutGroupForRoute(route, layoutGroups);
  
  if (routeInGroup && groupName) {
    // This route belongs to a layout group
    // We need to adjust the path to include the layout group
    const segments = filePath.split('/');
    const firstSegment = segments[0];
    segments.shift(); // Remove the first segment
    
    return path.join(APP_DIR, groupName, firstSegment, ...segments, 'page.tsx');
  }
  
  // For App Router, the file should be page.tsx inside the directory
  return path.join(APP_DIR, filePath, 'page.tsx');
}

/**
 * Scan for potential dynamic routes not explicitly linked
 */
function scanForImplicitRoutes(existingRoutes) {
  const implicitRoutes = [];
  
  // Common patterns for dynamic routes
  const patterns = [
    { base: '/clients', dynamic: '/clients/[id]', edit: '/clients/[id]/edit' },
    { base: '/projects', dynamic: '/projects/[id]', edit: '/projects/[id]/edit' },
    { base: '/tasks', dynamic: '/tasks/[id]', edit: '/tasks/[id]/edit' },
    { base: '/quotes', dynamic: '/quotes/[id]', edit: '/quotes/[id]/edit' }
  ];
  
  // Check if the base route exists, and if so, add the dynamic and edit routes
  for (const pattern of patterns) {
    if (existingRoutes.includes(pattern.base)) {
      implicitRoutes.push(pattern.dynamic);
      implicitRoutes.push(pattern.edit);
    }
  }
  
  return implicitRoutes;
}

/**
 * Main function to find missing routes
 */
function findMissingRoutes() {
  try {
    // Check if src directory exists
    if (!fs.existsSync(SRC_DIR)) {
      console.error(`Source directory not found: ${SRC_DIR}`);
      console.log('Make sure you are running this script from the project root.');
      return;
    }
    
    // Find layout groups
    const layoutGroups = findLayoutGroups(APP_DIR);
    console.log('Found layout groups:', Object.keys(layoutGroups));
    
    // Get all TSX files
    const command = process.platform === 'win32'
      ? `dir /s /b "${SRC_DIR}\\*.tsx"`
      : `find ${SRC_DIR} -name "*.tsx" -o -name "*.ts"`;
    
    const output = execSync(command, { encoding: 'utf8' });
    const files = output.trim().split('\n').filter(Boolean);
    
    console.log(`Found ${files.length} TypeScript files to scan`);
    
    // Extract routes from all files
    let allRoutes = new Set();
    for (const file of files) {
      const routes = extractRoutes(file);
      routes.forEach(route => allRoutes.add(route));
    }
    
    const uniqueRoutes = [...allRoutes];
    console.log(`\nFound ${uniqueRoutes.length} unique routes explicitly linked in the codebase:`);
    uniqueRoutes.forEach(route => console.log(`- ${route}`));
    
    // Scan for implicit routes
    const implicitRoutes = scanForImplicitRoutes(uniqueRoutes);
    console.log(`\nFound ${implicitRoutes.length} potential dynamic routes not explicitly linked:`);
    implicitRoutes.forEach(route => console.log(`- ${route}`));
    
    // Combine explicit and implicit routes
    const allPossibleRoutes = [...new Set([...uniqueRoutes, ...implicitRoutes])];
    
    // Check which routes don't have corresponding files
    const missingRoutes = [];
    
    for (const route of allPossibleRoutes) {
      const filePath = routeToFilePath(route, layoutGroups);
      
      if (!fs.existsSync(filePath)) {
        missingRoutes.push({ route, filePath });
      }
    }
    
    // Display report
    console.log('\n=== Missing Routes Report ===\n');
    
    if (missingRoutes.length === 0) {
      console.log('✅ All routes have corresponding files.');
    } else {
      console.log(`❌ Found ${missingRoutes.length} missing routes:`);
      
      // Group by entity (first path segment)
      const routesByEntity = {};
      
      for (const { route, filePath } of missingRoutes) {
        const entity = route.split('/')[1] || 'root';
        if (!routesByEntity[entity]) {
          routesByEntity[entity] = [];
        }
        routesByEntity[entity].push({ route, filePath });
      }
      
      // Display grouped routes
      for (const entity in routesByEntity) {
        console.log(`\n${entity.toUpperCase()}:`);
        for (const { route, filePath } of routesByEntity[entity]) {
          console.log(`  ${route} => ${filePath}`);
        }
      }
      
      console.log('\nTo implement these routes, follow the templates in docs/templates/ROUTE_VERIFICATION_PROMPT.md');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the script
findMissingRoutes(); 