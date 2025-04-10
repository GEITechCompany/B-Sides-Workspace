'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiSave } from 'react-icons/fi'

// Reuse the mock data from the task detail page
const mockTasks = [
  { 
    id: '1', 
    title: 'Website redesign homepage', 
    description: 'Redesign the homepage to improve user engagement and conversion rate. Focus on mobile responsiveness and clear call-to-actions.',
    projectId: '1',
    projectName: 'Website Redesign',
    clientId: '1',
    clientName: 'Acme Corporation',
    assignedTo: 'user2',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2023-12-15',
    estimatedHours: 12,
    actualHours: 8,
    tags: ['design', 'frontend'],
    createdAt: '2023-09-20',
    updatedAt: '2023-10-05'
  },
  { 
    id: '2', 
    title: 'Create email newsletter template', 
    description: 'Design and develop an email newsletter template that aligns with the brand guidelines. Must be responsive and compatible with major email clients.',
    projectId: '3',
    projectName: 'Email Campaign',
    clientId: '1',
    clientName: 'Acme Corporation',
    assignedTo: 'user1',
    status: 'todo',
    priority: 'medium',
    dueDate: '2023-12-20',
    estimatedHours: 6,
    actualHours: 0,
    tags: ['design', 'email-marketing'],
    createdAt: '2023-10-01',
    updatedAt: '2023-10-01'
  },
  { 
    id: '3', 
    title: 'SEO audit and competitor analysis', 
    description: 'Conduct a comprehensive SEO audit of the website and analyze top 5 competitors. Provide recommendations for improvement.',
    projectId: '2',
    projectName: 'SEO Optimization',
    clientId: '1',
    clientName: 'Acme Corporation',
    assignedTo: 'user3',
    status: 'completed',
    priority: 'high',
    dueDate: '2023-08-25',
    estimatedHours: 10,
    actualHours: 12,
    tags: ['seo', 'research'],
    createdAt: '2023-07-15',
    updatedAt: '2023-08-25'
  },
  { 
    id: '4', 
    title: 'Brand guide development', 
    description: 'Create a comprehensive brand guide including logo usage, color palette, typography, and brand voice guidelines.',
    projectId: '4',
    projectName: 'Brand Identity',
    clientId: '2',
    clientName: 'Globex Industries',
    assignedTo: 'user1',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2023-11-30',
    estimatedHours: 15,
    actualHours: 10,
    tags: ['branding', 'design'],
    createdAt: '2023-08-15',
    updatedAt: '2023-10-20'
  },
  { 
    id: '5', 
    title: 'Security audit implementation', 
    description: 'Implement the recommendations from the security audit report. Focus on fixing critical vulnerabilities first.',
    projectId: '7',
    projectName: 'Security Audit',
    clientId: '4',
    clientName: 'Wayne Industries',
    assignedTo: 'user3',
    status: 'in-progress',
    priority: 'urgent',
    dueDate: '2023-11-15',
    estimatedHours: 20,
    actualHours: 15,
    tags: ['security', 'backend'],
    createdAt: '2023-10-16',
    updatedAt: '2023-10-25'
  }
]

// Mock project data
const mockProjects = [
  { id: '1', name: 'Website Redesign', clientId: '1', clientName: 'Acme Corporation' },
  { id: '2', name: 'SEO Optimization', clientId: '1', clientName: 'Acme Corporation' },
  { id: '3', name: 'Email Campaign', clientId: '1', clientName: 'Acme Corporation' },
  { id: '4', name: 'Brand Identity', clientId: '2', clientName: 'Globex Industries' },
  { id: '5', name: 'Social Media Management', clientId: '2', clientName: 'Globex Industries' },
  { id: '6', name: 'Mobile App Development', clientId: '3', clientName: 'Stark Enterprises' },
  { id: '7', name: 'Security Audit', clientId: '4', clientName: 'Wayne Industries' },
]

// Mock user data
const mockUsers = [
  { id: 'user1', name: 'Alex Johnson', avatar: '/avatars/alex.jpg', role: 'Designer' },
  { id: 'user2', name: 'Sam Rodriguez', avatar: '/avatars/sam.jpg', role: 'Developer' },
  { id: 'user3', name: 'Taylor Kim', avatar: '/avatars/taylor.jpg', role: 'SEO Specialist' },
]

// Task statuses with their labels
const statuses = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'review', label: 'In Review' },
  { value: 'completed', label: 'Completed' },
  { value: 'blocked', label: 'Blocked' }
]

// Priorities with their labels
const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' }
]

// Common tags for autocomplete
const commonTags = [
  'design', 'development', 'frontend', 'backend', 'research',
  'seo', 'content', 'branding', 'email-marketing', 'security',
  'bug', 'feature', 'improvement', 'documentation', 'testing'
]

export default function EditTaskPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tagInput, setTagInput] = useState('')
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    assignedTo: '',
    status: '',
    priority: '',
    dueDate: '',
    estimatedHours: 0,
    actualHours: 0,
    tags: [] as string[]
  })
  
  // Find the task with the matching ID and populate form data
  useEffect(() => {
    const task = mockTasks.find(task => task.id === id)
    
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        projectId: task.projectId,
        assignedTo: task.assignedTo,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        estimatedHours: task.estimatedHours,
        actualHours: task.actualHours,
        tags: [...task.tags]
      })
    }
  }, [id])
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'estimatedHours' || name === 'actualHours' 
        ? parseFloat(value) || 0 
        : value
    }))
  }
  
  const handleAddTag = () => {
    if (!tagInput.trim() || formData.tags.includes(tagInput.trim())) return
    
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, tagInput.trim()]
    }))
    setTagInput('')
  }
  
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }
  
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call with a delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would make a PUT/PATCH request to update the task
      console.log('Updated task data:', formData)
      
      // Redirect to task details page after successful update
      router.push(`/tasks/${id}`)
    } catch (error) {
      console.error('Error updating task:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Handle case where the task doesn't exist in our mock data
  if (!mockTasks.some(task => task.id === id)) {
    return (
      <div className="space-y-6">
        <div className="card p-6">
          <h1 className="text-xl font-medium text-red-500">Task not found</h1>
          <p className="mt-2">The requested task with ID {id} could not be found.</p>
          <Link 
            href="/tasks"
            className="mt-4 btn-primary inline-flex items-center"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Return to Tasks
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
          <p className="text-gray-500">Update task details and information</p>
        </div>
        <div className="flex space-x-3">
          <Link 
            href={`/tasks/${id}`}
            className="btn-outline inline-flex items-center"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Link>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Details */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Task Details</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Task Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="projectId" className="block text-sm font-medium text-gray-700">
                  Project*
                </label>
                <select
                  id="projectId"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">-- Select Project --</option>
                  {mockProjects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name} ({project.clientName})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
                  Assigned To*
                </label>
                <select
                  id="assignedTo"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">-- Select User --</option>
                  {mockUsers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status*
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">-- Select Status --</option>
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority*
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">-- Select Priority --</option>
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                  Due Date*
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="estimatedHours" className="block text-sm font-medium text-gray-700">
                    Estimated Hours
                  </label>
                  <input
                    type="number"
                    id="estimatedHours"
                    name="estimatedHours"
                    value={formData.estimatedHours}
                    onChange={handleChange}
                    min="0"
                    step="0.5"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="actualHours" className="block text-sm font-medium text-gray-700">
                    Actual Hours
                  </label>
                  <input
                    type="number"
                    id="actualHours"
                    name="actualHours"
                    value={formData.actualHours}
                    onChange={handleChange}
                    min="0"
                    step="0.5"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Add tags and press Enter"
                  list="tag-suggestions"
                  className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <datalist id="tag-suggestions">
                  {commonTags.map(tag => (
                    <option key={tag} value={tag} />
                  ))}
                </datalist>
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                >
                  Add
                </button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-200"
                      >
                        <span className="sr-only">Remove tag {tag}</span>
                        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                          <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Link 
            href={`/tasks/${id}`}
            className="btn-outline"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary inline-flex items-center"
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