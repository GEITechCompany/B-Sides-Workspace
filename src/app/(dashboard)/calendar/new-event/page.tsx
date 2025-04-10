'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiClock, FiCalendar, FiUser, FiTag, FiSave } from 'react-icons/fi'

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

// Mock user data
const mockUsers = [
  { id: 'user1', name: 'Alex Johnson', avatar: '/avatars/alex.jpg', role: 'Designer' },
  { id: 'user2', name: 'Sam Rodriguez', avatar: '/avatars/sam.jpg', role: 'Developer' },
  { id: 'user3', name: 'Taylor Kim', avatar: '/avatars/taylor.jpg', role: 'SEO Specialist' },
]

// Event types
const eventTypes = [
  { value: 'meeting', label: 'Meeting' },
  { value: 'call', label: 'Client Call' },
  { value: 'deadline', label: 'Deadline' },
  { value: 'reminder', label: 'Reminder' },
  { value: 'out-of-office', label: 'Out of Office' }
]

export default function NewEventPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Get current date and time
  const now = new Date()
  const currentDate = now.toISOString().split('T')[0]
  
  // Set default time values (round to nearest 30 minutes)
  const minutes = Math.ceil(now.getMinutes() / 30) * 30
  now.setMinutes(minutes)
  if (minutes === 60) {
    now.setMinutes(0)
    now.setHours(now.getHours() + 1)
  }
  const startTime = now.toTimeString().substring(0, 5)
  
  // Set default end time (1 hour later)
  const endTime = new Date(now.getTime() + 60 * 60 * 1000).toTimeString().substring(0, 5)
  
  const [formData, setFormData] = useState({
    title: '',
    eventType: 'meeting',
    date: currentDate,
    startTime: startTime,
    endTime: endTime,
    location: '',
    projectId: '',
    attendees: [] as string[],
    description: '',
    isAllDay: false,
    isRecurring: false,
    recurringPattern: 'weekly'
  })
  
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([])
  
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
    
    // Special handling for all-day events
    if (name === 'isAllDay' && (e.target as HTMLInputElement).checked) {
      setFormData(prev => ({
        ...prev,
        startTime: '00:00',
        endTime: '23:59'
      }))
    }
  }
  
  const handleAttendeeChange = (userId: string) => {
    if (selectedAttendees.includes(userId)) {
      setSelectedAttendees(prev => prev.filter(id => id !== userId))
    } else {
      setSelectedAttendees(prev => [...prev, userId])
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const eventData = {
      ...formData,
      attendees: selectedAttendees
    }
    
    // Simulate API call with a delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would make a POST request to create the event
      console.log('Event data:', eventData)
      
      // Redirect to calendar after successful creation
      router.push('/calendar')
    } catch (error) {
      console.error('Error creating event:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Event</h1>
          <p className="text-gray-500">Create a new calendar event or meeting</p>
        </div>
        <div className="flex space-x-3">
          <Link 
            href="/calendar"
            className="btn-outline inline-flex items-center"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Link>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Details */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Event Details</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Event Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. Client meeting, Project review, etc."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">
                  Event Type*
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  {eventTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Office, Zoom, Google Meet, etc."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                  Start Time*
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiClock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    disabled={formData.isAllDay}
                    className={`pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${formData.isAllDay ? 'bg-gray-100' : ''}`}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                  End Time*
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiClock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                    disabled={formData.isAllDay}
                    className={`pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${formData.isAllDay ? 'bg-gray-100' : ''}`}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  id="isAllDay"
                  name="isAllDay"
                  type="checkbox"
                  checked={formData.isAllDay}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="isAllDay" className="ml-2 block text-sm text-gray-700">
                  All-day event
                </label>
              </div>
              
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
                  Recurring event
                </label>
              </div>
            </div>
            
            {formData.isRecurring && (
              <div>
                <label htmlFor="recurringPattern" className="block text-sm font-medium text-gray-700">
                  Recurrence Pattern
                </label>
                <select
                  id="recurringPattern"
                  name="recurringPattern"
                  value={formData.recurringPattern}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            )}
          </div>
        </div>
        
        {/* Additional Details */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Details</h2>
          
          <div className="space-y-6">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attendees
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-md p-2">
                {mockUsers.map(user => (
                  <div key={user.id} className="flex items-center">
                    <input
                      id={`attendee-${user.id}`}
                      type="checkbox"
                      checked={selectedAttendees.includes(user.id)}
                      onChange={() => handleAttendeeChange(user.id)}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor={`attendee-${user.id}`} className="ml-3 flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-2">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.role}</p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Event details, agenda, notes, etc."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Link 
            href="/calendar"
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
                Creating Event...
              </>
            ) : (
              <>
                <FiSave className="mr-2 h-4 w-4" />
                Create Event
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
} 