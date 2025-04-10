'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiCalendar, FiUser, FiDollarSign, FiSave } from 'react-icons/fi'

// Mock client data
const mockClients = [
  { id: '1', name: 'Acme Corporation', contactName: 'John Doe', email: 'john@acme.com' },
  { id: '2', name: 'Globex Industries', contactName: 'Jane Smith', email: 'jane@globex.com' },
  { id: '3', name: 'Stark Enterprises', contactName: 'Tony Stark', email: 'tony@stark.com' },
  { id: '4', name: 'Wayne Industries', contactName: 'Bruce Wayne', email: 'bruce@wayne.com' },
  { id: '5', name: 'Umbrella Corp', contactName: 'Alice Johnson', email: 'alice@umbrella.com' },
]

// Mock user data
const mockUsers = [
  { id: 'user1', name: 'Alex Johnson', avatar: '/avatars/alex.jpg', role: 'Designer' },
  { id: 'user2', name: 'Sam Rodriguez', avatar: '/avatars/sam.jpg', role: 'Developer' },
  { id: 'user3', name: 'Taylor Kim', avatar: '/avatars/taylor.jpg', role: 'SEO Specialist' },
]

// Project statuses
const projectStatuses = [
  { id: 'planning', name: 'Planning' },
  { id: 'in-progress', name: 'In Progress' },
  { id: 'on-hold', name: 'On Hold' },
  { id: 'completed', name: 'Completed' },
  { id: 'cancelled', name: 'Cancelled' }
]

// Project budget types
const budgetTypes = [
  { id: 'fixed', name: 'Fixed Price' },
  { id: 'hourly', name: 'Hourly Rate' },
  { id: 'monthly', name: 'Monthly Retainer' }
]

// Project types/categories
const projectTypes = [
  { id: 'web-design', name: 'Web Design' },
  { id: 'web-development', name: 'Web Development' },
  { id: 'mobile-app', name: 'Mobile App Development' },
  { id: 'branding', name: 'Branding & Identity' },
  { id: 'digital-marketing', name: 'Digital Marketing' },
  { id: 'seo', name: 'SEO & Content' },
  { id: 'maintenance', name: 'Maintenance & Support' },
  { id: 'consulting', name: 'Consulting' },
  { id: 'other', name: 'Other' }
]

export default function NewProjectPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  
  // Get current date
  const today = new Date().toISOString().split('T')[0]
  
  // Default end date (3 months from today)
  const threeMonthsFromNow = new Date()
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)
  const defaultEndDate = threeMonthsFromNow.toISOString().split('T')[0]
  
  // Check if client ID is provided in URL params
  const clientIdFromUrl = searchParams.get('client')
  
  const [formData, setFormData] = useState({
    name: '',
    clientId: clientIdFromUrl || '',
    description: '',
    projectType: '',
    status: 'planning',
    startDate: today,
    endDate: defaultEndDate,
    budgetType: 'fixed',
    budgetAmount: '',
    hourlyRate: '0',
    estimatedHours: '0',
    notes: '',
    isHighPriority: false
  })
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }
  
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // Only allow numeric values with up to 2 decimal places
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }
  
  const handleMemberToggle = (userId: string) => {
    if (selectedMembers.includes(userId)) {
      setSelectedMembers(prev => prev.filter(id => id !== userId))
    } else {
      setSelectedMembers(prev => [...prev, userId])
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Calculate total budget based on budget type
    let calculatedBudget = 0
    if (formData.budgetType === 'fixed') {
      calculatedBudget = parseFloat(formData.budgetAmount) || 0
    } else if (formData.budgetType === 'hourly') {
      calculatedBudget = parseFloat(formData.hourlyRate) * parseFloat(formData.estimatedHours)
    } else if (formData.budgetType === 'monthly') {
      // Calculate months between start and end date
      const startDate = new Date(formData.startDate)
      const endDate = new Date(formData.endDate)
      const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                    (endDate.getMonth() - startDate.getMonth())
      calculatedBudget = parseFloat(formData.budgetAmount) * (months || 1)
    }
    
    const projectData = {
      ...formData,
      teamMembers: selectedMembers,
      calculatedBudget
    }
    
    // Simulate API call with a delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would make a POST request to create the project
      console.log('Project data:', projectData)
      
      // Redirect to projects page after successful creation
      router.push('/projects')
    } catch (error) {
      console.error('Error creating project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
          <p className="text-gray-500">Set up a new project and assign team members</p>
        </div>
        <div className="flex space-x-3">
          <Link 
            href="/projects"
            className="btn-outline inline-flex items-center"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Link>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Project Details */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Project Details</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Project Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Website Redesign, Mobile App Development, etc."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">
                  Client*
                </label>
                <select
                  id="clientId"
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">-- Select Client --</option>
                  {mockClients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name} ({client.contactName})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">
                  Project Type*
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">-- Select Project Type --</option>
                  {projectTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
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
                  {projectStatuses.map(status => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <div className="flex items-center h-full mt-6">
                  <input
                    id="isHighPriority"
                    name="isHighPriority"
                    type="checkbox"
                    checked={formData.isHighPriority}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="isHighPriority" className="ml-2 block text-sm text-gray-700">
                    High Priority Project
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Project Description*
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe the project scope, goals, and objectives..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* Dates and Budget */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Dates & Budget</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date*
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  End Date*
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    min={formData.startDate}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="budgetType" className="block text-sm font-medium text-gray-700">
                Budget Type*
              </label>
              <select
                id="budgetType"
                name="budgetType"
                value={formData.budgetType}
                onChange={handleChange}
                required
                className="mt-1 block w-full md:w-1/2 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                {budgetTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Conditional budget fields based on budget type */}
            {formData.budgetType === 'fixed' && (
              <div>
                <label htmlFor="budgetAmount" className="block text-sm font-medium text-gray-700">
                  Budget Amount*
                </label>
                <div className="mt-1 relative rounded-md shadow-sm w-full md:w-1/3">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="budgetAmount"
                    name="budgetAmount"
                    value={formData.budgetAmount}
                    onChange={handleBudgetChange}
                    required
                    placeholder="0.00"
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            )}
            
            {formData.budgetType === 'hourly' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                    Hourly Rate*
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="hourlyRate"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleBudgetChange}
                      required
                      placeholder="0.00"
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="estimatedHours" className="block text-sm font-medium text-gray-700">
                    Estimated Hours*
                  </label>
                  <input
                    type="number"
                    id="estimatedHours"
                    name="estimatedHours"
                    value={formData.estimatedHours}
                    onChange={handleChange}
                    required
                    min="0"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">
                    Estimated Budget: ${parseFloat(formData.hourlyRate || '0') * parseFloat(formData.estimatedHours || '0')}
                  </p>
                </div>
              </div>
            )}
            
            {formData.budgetType === 'monthly' && (
              <div>
                <label htmlFor="budgetAmount" className="block text-sm font-medium text-gray-700">
                  Monthly Rate*
                </label>
                <div className="mt-1 relative rounded-md shadow-sm w-full md:w-1/3">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="budgetAmount"
                    name="budgetAmount"
                    value={formData.budgetAmount}
                    onChange={handleBudgetChange}
                    required
                    placeholder="0.00"
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                {formData.startDate && formData.endDate && (
                  <p className="mt-2 text-sm text-gray-600">
                    Project Duration: {calculateMonthsBetweenDates(formData.startDate, formData.endDate)} months
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Team Members */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Team Members</h2>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Select team members who will be working on this project.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockUsers.map(user => (
                <div 
                  key={user.id}
                  className={`border rounded-md p-4 cursor-pointer transition duration-150 
                    ${selectedMembers.includes(user.id) 
                      ? 'bg-primary-50 border-primary-300' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                  onClick={() => handleMemberToggle(user.id)}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(user.id)}
                      onChange={() => {}}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <div className="ml-3 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Additional Notes */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Notes</h2>
          
          <div>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any additional details, internal notes, or special requirements for this project..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            ></textarea>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Link 
            href="/projects"
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
                Creating Project...
              </>
            ) : (
              <>
                <FiSave className="mr-2 h-4 w-4" />
                Create Project
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

// Helper function to calculate months between two dates
function calculateMonthsBetweenDates(startDateStr: string, endDateStr: string): number {
  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)
  
  // Calculate difference in months
  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                (endDate.getMonth() - startDate.getMonth())
  
  // Ensure at least 1 month
  return Math.max(1, months)
} 