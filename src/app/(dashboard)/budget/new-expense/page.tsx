'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiCalendar, FiDollarSign, FiFileText, FiTrendingUp, FiUser, FiTag, FiSave } from 'react-icons/fi'

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

// Mock expense categories
const expenseCategories = [
  { id: 'software', name: 'Software & Subscriptions' },
  { id: 'hardware', name: 'Hardware & Equipment' },
  { id: 'travel', name: 'Travel & Transportation' },
  { id: 'office', name: 'Office Supplies' },
  { id: 'salary', name: 'Salaries & Benefits' },
  { id: 'contractor', name: 'Contractor Fees' },
  { id: 'marketing', name: 'Marketing & Advertising' },
  { id: 'legal', name: 'Legal & Professional Fees' },
  { id: 'training', name: 'Training & Education' },
  { id: 'meals', name: 'Meals & Entertainment' },
  { id: 'rent', name: 'Rent & Utilities' },
  { id: 'misc', name: 'Miscellaneous' }
]

// Mock user data for expense assignment
const mockUsers = [
  { id: 'user1', name: 'Alex Johnson', avatar: '/avatars/alex.jpg', role: 'Designer' },
  { id: 'user2', name: 'Sam Rodriguez', avatar: '/avatars/sam.jpg', role: 'Developer' },
  { id: 'user3', name: 'Taylor Kim', avatar: '/avatars/taylor.jpg', role: 'SEO Specialist' },
]

// Payment methods
const paymentMethods = [
  { id: 'credit', name: 'Company Credit Card' },
  { id: 'debit', name: 'Company Debit Card' },
  { id: 'cash', name: 'Cash' },
  { id: 'transfer', name: 'Bank Transfer' },
  { id: 'check', name: 'Check' },
  { id: 'paypal', name: 'PayPal' },
  { id: 'venmo', name: 'Venmo' },
  { id: 'reimbursement', name: 'Reimbursement' }
]

// Tax deduction types
const taxDeductionTypes = [
  { id: 'full', name: 'Fully Deductible' },
  { id: 'partial', name: 'Partially Deductible' },
  { id: 'none', name: 'Non-Deductible' }
]

// Expense tags
const commonTags = [
  'recurring', 'one-time', 'client-billable', 'essential', 'office',
  'remote-work', 'subscription', 'meeting', 'equipment', 'travel'
]

export default function NewExpensePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tagInput, setTagInput] = useState('')
  
  // Get current date
  const currentDate = new Date().toISOString().split('T')[0]
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: currentDate,
    categoryId: '',
    projectId: '',
    assignedTo: '',
    paymentMethod: 'credit',
    receipt: null as File | null,
    notes: '',
    isRecurring: false,
    recurringFrequency: 'monthly',
    isBillable: false,
    taxDeductionType: 'full',
    tags: [] as string[]
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
    } else if (type === 'file') {
      const fileInput = e.target as HTMLInputElement
      if (fileInput.files && fileInput.files[0]) {
        setFormData(prev => ({
          ...prev,
          receipt: fileInput.files![0]
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
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
    
    // Format amount to ensure it's a valid number
    const formattedAmount = parseFloat(formData.amount.replace(/[^0-9.]/g, '')).toFixed(2)
    
    const expenseData = {
      ...formData,
      amount: formattedAmount,
      // We'd handle file upload differently in a real app
      receipt: formData.receipt ? formData.receipt.name : null
    }
    
    // Simulate API call with a delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would make a POST request to create the expense
      console.log('Expense data:', expenseData)
      
      // Redirect to budget page after successful creation
      router.push('/budget')
    } catch (error) {
      console.error('Error creating expense:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Format currency input
  const formatCurrency = (value: string) => {
    // Remove all non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '')
    
    // Ensure only one decimal point
    const parts = numericValue.split('.')
    const formattedValue = parts[0] + (parts.length > 1 ? '.' + parts.slice(1).join('') : '')
    
    // Add dollar sign and format with commas
    if (formattedValue) {
      return '$' + formattedValue
    }
    
    return ''
  }
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const numericValue = rawValue.replace(/[^0-9.]/g, '')
    
    if (numericValue === '' || !isNaN(parseFloat(numericValue))) {
      const formattedValue = formatCurrency(numericValue)
      setFormData(prev => ({ ...prev, amount: formattedValue }))
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Expense</h1>
          <p className="text-gray-500">Record a new expense or purchase</p>
        </div>
        <div className="flex space-x-3">
          <Link 
            href="/budget"
            className="btn-outline inline-flex items-center"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Link>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Expense Details */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Expense Details</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Expense Description*
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="e.g. Office supplies, Software subscription, etc."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount*
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleAmountChange}
                    required
                    placeholder="0.00"
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date*
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                  Category*
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">-- Select Category --</option>
                  {expenseCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                  Payment Method*
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  {paymentMethods.map(method => (
                    <option key={method.id} value={method.id}>
                      {method.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="projectId" className="block text-sm font-medium text-gray-700">
                  Related Project
                </label>
                <select
                  id="projectId"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">-- No Related Project --</option>
                  {mockProjects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name} ({project.clientName})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
                  Assigned To / Purchased By
                </label>
                <select
                  id="assignedTo"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
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
            </div>
            
            <div>
              <label htmlFor="receipt" className="block text-sm font-medium text-gray-700">
                Receipt (Optional)
              </label>
              <input
                type="file"
                id="receipt"
                name="receipt"
                onChange={handleChange}
                accept="image/*,.pdf"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-600 hover:file:bg-primary-100"
              />
              <p className="mt-1 text-xs text-gray-500">
                Upload a photo or PDF of your receipt (max 5MB)
              </p>
            </div>
          </div>
        </div>
        
        {/* Additional Details */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Details</h2>
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
              <div className="flex items-center">
                <input
                  id="isRecurring"
                  name="isRecurring"
                  type="checkbox"
                  checked={formData.isRecurring}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="isRecurring" className="ml-2 block text-sm text-gray-700">
                  Recurring Expense
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="isBillable"
                  name="isBillable"
                  type="checkbox"
                  checked={formData.isBillable}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="isBillable" className="ml-2 block text-sm text-gray-700">
                  Billable to Client
                </label>
              </div>
            </div>
            
            {formData.isRecurring && (
              <div>
                <label htmlFor="recurringFrequency" className="block text-sm font-medium text-gray-700">
                  Recurring Frequency
                </label>
                <select
                  id="recurringFrequency"
                  name="recurringFrequency"
                  value={formData.recurringFrequency}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
            )}
            
            <div>
              <label htmlFor="taxDeductionType" className="block text-sm font-medium text-gray-700">
                Tax Deduction Type
              </label>
              <select
                id="taxDeductionType"
                name="taxDeductionType"
                value={formData.taxDeductionType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                {taxDeductionTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
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
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional details about this expense..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Link 
            href="/budget"
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
                Saving Expense...
              </>
            ) : (
              <>
                <FiSave className="mr-2 h-4 w-4" />
                Save Expense
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
} 