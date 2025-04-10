  'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiPlusCircle, FiSearch, FiUser } from 'react-icons/fi'

// Mock data
const mockClients = [
  { id: '1', name: 'Acme Corporation', contactName: 'John Doe', email: 'john@acme.com', phone: '555-1234', projects: 3 },
  { id: '2', name: 'Globex Industries', contactName: 'Jane Smith', email: 'jane@globex.com', phone: '555-5678', projects: 5 },
  { id: '3', name: 'Stark Enterprises', contactName: 'Tony Stark', email: 'tony@stark.com', phone: '555-9012', projects: 2 },
  { id: '4', name: 'Wayne Industries', contactName: 'Bruce Wayne', email: 'bruce@wayne.com', phone: '555-3456', projects: 1 },
  { id: '5', name: 'Umbrella Corp', contactName: 'Alice Johnson', email: 'alice@umbrella.com', phone: '555-7890', projects: 4 },
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredClients = mockClients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-500">Manage your client relationships</p>
        </div>
        <Link 
          href="/clients/new"
          className="mt-3 sm:mt-0 btn-primary inline-flex items-center"
        >
          <FiPlusCircle className="mr-2 h-5 w-5" />
          Add Client
        </Link>
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
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10 w-full"
            />
          </div>
          <div>
            <select className="form-input">
              <option value="">All clients</option>
              <option value="active">With active projects</option>
              <option value="inactive">No active projects</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Client List */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projects
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <FiUser className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.contactName}</div>
                    <div className="text-sm text-gray-500">{client.email}</div>
                    <div className="text-sm text-gray-500">{client.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {client.projects} projects
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link
                      href={`/clients/${client.id}`}
                      className="text-primary-600 hover:text-primary-900 mr-3"
                    >
                      View
                    </Link>
                    <Link
                      href={`/clients/${client.id}/edit`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Edit
                    </Link>
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