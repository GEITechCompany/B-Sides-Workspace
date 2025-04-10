'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiSave } from 'react-icons/fi'

// Reuse the mock data from the client detail page
const mockClients = [
  { 
    id: '1', 
    name: 'Acme Corporation', 
    contactName: 'John Doe', 
    email: 'john@acme.com', 
    phone: '555-1234', 
    projects: 3,
    address: '123 Business Ave.',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'United States',
    website: 'https://acme.example.com',
    notes: 'Reliable client with prompt payment history. Interested in expanding digital presence in the next quarter.'
  },
  { 
    id: '2', 
    name: 'Globex Industries', 
    contactName: 'Jane Smith', 
    email: 'jane@globex.com', 
    phone: '555-5678', 
    projects: 5,
    address: '456 Corporate Blvd.',
    city: 'New York',
    state: 'NY',
    zip: '10022',
    country: 'United States',
    website: 'https://globex.example.com',
    notes: 'Long-term client with multiple ongoing projects. Prefers weekly status updates via email.'
  },
  { 
    id: '3', 
    name: 'Stark Enterprises', 
    contactName: 'Tony Stark', 
    email: 'tony@stark.com', 
    phone: '555-9012', 
    projects: 2,
    address: '789 Innovation Way',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90015',
    country: 'United States',
    website: 'https://stark.example.com',
    notes: 'High-tech focus. Very demanding but pays premium rates. Requires NDA for all projects.'
  },
  { 
    id: '4', 
    name: 'Wayne Industries', 
    contactName: 'Bruce Wayne', 
    email: 'bruce@wayne.com', 
    phone: '555-3456', 
    projects: 1,
    address: '1007 Mountain Drive',
    city: 'Gotham',
    state: 'NJ',
    zip: '07101',
    country: 'United States',
    website: 'https://wayne.example.com',
    notes: 'New client with strong interest in security-focused projects. Budget is not a concern.'
  },
  { 
    id: '5', 
    name: 'Umbrella Corp', 
    contactName: 'Alice Johnson', 
    email: 'alice@umbrella.com', 
    phone: '555-7890', 
    projects: 4,
    address: '321 Science Park',
    city: 'Boston',
    state: 'MA',
    zip: '02210',
    country: 'United States',
    website: 'https://umbrella.example.com',
    notes: 'Pharmaceutical company with multiple ongoing projects. Strict deadlines and compliance requirements.'
  },
]

// Countries list for the dropdown
const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "Brazil",
  "India"
];

// US states for the dropdown
const usStates = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export default function EditClientPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    website: '',
    notes: ''
  })
  
  // Find the client with the matching ID and populate form data
  useEffect(() => {
    const client = mockClients.find(client => client.id === id)
    
    if (client) {
      setFormData({
        name: client.name,
        contactName: client.contactName,
        email: client.email,
        phone: client.phone,
        address: client.address,
        city: client.city,
        state: client.state,
        zip: client.zip,
        country: client.country,
        website: client.website || '',
        notes: client.notes || ''
      })
    }
  }, [id])
  
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
    
    // Simulate API call with a delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would make a PUT/PATCH request to update the client
      console.log('Updated client data:', formData)
      
      // Redirect to client details page after successful update
      router.push(`/clients/${id}`)
    } catch (error) {
      console.error('Error updating client:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Handle case where the client doesn't exist in our mock data
  if (!mockClients.some(client => client.id === id)) {
    return (
      <div className="space-y-6">
        <div className="card p-6">
          <h1 className="text-xl font-medium text-red-500">Client not found</h1>
          <p className="mt-2">The requested client with ID {id} could not be found.</p>
          <Link 
            href="/clients"
            className="mt-4 btn-primary inline-flex items-center"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Return to Clients
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Client</h1>
          <p className="text-gray-500">Update client information</p>
        </div>
        <div className="flex space-x-3">
          <Link 
            href={`/clients/${id}`}
            className="btn-outline inline-flex items-center"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Link>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client Information */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Client Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Company Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                Primary Contact Name*
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
        
        {/* Address Information */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Address</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State/Province
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">-- Select --</option>
                  {usStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                  ZIP/Postal Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Notes */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Notes</h2>
          
          <div>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any additional details or notes about this client..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            ></textarea>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Link 
            href={`/clients/${id}`}
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