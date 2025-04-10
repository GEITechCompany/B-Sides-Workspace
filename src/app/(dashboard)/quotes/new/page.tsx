'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiCalendar, FiDollarSign, FiPlus, FiTrash2, FiSave } from 'react-icons/fi'

// Mock client data
const mockClients = [
  { id: '1', name: 'Acme Corporation', contactName: 'John Doe', email: 'john@acme.com' },
  { id: '2', name: 'Globex Industries', contactName: 'Jane Smith', email: 'jane@globex.com' },
  { id: '3', name: 'Stark Enterprises', contactName: 'Tony Stark', email: 'tony@stark.com' },
  { id: '4', name: 'Wayne Industries', contactName: 'Bruce Wayne', email: 'bruce@wayne.com' },
  { id: '5', name: 'Umbrella Corp', contactName: 'Alice Johnson', email: 'alice@umbrella.com' },
]

// Mock services/products that can be added to quotes
const mockServices = [
  { id: 'web-design', name: 'Web Design', description: 'Custom website design', rate: 95 },
  { id: 'web-dev', name: 'Web Development', description: 'Frontend and backend development', rate: 110 },
  { id: 'seo', name: 'SEO Services', description: 'Search engine optimization', rate: 85 },
  { id: 'content', name: 'Content Creation', description: 'Blog posts and website content', rate: 75 },
  { id: 'branding', name: 'Branding Package', description: 'Logo and brand identity design', rate: 1200 },
  { id: 'social', name: 'Social Media Management', description: 'Monthly social media management', rate: 650 },
  { id: 'analytics', name: 'Analytics Setup', description: 'Google Analytics and reporting setup', rate: 350 },
  { id: 'maintenance', name: 'Website Maintenance', description: 'Monthly website maintenance', rate: 250 },
]

// Tax rates
const taxRates = [
  { id: 'none', name: 'No Tax', rate: 0 },
  { id: 'sales5', name: 'Sales Tax (5%)', rate: 5 },
  { id: 'sales7', name: 'Sales Tax (7%)', rate: 7 },
  { id: 'sales10', name: 'Sales Tax (10%)', rate: 10 },
  { id: 'vat20', name: 'VAT (20%)', rate: 20 },
]

// Quote statuses
const quoteStatuses = [
  { id: 'draft', name: 'Draft' },
  { id: 'sent', name: 'Sent' },
  { id: 'viewed', name: 'Viewed' },
  { id: 'accepted', name: 'Accepted' },
  { id: 'rejected', name: 'Rejected' },
  { id: 'expired', name: 'Expired' },
]

// Interface for quote line items
interface LineItem {
  id: string;
  serviceId: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export default function NewQuotePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Get current date and a date 30 days from now
  const today = new Date().toISOString().split('T')[0]
  const thirtyDaysFromNow = new Date()
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
  const expiryDate = thirtyDaysFromNow.toISOString().split('T')[0]
  
  // Generate a new quote number (would be done server-side in a real app)
  const quoteNumber = `Q-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  
  const [formData, setFormData] = useState({
    quoteNumber,
    clientId: '',
    status: 'draft',
    issueDate: today,
    expiryDate: expiryDate,
    taxRateId: 'none',
    discount: 0,
    notes: '',
    termsAndConditions: 'Payment is due within 15 days of invoice date. All quoted prices are valid for 30 days from the date of this quote.',
  })
  
  const [lineItems, setLineItems] = useState<LineItem[]>([])
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
      setFormData(prev => ({
        ...prev,
        discount: value === '' ? 0 : Number(value)
      }))
    }
  }
  
  const handleAddLineItem = () => {
    // Create a unique ID for the line item
    const newId = `item-${Date.now()}`
    
    const newLineItem: LineItem = {
      id: newId,
      serviceId: '',
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    }
    
    setLineItems(prev => [...prev, newLineItem])
  }
  
  const handleRemoveLineItem = (id: string) => {
    setLineItems(prev => prev.filter(item => item.id !== id))
  }
  
  const handleLineItemChange = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          
          // If the service field changes, update the description and rate
          if (field === 'serviceId' && value) {
            const selectedService = mockServices.find(service => service.id === value)
            if (selectedService) {
              updatedItem.description = selectedService.description
              updatedItem.rate = selectedService.rate
              updatedItem.amount = selectedService.rate * updatedItem.quantity
            }
          }
          
          // If quantity or rate changes, recalculate the amount
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = updatedItem.rate * updatedItem.quantity
          }
          
          return updatedItem
        }
        return item
      })
    )
  }
  
  // Calculate subtotal
  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0)
  
  // Calculate discount amount
  const discountAmount = (subtotal * (formData.discount / 100)) || 0
  
  // Calculate tax
  const selectedTaxRate = taxRates.find(tax => tax.id === formData.taxRateId)
  const taxRate = selectedTaxRate ? selectedTaxRate.rate : 0
  const taxAmount = ((subtotal - discountAmount) * (taxRate / 100)) || 0
  
  // Calculate total
  const total = subtotal - discountAmount + taxAmount
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const quoteData = {
      ...formData,
      lineItems,
      subtotal,
      discountAmount,
      taxAmount,
      total
    }
    
    // Simulate API call with a delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would make a POST request to create the quote
      console.log('Quote data:', quoteData)
      
      // Redirect to quotes page after successful creation
      router.push('/quotes')
    } catch (error) {
      console.error('Error creating quote:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Quote</h1>
          <p className="text-gray-500">Prepare a detailed quote for your client</p>
        </div>
        <div className="flex space-x-3">
          <Link 
            href="/quotes"
            className="btn-outline inline-flex items-center"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Link>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Quote Details */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quote Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="quoteNumber" className="block text-sm font-medium text-gray-700">
                Quote Number
              </label>
              <input
                type="text"
                id="quoteNumber"
                name="quoteNumber"
                value={formData.quoteNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-gray-50"
                readOnly
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                {quoteStatuses.map(status => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
            
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
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700">
                  Issue Date*
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="issueDate"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleChange}
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Expiry Date*
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Line Items */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Quote Items</h2>
            <button
              type="button"
              onClick={handleAddLineItem}
              className="btn-secondary inline-flex items-center text-sm"
            >
              <FiPlus className="mr-2 h-4 w-4" />
              Add Item
            </button>
          </div>
          
          {lineItems.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-md">
              <p className="text-gray-500">No items added to this quote yet.</p>
              <button
                type="button"
                onClick={handleAddLineItem}
                className="mt-2 btn-primary inline-flex items-center text-sm"
              >
                <FiPlus className="mr-2 h-4 w-4" />
                Add First Item
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service/Item
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rate
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {lineItems.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={item.serviceId}
                          onChange={(e) => handleLineItemChange(item.id, 'serviceId', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                        >
                          <option value="">-- Select Service --</option>
                          {mockServices.map(service => (
                            <option key={service.id} value={service.id}>
                              {service.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleLineItemChange(item.id, 'description', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                          placeholder="Description"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleLineItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                          className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.rate}
                            onChange={(e) => handleLineItemChange(item.id, 'rate', parseFloat(e.target.value) || 0)}
                            className="pl-7 block w-24 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {formatCurrency(item.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          type="button"
                          onClick={() => handleRemoveLineItem(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FiTrash2 className="h-5 w-5" />
                          <span className="sr-only">Remove item</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Quote Summary */}
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="flex justify-end">
                  <div className="w-full md:w-72">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">{formatCurrency(subtotal)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-2">Discount:</span>
                          <div className="w-16">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={formData.discount}
                              onChange={handleDiscountChange}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                            />
                          </div>
                          <span className="ml-1">%</span>
                        </div>
                        <span className="font-medium">{formatCurrency(discountAmount)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-2">Tax:</span>
                          <div className="w-32">
                            <select
                              name="taxRateId"
                              value={formData.taxRateId}
                              onChange={handleChange}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                            >
                              {taxRates.map(tax => (
                                <option key={tax.id} value={tax.id}>
                                  {tax.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <span className="font-medium">{formatCurrency(taxAmount)}</span>
                      </div>
                      
                      <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-lg">{formatCurrency(total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Additional Notes & Terms */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Notes & Terms</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes (visible to client)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any notes or special instructions for the client..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="termsAndConditions" className="block text-sm font-medium text-gray-700">
                Terms & Conditions
              </label>
              <textarea
                id="termsAndConditions"
                name="termsAndConditions"
                rows={3}
                value={formData.termsAndConditions}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Link 
            href="/quotes"
            className="btn-outline"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || lineItems.length === 0}
            className="btn-primary inline-flex items-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Quote...
              </>
            ) : (
              <>
                <FiSave className="mr-2 h-4 w-4" />
                {formData.status === 'draft' ? 'Save as Draft' : 'Save and Send'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
} 