/**
 * fix-broken-links.js
 * 
 * This script helps find and fix broken links in documentation files
 * after the reorganization of files into the docs/ directory structure.
 * 
 * Usage: node scripts/testing/fix-broken-links.js [--fix]
 * 
 * Without the --fix flag, it will only report broken links
 * With the --fix flag, it will update the broken links
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Define the file reorganization mapping
const FILE_MAPPING = {
  // Original file path -> New file path
  'DEBUG_GUIDE.md': 'docs/debugging/DEBUG_GUIDE.md',
  'NEXT_COMMAND_ERROR_FIX.md': 'docs/debugging/NEXT_COMMAND_ERROR_FIX.md',
  'PROJECT_OPTIMIZATION_GUIDE.md': 'docs/optimization/PROJECT_OPTIMIZATION_GUIDE.md',
  'OPTIMIZATION_CHECKLIST.md': 'docs/optimization/OPTIMIZATION_CHECKLIST.md',
  'OPTIMIZATION_REQUEST_PROMPT.md': 'docs/optimization/OPTIMIZATION_REQUEST_PROMPT.md',
  'OPTIMIZATION_DEBUGGING_PROMPT.md': 'docs/optimization/OPTIMIZATION_DEBUGGING_PROMPT.md',
  'OPTIMIZATION_DEBUGGING_EXAMPLE.md': 'docs/optimization/OPTIMIZATION_DEBUGGING_EXAMPLE.md',
  'STRESS_TEST_PROMPT.md': 'docs/optimization/STRESS_TEST_PROMPT.md',
  'STRESS_TEST_GUIDE.md': 'docs/optimization/STRESS_TEST_GUIDE.md',
  'PROJECT_STARTUP_GUIDE.md': 'docs/setup/PROJECT_STARTUP_GUIDE.md',
  'SETUP_GUIDE.md': 'docs/setup/SETUP_GUIDE.md',
  'SQL_SCHEMA_GUIDE.md': 'docs/database/SQL_SCHEMA_GUIDE.md',
  'ERROR_FIX_PROMPT.md': 'docs/templates/ERROR_FIX_PROMPT.md',
};

// Reverse mapping for lookups
const REVERSE_MAPPING = {};
Object.keys(FILE_MAPPING).forEach(key => {
  const newPath = FILE_MAPPING[key];
  REVERSE_MAPPING[newPath] = key;
});

// Whether to just find or also fix the links
const shouldFix = process.argv.includes('--fix');

/**
 * Get all markdown files in the docs directory
 */
function findMarkdownFiles() {
  return glob.sync('docs/**/*.md');
}

/**
 * Find all markdown links in a file
 * @param {string} content - File content
 * @returns {Array} - Array of found links with their positions
 */
function findMarkdownLinks(content) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    links.push({
      text: match[1],
      url: match[2],
      fullMatch: match[0],
      index: match.index,
      length: match[0].length
    });
  }
  
  return links;
}

/**
 * Check if a link is potentially broken after reorganization
 * @param {string} link - The link to check
 * @param {string} currentFile - The file containing the link
 * @returns {boolean} - Whether the link might be broken
 */
function isPotentiallyBrokenLink(link, currentFile) {
  // Skip external links and anchor links
  if (link.startsWith('http') || link.startsWith('#')) {
    return false;
  }
  
  // Check if the link is an old-style link that needs updating
  const isOldStyle = Object.keys(FILE_MAPPING).some(oldPath => {
    return link === oldPath || link.endsWith(`/${oldPath}`);
  });
  
  if (isOldStyle) {
    return true;
  }
  
  // Check if the link points to a file that doesn't exist
  try {
    const resolvedPath = path.resolve(path.dirname(currentFile), link);
    return !fs.existsSync(resolvedPath);
  } catch (e) {
    // If there's an error resolving the path, consider it potentially broken
    return true;
  }
}

/**
 * Fix a broken link by updating it to the new path
 * @param {string} link - The broken link
 * @param {string} currentFile - The file containing the link
 * @returns {string|null} - The fixed link or null if can't be fixed
 */
function fixBrokenLink(link, currentFile) {
  // Direct match for old files
  if (FILE_MAPPING[link]) {
    // Get the new path relative to the current file
    const absoluteCurrentDir = path.dirname(path.resolve(currentFile));
    const absoluteNewPath = path.resolve(FILE_MAPPING[link]);
    return path.relative(absoluteCurrentDir, absoluteNewPath);
  }
  
  // Handle more complex cases
  for (const oldPath of Object.keys(FILE_MAPPING)) {
    if (link.endsWith(`/${oldPath}`)) {
      const prefix = link.substring(0, link.length - oldPath.length);
      const newPath = FILE_MAPPING[oldPath];
      
      // Get the new path relative to the current file
      const absoluteCurrentDir = path.dirname(path.resolve(currentFile));
      const absoluteNewPath = path.resolve(newPath);
      return path.relative(absoluteCurrentDir, absoluteNewPath);
    }
  }
  
  return null; // Couldn't fix automatically
}

/**
 * Process a markdown file to find and optionally fix broken links
 * @param {string} filePath - Path to the markdown file
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const links = findMarkdownLinks(content);
    let newContent = content;
    let offset = 0;
    
    const brokenLinks = links.filter(link => isPotentiallyBrokenLink(link.url, filePath));
    
    if (brokenLinks.length === 0) {
      console.log(`✅ ${filePath}: No broken links found`);
      return;
    }
    
    console.log(`🔍 ${filePath}: Found ${brokenLinks.length} potentially broken links`);
    
    if (shouldFix) {
      // Process links in reverse order to avoid invalidating the indices
      brokenLinks.sort((a, b) => b.index - a.index);
      
      for (const link of brokenLinks) {
        const fixedLink = fixBrokenLink(link.url, filePath);
        
        if (fixedLink) {
          console.log(`  • Fixing: [${link.text}](${link.url}) → [${link.text}](${fixedLink})`);
          
          const before = newContent.substring(0, link.index);
          const replacement = `[${link.text}](${fixedLink})`;
          const after = newContent.substring(link.index + link.length);
          
          newContent = before + replacement + after;
        } else {
          console.log(`  • Could not fix: [${link.text}](${link.url}) - manual review needed`);
        }
      }
      
      fs.writeFileSync(filePath, newContent);
      console.log(`✅ ${filePath}: Updated ${brokenLinks.length} links`);
    } else {
      // Just report the broken links
      brokenLinks.forEach(link => {
        console.log(`  • [${link.text}](${link.url}) - line ${countLines(content, link.index)}`);
        
        const fixedLink = fixBrokenLink(link.url, filePath);
        if (fixedLink) {
          console.log(`    Suggested fix: [${link.text}](${fixedLink})`);
        }
      });
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

/**
 * Count the lines up to a specific index in a string
 * @param {string} str - The string to analyze
 * @param {number} index - The index to count lines up to
 * @returns {number} - The line number (1-based)
 */
function countLines(str, index) {
  return str.substring(0, index).split('\n').length;
}

/**
 * Main function to process all markdown files
 */
function main() {
  const files = findMarkdownFiles();
  console.log(`Found ${files.length} markdown files to check`);
  
  files.forEach(processFile);
  
  if (!shouldFix) {
    console.log('\nRun with --fix to automatically update the broken links');
  }
}

// Execute the script
main(); 