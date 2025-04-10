'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiPlusCircle, FiSearch, FiFileText, FiDownload, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi'

// Mock data for quotes
const mockQuotes = [
  { 
    id: '1', 
    title: 'Website Redesign Services', 
    client: 'Acme Corporation',
    clientId: '1',
    totalAmount: 15000.00,
    status: 'sent',
    validUntil: '2023-12-31',
    createdAt: '2023-11-15',
    items: [
      { id: '1-1', description: 'UI/UX Design', quantity: 1, unitPrice: 5000, totalPrice: 5000 },
      { id: '1-2', description: 'Frontend Development', quantity: 1, unitPrice: 6000, totalPrice: 6000 },
      { id: '1-3', description: 'CMS Integration', quantity: 1, unitPrice: 4000, totalPrice: 4000 }
    ]
  },
  { 
    id: '2', 
    title: 'Brand Identity Package', 
    client: 'Globex Industries',
    clientId: '2',
    totalAmount: 8500.00,
    status: 'draft',
    validUntil: '2023-12-15',
    createdAt: '2023-11-18',
    items: [
      { id: '2-1', description: 'Logo Design', quantity: 1, unitPrice: 3000, totalPrice: 3000 },
      { id: '2-2', description: 'Brand Guidelines', quantity: 1, unitPrice: 2500, totalPrice: 2500 },
      { id: '2-3', description: 'Business Cards & Stationery', quantity: 1, unitPrice: 1500, totalPrice: 1500 },
      { id: '2-4', description: 'Social Media Templates', quantity: 1, unitPrice: 1500, totalPrice: 1500 }
    ]
  },
  { 
    id: '3', 
    title: 'Digital Marketing Campaign', 
    client: 'Stark Enterprises',
    clientId: '3',
    totalAmount: 12000.00,
    status: 'accepted',
    validUntil: '2023-11-30',
    createdAt: '2023-11-01',
    items: [
      { id: '3-1', description: 'Strategy Development', quantity: 1, unitPrice: 3500, totalPrice: 3500 },
      { id: '3-2', description: 'Content Creation', quantity: 1, unitPrice: 4500, totalPrice: 4500 },
      { id: '3-3', description: 'Social Media Management (3 months)', quantity: 1, unitPrice: 4000, totalPrice: 4000 }
    ]
  },
  { 
    id: '4', 
    title: 'Mobile App Development', 
    client: 'Wayne Industries',
    clientId: '4',
    totalAmount: 24000.00,
    status: 'sent',
    validUntil: '2024-01-15',
    createdAt: '2023-11-20',
    items: [
      { id: '4-1', description: 'App UI/UX Design', quantity: 1, unitPrice: 7000, totalPrice: 7000 },
      { id: '4-2', description: 'iOS Development', quantity: 1, unitPrice: 8500, totalPrice: 8500 },
      { id: '4-3', description: 'Android Development', quantity: 1, unitPrice: 8500, totalPrice: 8500 }
    ]
  },
  { 
    id: '5', 
    title: 'Product Photography', 
    client: 'Umbrella Corp',
    clientId: '5',
    totalAmount: 3800.00,
    status: 'rejected',
    validUntil: '2023-12-10',
    createdAt: '2023-11-10',
    items: [
      { id: '5-1', description: 'Studio Setup', quantity: 1, unitPrice: 800, totalPrice: 800 },
      { id: '5-2', description: 'Product Photos (25 items)', quantity: 25, unitPrice: 100, totalPrice: 2500 },
      { id: '5-3', description: 'Photo Editing', quantity: 25, unitPrice: 20, totalPrice: 500 }
    ]
  },
]

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  
  const filteredQuotes = mockQuotes.filter(quote => 
    (quote.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     quote.client.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === '' || quote.status === statusFilter)
  )
  
  // Helper function to get status badge styling
  const getStatusBadgeStyle = (status: string) => {
    switch(status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quotes</h1>
          <p className="text-gray-500">Create and manage client quotes</p>
        </div>
        <Link 
          href="/quotes/new"
          className="mt-3 sm:mt-0 btn-primary inline-flex items-center"
        >
          <FiPlusCircle className="mr-2 h-5 w-5" />
          New Quote
        </Link>
      </div>
      
      {/* Quote Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="text-xl font-bold text-gray-900">{mockQuotes.length}</div>
          <div className="text-sm text-gray-500">Total Quotes</div>
        </div>
        <div className="card p-4">
          <div className="text-xl font-bold text-green-600">
            {mockQuotes.filter(q => q.status === 'accepted').length}
          </div>
          <div className="text-sm text-gray-500">Accepted</div>
        </div>
        <div className="card p-4">
          <div className="text-xl font-bold text-blue-600">
            {mockQuotes.filter(q => q.status === 'sent').length}
          </div>
          <div className="text-sm text-gray-500">Pending</div>
        </div>
        <div className="card p-4">
          <div className="text-xl font-bold text-gray-600">
            {mockQuotes.filter(q => q.status === 'draft').length}
          </div>
          <div className="text-sm text-gray-500">Drafts</div>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search quotes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10 w-full"
            />
          </div>
          <div>
            <select 
              className="form-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All statuses</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Quotes Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiFileText className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900">{quote.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{quote.client}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{quote.createdAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{quote.validUntil}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeStyle(quote.status)}`}>
                      {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    ${quote.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-gray-500 hover:text-gray-700" title="View">
                        <FiEye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-500 hover:text-blue-700" title="Edit">
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button className="text-green-500 hover:text-green-700" title="Download">
                        <FiDownload className="h-4 w-4" />
                      </button>
                      <button className="text-red-500 hover:text-red-700" title="Delete">
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 