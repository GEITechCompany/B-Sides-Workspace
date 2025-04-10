'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiPlusCircle, FiSearch, FiFolder, FiClock, FiUsers } from 'react-icons/fi'

// Mock data
const mockProjects = [
  { 
    id: '1', 
    name: 'Website Redesign', 
    client: 'Acme Corporation', 
    status: 'active', 
    progress: 65, 
    dueDate: '2023-12-15',
    tasks: 12,
    tasksCompleted: 8
  },
  { 
    id: '2', 
    name: 'Brand Identity', 
    client: 'Globex Industries', 
    status: 'planning', 
    progress: 20, 
    dueDate: '2024-01-10',
    tasks: 8,
    tasksCompleted: 2
  },
  { 
    id: '3', 
    name: 'Marketing Campaign', 
    client: 'Stark Enterprises', 
    status: 'completed', 
    progress: 100, 
    dueDate: '2023-11-30',
    tasks: 15,
    tasksCompleted: 15
  },
  { 
    id: '4', 
    name: 'Mobile App Development', 
    client: 'Wayne Industries', 
    status: 'active', 
    progress: 40, 
    dueDate: '2024-02-28',
    tasks: 24,
    tasksCompleted: 10
  },
  { 
    id: '5', 
    name: 'Product Photoshoot', 
    client: 'Umbrella Corp', 
    status: 'on-hold', 
    progress: 30, 
    dueDate: '2023-12-20',
    tasks: 6,
    tasksCompleted: 2
  },
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  
  const filteredProjects = mockProjects.filter(project => 
    (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === '' || project.status === statusFilter)
  )

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500">Manage and track all your projects</p>
        </div>
        <Link 
          href="/projects/new"
          className="mt-3 sm:mt-0 btn-primary inline-flex items-center"
        >
          <FiPlusCircle className="mr-2 h-5 w-5" />
          New Project
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
              placeholder="Search projects..."
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
              <option value="active">Active</option>
              <option value="planning">Planning</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Link 
            href={`/projects/${project.id}`} 
            key={project.id}
            className="card hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="rounded-full bg-gray-200 p-3">
                <FiFolder className="h-6 w-6 text-gray-700" />
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(project.status)}`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mt-4">{project.name}</h3>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <FiUsers className="mr-1" />
              {project.client}
            </p>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between mt-4 text-sm">
              <div className="flex items-center">
                <span className="text-gray-500">
                  {project.tasksCompleted}/{project.tasks} tasks
                </span>
              </div>
              <div className="flex items-center text-gray-500">
                <FiClock className="mr-1" />
                <span>Due {project.dueDate}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 