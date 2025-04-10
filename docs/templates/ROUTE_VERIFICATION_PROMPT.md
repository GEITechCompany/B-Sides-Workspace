# Link and Route Verification Prompt

## Link Audit Process

### 1. Identify All Active Links

First, let's identify all active links in the application by examining each component:

```typescript
// Example code to systematically find all links in components
// This is a pattern to look for:
<Link href="/some/path">Link Text</Link>
// or
<a href="/some/path">Link Text</a>
// or
router.push('/some/path')
```

Use a codebase search tool to find all instances of:
- `<Link href="`
- `<a href="`
- `router.push('` or `router.push(`
- `navigate('` or `navigate(`

### 2. Extract Route Patterns

Based on the links, compile a list of unique route patterns:
- Static routes: `/clients`, `/settings`, etc.
- Dynamic routes: `/clients/[id]`, `/projects/[id]/tasks`, etc.

### 3. Compare with Existing Routes

Check which routes already exist by examining the file structure in `src/app` (for App Router) or `src/pages` (for Pages Router).

For App Router:
- Static route: `src/app/route/page.tsx`
- Dynamic route: `src/app/route/[param]/page.tsx`

For Pages Router:
- Static route: `src/pages/route.tsx`
- Dynamic route: `src/pages/route/[param].tsx`

### 4. Identify Missing Routes

Create a list of all routes that are linked to but don't have corresponding page components.

## Route Creation Template

For each missing route, create the necessary files based on the following templates:

### Static Page Template

```typescript
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

export default function NewRoutePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">[Route Name]</h1>
          <p className="text-gray-500">[Route Description]</p>
        </div>
        <Link 
          href="[parent route]"
          className="btn-outline inline-flex items-center"
        >
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </div>
      
      {/* Main content goes here */}
      <div className="card">
        <p>Content for [Route Name] page</p>
      </div>
    </div>
  )
}
```

### Dynamic Page Template

```typescript
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiEdit } from 'react-icons/fi'

// Include mock data relevant to the route
const mockData = [
  { id: '1', /* other fields */ },
  { id: '2', /* other fields */ },
  // ...more items
]

export default function DynamicItemPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  
  // Find the item with the matching ID
  const item = mockData.find(item => item.id === id)
  
  // Handle case where the item doesn't exist
  if (!item) {
    return (
      <div className="space-y-6">
        <div className="card p-6">
          <h1 className="text-xl font-medium text-red-500">Item not found</h1>
          <p className="mt-2">The requested item with ID {id} could not be found.</p>
          <Link 
            href="[parent route]"
            className="mt-4 btn-primary inline-flex items-center"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Return to [parent route name]
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{item.name || `Item ${id}`}</h1>
          <p className="text-gray-500">Viewing details for item #{id}</p>
        </div>
        <div className="flex space-x-3">
          <Link 
            href="[parent route]"
            className="btn-outline inline-flex items-center"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
          <Link 
            href={`[edit route]/${id}/edit`}
            className="btn-primary inline-flex items-center"
          >
            <FiEdit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </div>
      </div>
      
      {/* Item details */}
      <div className="card">
        <pre className="text-sm overflow-auto p-4 bg-gray-50 rounded">
          {JSON.stringify(item, null, 2)}
        </pre>
      </div>
      
      {/* Additional sections specific to this item type */}
    </div>
  )
}
```

### Edit Page Template

```typescript
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiSave, FiX } from 'react-icons/fi'

// Include mock data relevant to the route
const mockData = [
  { id: '1', /* other fields */ },
  { id: '2', /* other fields */ },
  // ...more items
]

export default function EditItemPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  
  // Find the item with the matching ID
  const initialItem = mockData.find(item => item.id === id)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState(initialItem || {})
  
  // Handle case where the item doesn't exist
  if (!initialItem) {
    return (
      <div className="space-y-6">
        <div className="card p-6">
          <h1 className="text-xl font-medium text-red-500">Item not found</h1>
          <p className="mt-2">The requested item with ID {id} could not be found.</p>
          <Link 
            href="[parent route]"
            className="mt-4 btn-primary inline-flex items-center"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Return to [parent route name]
          </Link>
        </div>
      </div>
    )
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Here you would typically make an API call to update the item
      // For this mock implementation, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect back to item view
      router.push(`[parent route]/${id}`)
    } catch (error) {
      console.error(`Error updating item:`, error)
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit {initialItem.name || `Item ${id}`}</h1>
          <p className="text-gray-500">Modify details for this item</p>
        </div>
        <Link 
          href={`[parent route]/${id}`}
          className="btn-outline inline-flex items-center"
        >
          <FiX className="mr-2 h-4 w-4" />
          Cancel
        </Link>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields based on the item's properties */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Item Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Generate form fields dynamically based on the item's structure */}
            {Object.keys(initialItem).map(key => {
              if (key === 'id') return null; // Skip the ID field
              
              return (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    className="form-input w-full"
                    value={formData[key] || ''}
                    onChange={handleChange}
                  />
                </div>
              )
            })}
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Link 
            href={`[parent route]/${id}`}
            className="btn-secondary"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="btn-primary inline-flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <FiSave className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
```

## Mock Data Considerations

When creating route pages, ensure that:

1. The mock data used is consistent across related pages
2. Dynamic routes use the same ID parameter system as the existing routes
3. The data structure follows the same pattern as other similar entities in the app

## Route Implementation Checklist

For each route implementation:

- [ ] Verify the route path pattern is correct and matches the link that points to it
- [ ] Ensure all parent directories exist in the file system
- [ ] Create the appropriate page component file
- [ ] Implement the component with appropriate mock data
- [ ] Test the route by navigating to it from its entry point
- [ ] Ensure any links from this new page also have valid routes

## Priority Routes to Implement

Based on the client request and examination of the codebase, implement these missing routes first:

1. Client detail page: `/clients/[id]`
2. Client edit page: `/clients/[id]/edit`
3. Project detail page: `/projects/[id]`
4. Project edit page: `/projects/[id]/edit`
5. Task detail page: `/tasks/[id]`
6. Task edit page: `/tasks/[id]/edit`

## Example Implementation for the Client Detail Page

For the client detail page, we need to:

1. Create the directory: `src/app/(dashboard)/clients/[id]`
2. Create the file: `src/app/(dashboard)/clients/[id]/page.tsx`
3. Copy the appropriate template (dynamic page template)
4. Customize the template with client-specific data and UI

Follow the same pattern for all other missing routes.

## Troubleshooting

If issues arise during implementation:

1. Verify that the directory structure follows the expected pattern for your Next.js version
2. Check for any conflicts with existing routes
3. Ensure dynamic segments are correctly represented with square brackets in the file structure
4. Verify all imports are functioning correctly
5. Test the route by navigating directly to it, as well as through links 