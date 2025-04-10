# B-Sides Platform Link Verification Prompt

I need help identifying and fixing broken links in the B-Sides platform user interface and documentation. Please assist with a systematic approach to ensure all links are functioning correctly.

## Link Verification Scope

- [ ] Documentation links (README.md and all guide documents)
- [ ] Navigation links in the web application
- [ ] Button and action links
- [ ] API endpoint references
- [ ] Asset links (images, CSS, JS files)
- [ ] External service links (Supabase, authentication)

## Environment Information

- **Project structure**: Reorganized documentation in `/docs` subdirectories
- **Local development URL**: [http://localhost:3000](http://localhost:3000)
- **Documentation base path**: `/docs/`
- **Current issue**: Some links are resulting in 404 errors after reorganization

## Link Types to Verify

### Documentation Links

1. **Internal cross-references**: Links between documentation files
   - Example: `See the [Debugging Guide](../debugging/DEBUG_GUIDE.md)` 

2. **Root references**: Links from documentation to application files
   - Example: `Configure the database using [schema](/supabase/schema/init.sql)`

3. **Anchor links**: Links to sections within the same document
   - Example: `See [Troubleshooting](#troubleshooting) below`

### Application Links

1. **Navigation links**: Main menu, sidebar, footer links
2. **Action buttons**: Submit, Cancel, Edit, Delete, etc.
3. **Authentication flows**: Login, Signup, Password reset
4. **CRUD operations**: Create, view, edit resources
5. **File operations**: Upload, download, preview

## Specific Link Issues to Check

1. **Broken paths after reorganization**:
   - Links using old file locations instead of new `/docs/category/` structure
   - Incorrect relative path traversal (`../` usage)

2. **Inconsistent path formats**:
   - Mixing of absolute and relative paths
   - Hardcoded vs. dynamic links

3. **Missing files or resources**:
   - References to files that don't exist
   - References to routes that aren't implemented

## Verification Methods

1. **Automated crawling**:
   ```bash
   # Example command for documentation link checking
   npx markdown-link-check README.md --config link-check-config.json
   
   # Example for application link checking
   npx broken-link-checker http://localhost:3000 -ro
   ```

2. **Manual testing**:
   - Systematic clicking through all UI elements
   - Testing authentication and CRUD flows
   - Verifying document navigation

## Current Link Structure

- Documentation links now follow: `docs/[category]/[DOCUMENT_NAME].md`
- Internal references should use relative paths: `../[category]/[DOCUMENT_NAME].md`
- Application routes follow: `/[resource]/[action]/[id]`

## Requested Solutions

1. **Link audit report**:
   - List of all broken links identified
   - Location of each broken link (file and line number)
   - Expected correct link target

2. **Automated fix script**:
   - Script to update documentation internal links
   - Path normalization for consistent linking

3. **Path management strategy**:
   - Recommendations for managing links in documentation
   - Best practices for route management in Next.js

## Questions

1. What's the most efficient way to verify all documentation links after restructuring?
2. Should we maintain backward compatibility with symbolic links or update all references?
3. What's the best practice for linking between documentation and application code?
4. How can we prevent link breakage during future reorganizations?
5. What automated tools would you recommend for ongoing link verification?

---

## Example of Current Issues

```markdown
# Before reorganization
See the [Debugging Guide](../debugging/DEBUG_GUIDE.md) for troubleshooting.

# After reorganization (broken)
See the [Debugging Guide](../debugging/DEBUG_GUIDE.md) for troubleshooting.

# After reorganization (correct)
See the [Debugging Guide](../debugging/DEBUG_GUIDE.md) for troubleshooting.
```

Please provide:
1. A comprehensive audit of broken links
2. A strategy for fixing all identified issues
3. Recommendations for future link management 