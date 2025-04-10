'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  FiArrowLeft, 
  FiEdit, 
  FiClock, 
  FiCalendar, 
  FiUser, 
  FiTag, 
  FiBarChart2,
  FiMessageCircle,
  FiPaperclip,
  FiCheckCircle,
  FiPlus
} from 'react-icons/fi'

// Mock tasks data
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

// Mock user data
const mockUsers = [
  { id: 'user1', name: 'Alex Johnson', avatar: '/avatars/alex.jpg', role: 'Designer' },
  { id: 'user2', name: 'Sam Rodriguez', avatar: '/avatars/sam.jpg', role: 'Developer' },
  { id: 'user3', name: 'Taylor Kim', avatar: '/avatars/taylor.jpg', role: 'SEO Specialist' },
]

// Mock comments data
const mockComments = [
  { 
    id: 'comment1', 
    taskId: '1', 
    userId: 'user2', 
    text: 'I\'ve started working on the mobile responsive design. Will share mockups by tomorrow.',
    createdAt: '2023-10-01T10:30:00Z'
  },
  { 
    id: 'comment2', 
    taskId: '1', 
    userId: 'user1', 
    text: 'Looking forward to seeing the mockups. Make sure to follow the updated brand guidelines.',
    createdAt: '2023-10-01T14:15:00Z'
  },
  { 
    id: 'comment3', 
    taskId: '1', 
    userId: 'user2', 
    text: 'Just shared the mockups in the design folder. Let me know your thoughts!',
    createdAt: '2023-10-02T09:45:00Z'
  },
  { 
    id: 'comment4', 
    taskId: '5', 
    userId: 'user3', 
    text: 'I\'ve fixed the 3 critical vulnerabilities identified in the report. Moving on to the high priority ones now.',
    createdAt: '2023-10-20T13:20:00Z'
  }
]

// Task statuses with their labels and colors
const statuses = [
  { value: 'todo', label: 'To Do', color: 'bg-gray-100 text-gray-800' },
  { value: 'in-progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  { value: 'review', label: 'In Review', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  { value: 'blocked', label: 'Blocked', color: 'bg-red-100 text-red-800' }
]

// Priorities with their labels and colors
const priorities = [
  { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Medium', color: 'bg-blue-100 text-blue-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
]

export default function TaskDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  
  const [commentText, setCommentText] = useState('')
  const [taskComments, setTaskComments] = useState<any[]>([])
  
  // Find the task with the matching ID
  const task = mockTasks.find(task => task.id === id)
  
  // Find the assigned user
  const assignedUser = task ? mockUsers.find(user => user.id === task.assignedTo) : null
  
  // Get status and priority info
  const statusInfo = task ? statuses.find(s => s.value === task.status) : null
  const priorityInfo = task ? priorities.find(p => p.value === task.priority) : null
  
  // Load comments for this task
  useEffect(() => {
    if (task) {
      const comments = mockComments.filter(comment => comment.taskId === task.id)
      setTaskComments(comments)
    }
  }, [task])
  
  const handleAddComment = () => {
    if (!commentText.trim() || !task) return
    
    const newComment = {
      id: `comment${mockComments.length + 1}`,
      taskId: task.id,
      userId: 'user1', // Assuming the current user is user1
      text: commentText,
      createdAt: new Date().toISOString()
    }
    
    // In a real app, you would post this to an API
    setTaskComments(prev => [...prev, newComment])
    setCommentText('')
  }
  
  // Handle case where the task doesn't exist
  if (!task) {
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
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  // Format datetime for display
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusInfo?.color}`}>
              {statusInfo?.label}
            </span>
            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${priorityInfo?.color}`}>
              {priorityInfo?.label} Priority
            </span>
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <Link href={`/projects/${task.projectId}`} className="text-primary-600 hover:text-primary-800">
              {task.projectName}
            </Link>
            <span className="mx-2">•</span>
            <Link href={`/clients/${task.clientId}`} className="text-primary-600 hover:text-primary-800">
              {task.clientName}
            </Link>
          </div>
        </div>
        <div className="flex space-x-3">
          <Link 
            href="/tasks"
            className="btn-outline inline-flex items-center"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
          <Link 
            href={`/tasks/${id}/edit`}
            className="btn-primary inline-flex items-center"
          >
            <FiEdit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Task Description */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{task.description}</p>
          </div>
          
          {/* Task Comments */}
          <div className="card">
            <div className="flex items-center mb-4">
              <FiMessageCircle className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Comments & Activity</h2>
            </div>
            
            <div className="space-y-4 mb-4">
              {taskComments.length > 0 ? (
                taskComments.map(comment => {
                  const commentUser = mockUsers.find(user => user.id === comment.userId)
                  return (
                    <div key={comment.id} className="flex">
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                          {commentUser?.name.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">{commentUser?.name}</span>
                          <span className="ml-2 text-sm text-gray-500">{formatDateTime(comment.createdAt)}</span>
                        </div>
                        <p className="text-gray-700 mt-1">{comment.text}</p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-gray-500 italic">No comments yet.</p>
              )}
            </div>
            
            {/* Add Comment Form */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    {mockUsers[0].name.charAt(0)}
                  </div>
                </div>
                <div className="flex-grow">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    rows={3}
                  ></textarea>
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={handleAddComment}
                      disabled={!commentText.trim()}
                      className="btn-primary text-sm inline-flex items-center"
                    >
                      <FiMessageCircle className="mr-2 h-4 w-4" />
                      Add Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Task Attachments (Placeholder) */}
          <div className="card">
            <div className="flex items-center mb-4">
              <FiPaperclip className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Attachments</h2>
            </div>
            
            <p className="text-gray-500 italic">No attachments yet.</p>
            
            <button className="mt-4 btn-outline text-sm inline-flex items-center">
              <FiPlus className="mr-2 h-4 w-4" />
              Add Attachment
            </button>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Task Details */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Task Details</h2>
            
            <div className="space-y-4">
              {/* Assigned To */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Assigned To</h3>
                <div className="mt-1 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      {assignedUser?.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{assignedUser?.name}</p>
                    <p className="text-xs text-gray-500">{assignedUser?.role}</p>
                  </div>
                </div>
              </div>
              
              {/* Due Date */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
                <div className="mt-1 flex items-center">
                  <FiCalendar className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-900">{formatDate(task.dueDate)}</span>
                </div>
              </div>
              
              {/* Time Estimates */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Time</h3>
                <div className="mt-1 flex items-center">
                  <FiClock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-900">
                    {task.actualHours} / {task.estimatedHours} hours
                  </span>
                </div>
                {task.status !== 'completed' && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary-600 h-2.5 rounded-full" 
                        style={{ width: `${Math.min(100, (task.actualHours / task.estimatedHours) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Tags */}
              {task.tags && task.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Tags</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {task.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Created/Updated */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Created</h3>
                <div className="mt-1 text-sm text-gray-900">
                  {formatDate(task.createdAt)}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                <div className="mt-1 text-sm text-gray-900">
                  {formatDate(task.updatedAt)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Task Actions */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Actions</h2>
            
            <div className="space-y-3">
              <button className="w-full btn-secondary inline-flex items-center justify-center">
                <FiUser className="mr-2 h-4 w-4" />
                Reassign Task
              </button>
              
              {task.status !== 'completed' ? (
                <button className="w-full btn-success inline-flex items-center justify-center">
                  <FiCheckCircle className="mr-2 h-4 w-4" />
                  Mark as Completed
                </button>
              ) : (
                <button className="w-full btn-outline inline-flex items-center justify-center">
                  <FiCheckCircle className="mr-2 h-4 w-4" />
                  Reopen Task
                </button>
              )}
              
              <button className="w-full btn-danger-outline inline-flex items-center justify-center">
                Delete Task
              </button>
            </div>
          </div>
          
          {/* Task Analytics (Placeholder) */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              <div className="flex items-center">
                <FiBarChart2 className="h-5 w-5 mr-2 text-gray-500" />
                Task Analytics
              </div>
            </h2>
            <p className="text-gray-500 italic">Analytics dashboard coming soon.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 