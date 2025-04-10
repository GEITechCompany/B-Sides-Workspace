'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiEdit, FiMail, FiPhone, FiGlobe, FiMapPin, FiFileText, FiBarChart2 } from 'react-icons/fi'

// Include mock data relevant to the route, reusing the same data from clients/page.tsx
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

// Mock projects data
const mockProjects = [
  { id: '1', clientId: '1', name: 'Website Redesign', status: 'in-progress', startDate: '2023-09-15', endDate: '2023-12-15' },
  { id: '2', clientId: '1', name: 'SEO Optimization', status: 'completed', startDate: '2023-06-01', endDate: '2023-08-30' },
  { id: '3', clientId: '1', name: 'Email Campaign', status: 'planning', startDate: '2023-12-01', endDate: '2024-01-31' },
  { id: '4', clientId: '2', name: 'Brand Identity', status: 'in-progress', startDate: '2023-08-10', endDate: '2023-11-30' },
  { id: '5', clientId: '2', name: 'Social Media Management', status: 'in-progress', startDate: '2023-01-01', endDate: '2023-12-31' },
  { id: '6', clientId: '3', name: 'Mobile App Development', status: 'planning', startDate: '2023-11-01', endDate: '2024-04-30' },
  { id: '7', clientId: '4', name: 'Security Audit', status: 'in-progress', startDate: '2023-10-15', endDate: '2023-12-15' },
]

export default function ClientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  
  // Find the client with the matching ID
  const client = mockClients.find(client => client.id === id)
  
  // Find projects for this client
  const clientProjects = mockProjects.filter(project => project.clientId === id)
  
  // Handle case where the client doesn't exist
  if (!client) {
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
          <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
          <p className="text-gray-500">Client details and projects</p>
        </div>
        <div className="flex space-x-3">
          <Link 
            href="/clients"
            className="btn-outline inline-flex items-center"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
          <Link 
            href={`/clients/${id}/edit`}
            className="btn-primary inline-flex items-center"
          >
            <FiEdit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </div>
      </div>
      
      {/* Client Information */}
      <div className="card">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Client Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Primary Contact</h3>
            <p className="text-base font-medium text-gray-900 mt-1">{client.contactName}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <div className="flex items-center mt-1">
              <FiMail className="h-4 w-4 text-gray-400 mr-1" />
              <a href={`mailto:${client.email}`} className="text-base font-medium text-primary-600 hover:text-primary-800">
                {client.email}
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
            <div className="flex items-center mt-1">
              <FiPhone className="h-4 w-4 text-gray-400 mr-1" />
              <a href={`tel:${client.phone}`} className="text-base font-medium text-gray-900">
                {client.phone}
              </a>
            </div>
          </div>
          
          {client.website && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Website</h3>
              <div className="flex items-center mt-1">
                <FiGlobe className="h-4 w-4 text-gray-400 mr-1" />
                <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-base font-medium text-primary-600 hover:text-primary-800">
                  {client.website}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Address Information */}
      <div className="card">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Address</h2>
        
        <div className="flex items-start">
          <FiMapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
          <div>
            <p className="text-base text-gray-900">{client.address}</p>
            <p className="text-base text-gray-900">{client.city}, {client.state} {client.zip}</p>
            <p className="text-base text-gray-900">{client.country}</p>
          </div>
        </div>
      </div>
      
      {/* Projects */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Projects</h2>
          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {clientProjects.length} projects
          </span>
        </div>
        
        {clientProjects.length > 0 ? (
          <div className="space-y-3">
            {clientProjects.map(project => (
              <div key={project.id} className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <Link 
                    href={`/projects/${project.id}`}
                    className="text-base font-medium text-primary-600 hover:text-primary-800"
                  >
                    {project.name}
                  </Link>
                  <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full 
                    ${project.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'}`}
                  >
                    {project.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  {project.startDate} to {project.endDate}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No projects found for this client.</p>
        )}
        
        <div className="mt-4">
          <Link 
            href={`/projects/new?client=${id}`}
            className="btn-secondary inline-flex items-center text-sm"
          >
            <FiFileText className="mr-2 h-4 w-4" />
            Create New Project
          </Link>
        </div>
      </div>
      
      {/* Notes */}
      {client.notes && (
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Notes</h2>
          <p className="text-gray-700 whitespace-pre-line">{client.notes}</p>
        </div>
      )}
      
      {/* Analytics and Metrics - Placeholder for future feature */}
      <div className="card">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          <div className="flex items-center">
            <FiBarChart2 className="h-5 w-5 mr-2 text-gray-500" />
            Client Analytics
          </div>
        </h2>
        <p className="text-gray-500 italic">Analytics dashboard coming soon.</p>
      </div>
    </div>
  )
} 