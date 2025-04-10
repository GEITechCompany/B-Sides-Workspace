'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiPlusCircle, FiSearch, FiCalendar, FiFolder, FiClock } from 'react-icons/fi'

// Mock data
const mockTasks = [
  { 
    id: '1', 
    title: 'Design Homepage Wireframes', 
    description: 'Create wireframes for the new homepage layout',
    project: { id: '1', name: 'Website Redesign' },
    status: 'in-progress', 
    priority: 'high',
    dueDate: '2023-12-10',
    assignedTo: 'Jane Smith'
  },
  { 
    id: '2', 
    title: 'Develop Logo Concepts', 
    description: 'Create 3-5 logo concepts based on client brief',
    project: { id: '2', name: 'Brand Identity' },
    status: 'todo', 
    priority: 'medium',
    dueDate: '2023-12-15',
    assignedTo: 'John Doe'
  },
  { 
    id: '3', 
    title: 'Content Strategy Document', 
    description: 'Develop content strategy document for social media campaign',
    project: { id: '3', name: 'Marketing Campaign' },
    status: 'completed', 
    priority: 'medium',
    dueDate: '2023-11-28',
    assignedTo: 'Alice Johnson'
  },
  { 
    id: '4', 
    title: 'UI Design for Mobile App', 
    description: 'Design user interface for the mobile application',
    project: { id: '4', name: 'Mobile App Development' },
    status: 'in-progress', 
    priority: 'high',
    dueDate: '2023-12-20',
    assignedTo: 'Jane Smith'
  },
  { 
    id: '5', 
    title: 'Product Photography Setup', 
    description: 'Set up lighting and backdrops for product photoshoot',
    project: { id: '5', name: 'Product Photoshoot' },
    status: 'on-hold', 
    priority: 'low',
    dueDate: '2023-12-05',
    assignedTo: 'John Doe'
  },
  { 
    id: '6', 
    title: 'Frontend Development', 
    description: 'Implement the frontend based on approved designs',
    project: { id: '1', name: 'Website Redesign' },
    status: 'todo', 
    priority: 'high',
    dueDate: '2023-12-25',
    assignedTo: 'Alice Johnson'
  },
]

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  
  const filteredTasks = mockTasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === '' || task.status === statusFilter) &&
    (priorityFilter === '' || task.priority === priorityFilter)
  )

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'on-hold':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-500">Manage and track tasks across projects</p>
        </div>
        <Link 
          href="/tasks/new"
          className="mt-3 sm:mt-0 btn-primary inline-flex items-center"
        >
          <FiPlusCircle className="mr-2 h-5 w-5" />
          New Task
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
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10 w-full"
            />
          </div>
          <div className="flex gap-2">
            <select 
              className="form-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All statuses</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
            <select 
              className="form-input"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">All priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Task List */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    <div className="text-sm text-gray-500">{task.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/projects/${task.project.id}`} className="text-primary-600 hover:text-primary-900">
                      {task.project.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(task.status)}`}>
                      {task.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityClass(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiCalendar className="mr-1" />
                      {task.dueDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link
                      href={`/tasks/${task.id}`}
                      className="text-primary-600 hover:text-primary-900 mr-3"
                    >
                      View
                    </Link>
                    <Link
                      href={`/tasks/${task.id}/edit`}
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