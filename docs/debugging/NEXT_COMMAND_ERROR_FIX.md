# Fixing the "next: command not found" Error

## Error Description

When running `npm run dev`, you may encounter the following error:

```
sh: next: command not found
```

This error occurs when the `next` command is not found in your system's PATH. This could happen for several reasons:

1. Next.js is not properly installed in your project
2. Your node_modules folder is corrupted or missing
3. There's an issue with your npm configuration
4. PATH environment issues

## Solution Options

### Option 1: Install Next.js Locally (Recommended)

Ensure Next.js is properly installed in your project:

```bash
npm install next@14.0.3 --save
```

### Option 2: Use npx to Run Next.js

If you don't want to modify your dependencies, you can use npx:

```bash
# Modify your package.json scripts
# Change from:
# "dev": "next dev"
# To:
# "dev": "npx next dev"
```

### Option 3: Reinstall All Dependencies

If you suspect corrupted node_modules:

```bash
rm -rf node_modules
npm install
```

### Option 4: Check Your node_modules/.bin Directory

Ensure the next binary exists:

```bash
ls -la node_modules/.bin/next
```

If it doesn't exist, your Next.js installation is incomplete.

### Option 5: Use Absolute Path

Modify your package.json scripts:

```json
"scripts": {
  "dev": "node_modules/.bin/next dev",
  "build": "node_modules/.bin/next build",
  "start": "node_modules/.bin/next start"
}
```

## Verifying the Fix

After applying one of the solutions above, run:

```bash
npm run dev
```

The Next.js development server should start correctly now, and you should see output indicating the server is running.

## Prevention Tips

1. Always use `npm install` before running the project for the first time
2. Make sure you're in the correct directory when running npm commands
3. Use a consistent Node.js version for your project (consider using nvm)
4. Keep your npm and Node.js versions up to date

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs/getting-started)
- [npm Documentation](https://docs.npmjs.com/) 