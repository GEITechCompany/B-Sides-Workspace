'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiPlusCircle, FiCalendar, FiClock, FiUsers, FiFolder } from 'react-icons/fi'

// Mock data for calendar events
const mockEvents = [
  { 
    id: '1', 
    title: 'Project Kickoff Meeting', 
    description: 'Initial kickoff for Website Redesign project',
    project: 'Website Redesign',
    client: 'Acme Corporation',
    date: '2023-12-05',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    attendees: ['John Doe', 'Jane Smith', 'Alex Johnson']
  },
  { 
    id: '2', 
    title: 'Logo Review Session', 
    description: 'Review logo concepts with client',
    project: 'Brand Identity',
    client: 'Globex Industries',
    date: '2023-12-07',
    startTime: '2:00 PM',
    endTime: '3:00 PM',
    attendees: ['Jane Smith', 'Robert Brown', 'Emily White']
  },
  { 
    id: '3', 
    title: 'Content Strategy Workshop', 
    description: 'Workshop to plan content strategy for campaign',
    project: 'Marketing Campaign',
    client: 'Stark Enterprises',
    date: '2023-12-08',
    startTime: '11:00 AM',
    endTime: '2:00 PM',
    attendees: ['Alex Johnson', 'Sarah Miller', 'James Wilson']
  },
  { 
    id: '4', 
    title: 'UI Review', 
    description: 'Review UI designs for mobile app',
    project: 'Mobile App Development',
    client: 'Wayne Industries',
    date: '2023-12-10',
    startTime: '1:00 PM',
    endTime: '2:30 PM',
    attendees: ['Jane Smith', 'David Clark', 'Michael Brown']
  },
  { 
    id: '5', 
    title: 'Client Photoshoot', 
    description: 'Product photography session',
    project: 'Product Photoshoot',
    client: 'Umbrella Corp',
    date: '2023-12-12',
    startTime: '9:00 AM',
    endTime: '3:00 PM',
    attendees: ['Robert Brown', 'Emma Davis', 'Thomas Garcia']
  },
  { 
    id: '6', 
    title: 'Developer Standup', 
    description: 'Weekly development team standup',
    project: 'Website Redesign',
    client: 'Acme Corporation',
    date: '2023-12-14',
    startTime: '9:30 AM',
    endTime: '10:00 AM',
    attendees: ['Alex Johnson', 'David Clark', 'Michael Brown', 'James Wilson']
  },
]

// Simple array of days for the monthly calendar view
const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1)

// Function to generate week days
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function CalendarPage() {
  const [viewMode, setViewMode] = useState('month') // 'month', 'week', 'day'
  const [currentMonth, setCurrentMonth] = useState('December 2023')
  
  // Filter events for today's date (for Today's Events section)
  const todaysEvents = mockEvents.filter(event => event.date === '2023-12-05')
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-500">Manage your schedule and events</p>
        </div>
        <Link 
          href="/calendar/new-event"
          className="mt-3 sm:mt-0 btn-primary inline-flex items-center"
        >
          <FiPlusCircle className="mr-2 h-5 w-5" />
          New Event
        </Link>
      </div>
      
      {/* Calendar Controls */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button className="btn-outline">Today</button>
            <div className="flex space-x-2">
              <button className="p-2 rounded-md hover:bg-gray-100">
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-2 rounded-md hover:bg-gray-100">
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <h2 className="text-xl font-medium text-gray-900">{currentMonth}</h2>
          </div>
          
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 rounded-md ${viewMode === 'month' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setViewMode('month')}
            >
              Month
            </button>
            <button 
              className={`px-3 py-1 rounded-md ${viewMode === 'week' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setViewMode('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1 rounded-md ${viewMode === 'day' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setViewMode('day')}
            >
              Day
            </button>
          </div>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="card overflow-hidden">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {weekDays.map((day, index) => (
            <div key={index} className="py-2 text-center text-sm font-medium text-gray-500">
              {day.substring(0, 3)}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {/* Empty cells for days before the 1st of the month (assuming Dec 1 is a Friday) */}
          {Array.from({ length: 5 }, (_, i) => (
            <div key={`empty-${i}`} className="min-h-[120px] bg-gray-50 p-2"></div>
          ))}
          
          {/* Actual days of the month */}
          {daysInMonth.map((day) => {
            // Find events for this day
            const dayEvents = mockEvents.filter(event => {
              const eventDay = parseInt(event.date.split('-')[2])
              return eventDay === day
            })
            
            // Highlight today
            const isToday = day === 5 // Assuming today is the 5th
            
            return (
              <div 
                key={day} 
                className={`min-h-[120px] p-2 ${isToday ? 'bg-blue-50' : 'bg-white'}`}
              >
                <div className={`text-sm font-medium ${isToday ? 'text-blue-600 bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center' : 'text-gray-700'}`}>
                  {day}
                </div>
                {/* Events for this day */}
                <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
                  {dayEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="text-xs p-1 rounded truncate bg-primary-100 text-primary-800 cursor-pointer"
                      title={event.title}
                    >
                      {event.startTime} {event.title}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Today's Events */}
      <div className="card">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Today's Events</h2>
        {todaysEvents.length > 0 ? (
          <div className="space-y-4">
            {todaysEvents.map((event) => (
              <div key={event.id} className="border-l-4 border-primary-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {event.project}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FiClock className="mr-1 h-4 w-4" />
                    {event.startTime} - {event.endTime}
                  </div>
                  <div className="flex items-center">
                    <FiUsers className="mr-1 h-4 w-4" />
                    {event.attendees.length} attendees
                  </div>
                  <div className="flex items-center">
                    <FiFolder className="mr-1 h-4 w-4" />
                    {event.client}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No events scheduled for today.</p>
        )}
      </div>
      
      {/* Upcoming Events */}
      <div className="card">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          {mockEvents.slice(0, 3).map((event) => (
            <div key={event.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-gray-100 rounded-md p-2 flex flex-col items-center">
                <span className="text-xs font-medium text-gray-500">
                  {new Date(event.date).toLocaleString('default', { month: 'short' })}
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {event.date.split('-')[2]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{event.title}</h3>
                <p className="text-sm text-gray-500 truncate">{event.description}</p>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <FiClock className="mr-1 h-3 w-3" />
                  {event.startTime} - {event.endTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 