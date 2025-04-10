'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiUser, FiLock, FiMail, FiBell, FiCreditCard, FiUsers, FiDatabase } from 'react-icons/fi'

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false)
  const [is2FAProcessing, setIs2FAProcessing] = useState(false)
  const [isNotificationSubmitting, setIsNotificationSubmitting] = useState(false)
  const [isTeamInviteProcessing, setIsTeamInviteProcessing] = useState(false)
  const [isConnectingService, setIsConnectingService] = useState<string | null>(null)
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    bio: 'Project manager with over 5 years of experience in web development and digital marketing projects.'
  })
  
  // Password data state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  // Whether 2FA is enabled
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    comments: true,
    tasks: true,
    projects: true,
    quotes: false
  })
  
  // Add these new state variables and handlers
  const [isEditingPayment, setIsEditingPayment] = useState(false)
  const [isPaymentSubmitting, setIsPaymentSubmitting] = useState(false)
  const [paymentData, setPaymentData] = useState({
    cardNumber: '•••• •••• •••• 4242',
    expiryMonth: '12',
    expiryYear: '2025',
    cvv: ''
  })
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [id]: value
    }))
  }
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [id]: value
    }))
  }
  
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Here you would typically make an API call to update the profile
      // For this mock implementation, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success message or redirect if needed
      setIsSubmitting(false)
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      setIsSubmitting(false)
    }
  }
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match')
      return
    }
    
    setIsPasswordSubmitting(true)
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reset form and show success
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setIsPasswordSubmitting(false)
      alert('Password updated successfully!')
    } catch (error) {
      console.error('Error updating password:', error)
      setIsPasswordSubmitting(false)
    }
  }
  
  const handle2FAToggle = async () => {
    setIs2FAProcessing(true)
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Toggle 2FA status
      setIs2FAEnabled(prev => !prev)
      setIs2FAProcessing(false)
      
      if (!is2FAEnabled) {
        alert('Two-factor authentication enabled!')
      } else {
        alert('Two-factor authentication disabled!')
      }
    } catch (error) {
      console.error('Error toggling 2FA:', error)
      setIs2FAProcessing(false)
    }
  }
  
  const handleAvatarChange = () => {
    setIsUploading(true)
    
    // Simulate file upload with delay
    setTimeout(() => {
      setIsUploading(false)
      alert('Avatar updated successfully!')
    }, 1500)
  }
  
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target
    setNotificationSettings(prev => ({
      ...prev,
      [id]: checked
    }))
  }
  
  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsNotificationSubmitting(true)
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsNotificationSubmitting(false)
      alert('Notification preferences saved!')
    } catch (error) {
      console.error('Error saving notification preferences:', error)
      setIsNotificationSubmitting(false)
    }
  }
  
  const handleInviteTeamMember = () => {
    setIsTeamInviteProcessing(true)
    
    // Simulate API call with delay
    setTimeout(() => {
      setIsTeamInviteProcessing(false)
      alert('Team invitation sent!')
    }, 1500)
  }
  
  const handleConnectService = (service: string) => {
    setIsConnectingService(service)
    
    // Simulate API call with delay
    setTimeout(() => {
      setIsConnectingService(null)
      alert(`${service} connected successfully!`)
    }, 1500)
  }
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setPaymentData(prev => ({
      ...prev,
      [id]: value
    }))
  }
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsPaymentSubmitting(true)
    
    // Simulate API call with delay
    setTimeout(() => {
      setIsPaymentSubmitting(false)
      setIsEditingPayment(false)
      alert('Payment method updated successfully!')
    }, 1500)
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <nav className="md:w-64 flex-none">
          <div className="card">
            <ul className="divide-y divide-gray-200">
              <li>
                <button
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'profile' ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <FiUser className="mr-3 h-5 w-5" />
                  Profile
                </button>
              </li>
              <li>
                <button
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'account' ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
                  onClick={() => setActiveTab('account')}
                >
                  <FiLock className="mr-3 h-5 w-5" />
                  Account Security
                </button>
              </li>
              <li>
                <button
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'notifications' ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <FiBell className="mr-3 h-5 w-5" />
                  Notifications
                </button>
              </li>
              <li>
                <button
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'billing' ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
                  onClick={() => setActiveTab('billing')}
                >
                  <FiCreditCard className="mr-3 h-5 w-5" />
                  Billing
                </button>
              </li>
              <li>
                <button
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'team' ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
                  onClick={() => setActiveTab('team')}
                >
                  <FiUsers className="mr-3 h-5 w-5" />
                  Team Members
                </button>
              </li>
              <li>
                <button
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'integrations' ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
                  onClick={() => setActiveTab('integrations')}
                >
                  <FiDatabase className="mr-3 h-5 w-5" />
                  Integrations
                </button>
              </li>
            </ul>
          </div>
        </nav>
        
        {/* Settings Content */}
        <div className="flex-1">
          <div className="card">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Profile Settings</h2>
                
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                      <FiUser className="h-12 w-12" />
                    </div>
                    <div className="ml-5">
                      <button 
                        type="button"
                        className="btn-secondary text-sm"
                        onClick={handleAvatarChange}
                        disabled={isUploading}
                      >
                        {isUploading ? 'Uploading...' : 'Change Avatar'}
                      </button>
                      <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. Max size 2MB</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        className="form-input w-full"
                        value={profileData.firstName}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        className="form-input w-full"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        className="form-input w-full"
                        value={profileData.email}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        className="form-input w-full"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        id="bio"
                        rows={4}
                        className="form-input w-full"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      type="submit" 
                      className="btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Account Security */}
            {activeTab === 'account' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Account Security</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900">Change Password</h3>
                    <p className="text-sm text-gray-500 mb-4">Ensure your account is using a long, random password to stay secure.</p>
                    
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input
                          type="password"
                          id="currentPassword"
                          className="form-input w-full"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          id="newPassword"
                          className="form-input w-full"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="form-input w-full"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <button 
                          type="submit" 
                          className="btn-primary"
                          disabled={isPasswordSubmitting}
                        >
                          {isPasswordSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Updating...
                            </>
                          ) : 'Update Password'}
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <hr />
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500 mb-4">Add additional security to your account using two-factor authentication.</p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Two-factor authentication is currently {is2FAEnabled ? 'enabled' : 'disabled'}.
                        </p>
                        <p className="text-sm text-gray-500">When two-factor authentication is enabled, you will be prompted for a secure, random token during authentication.</p>
                      </div>
                      <button 
                        type="button"
                        className="btn-secondary"
                        onClick={handle2FAToggle}
                        disabled={is2FAProcessing}
                      >
                        {is2FAProcessing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Notification Settings</h2>
                
                <form onSubmit={handleNotificationSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-3">Email Notifications</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="comments"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            checked={notificationSettings.comments}
                            onChange={handleNotificationChange}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="comments" className="font-medium text-gray-700">Comments</label>
                          <p className="text-gray-500">Get notified when someone comments on your projects.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="tasks"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            checked={notificationSettings.tasks}
                            onChange={handleNotificationChange}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="tasks" className="font-medium text-gray-700">Tasks</label>
                          <p className="text-gray-500">Get notified when a task is assigned to you or when a task you're assigned to is updated.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="projects"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            checked={notificationSettings.projects}
                            onChange={handleNotificationChange}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="projects" className="font-medium text-gray-700">Projects</label>
                          <p className="text-gray-500">Get notified when a project is updated or when a new document is added.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="quotes"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            checked={notificationSettings.quotes}
                            onChange={handleNotificationChange}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="quotes" className="font-medium text-gray-700">Quotes</label>
                          <p className="text-gray-500">Get notified when a quote is approved or rejected.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <hr />
                  
                  <div className="flex justify-end">
                    <button 
                      type="submit" 
                      className="btn-primary"
                      disabled={isNotificationSubmitting}
                    >
                      {isNotificationSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : 'Save Preferences'}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Billing Settings */}
            {activeTab === 'billing' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Billing & Subscription</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Pro Plan</p>
                        <p className="text-sm text-gray-500">$49.99 per month</p>
                      </div>
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      Your next billing date is December 15, 2023
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-3">Payment Method</h3>
                    
                    {isEditingPayment ? (
                      <form onSubmit={handlePaymentSubmit} className="space-y-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                              <input
                                type="text"
                                id="cardNumber"
                                className="form-input w-full"
                                placeholder="•••• •••• •••• ••••"
                                value={paymentData.cardNumber}
                                onChange={handlePaymentChange}
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="expiryMonth" className="block text-sm font-medium text-gray-700 mb-1">Expiry Month</label>
                                <select
                                  id="expiryMonth"
                                  className="form-input w-full"
                                  value={paymentData.expiryMonth}
                                  onChange={handlePaymentChange}
                                >
                                  {[...Array(12)].map((_, i) => (
                                    <option key={i+1} value={String(i+1).padStart(2, '0')}>
                                      {String(i+1).padStart(2, '0')}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              
                              <div>
                                <label htmlFor="expiryYear" className="block text-sm font-medium text-gray-700 mb-1">Expiry Year</label>
                                <select
                                  id="expiryYear"
                                  className="form-input w-full"
                                  value={paymentData.expiryYear}
                                  onChange={handlePaymentChange}
                                >
                                  {[...Array(10)].map((_, i) => {
                                    const year = new Date().getFullYear() + i;
                                    return (
                                      <option key={year} value={String(year)}>
                                        {year}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                              <input
                                type="text"
                                id="cvv"
                                className="form-input w-full"
                                placeholder="•••"
                                maxLength={4}
                                value={paymentData.cvv}
                                onChange={handlePaymentChange}
                              />
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end space-x-3">
                            <button 
                              type="button" 
                              className="btn-outline"
                              onClick={() => setIsEditingPayment(false)}
                            >
                              Cancel
                            </button>
                            <button 
                              type="submit" 
                              className="btn-primary"
                              disabled={isPaymentSubmitting}
                            >
                              {isPaymentSubmitting ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Saving...
                                </>
                              ) : 'Save Changes'}
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-blue-500 text-white p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M4 4a2 2 0 0 0-2 2v1h16V6a2 2 0 0 0-2-2H4z" />
                              <path fillRule="evenodd" d="M2 9h16v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9zm2 1v7h12v-7H4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
                            <p className="text-sm text-gray-500">Expires 12/2025</p>
                          </div>
                        </div>
                        <button 
                          className="text-sm text-blue-600 hover:text-blue-800"
                          onClick={() => setIsEditingPayment(true)}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <button 
                        className="btn-secondary text-sm"
                        onClick={() => {
                          setPaymentData({
                            cardNumber: '',
                            expiryMonth: String(new Date().getMonth() + 1).padStart(2, '0'),
                            expiryYear: String(new Date().getFullYear()),
                            cvv: ''
                          });
                          setIsEditingPayment(true);
                        }}
                      >
                        Add New Payment Method
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-3">Billing History</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Nov 15, 2023</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Pro Plan Subscription</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$49.99</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" className="text-blue-600 hover:text-blue-900">Download</a>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Oct 15, 2023</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Pro Plan Subscription</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$49.99</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" className="text-blue-600 hover:text-blue-900">Download</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Team Members */}
            {activeTab === 'team' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Team Members</h2>
                <p className="text-gray-500">Manage your team members and their access permissions.</p>
                
                {/* Team content would go here */}
                <div className="mt-4 flex justify-end">
                  <button 
                    className="btn-primary"
                    onClick={handleInviteTeamMember}
                    disabled={isTeamInviteProcessing}
                  >
                    {isTeamInviteProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Invite...
                      </>
                    ) : 'Invite Team Member'}
                  </button>
                </div>
              </div>
            )}
            
            {/* Integrations */}
            {activeTab === 'integrations' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Integrations</h2>
                <p className="text-gray-500">Connect your account with other services.</p>
                
                {/* Integrations content would go here */}
                <div className="mt-4 space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-500 text-white p-2 rounded-md">
                        <FiMail className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Google Workspace</p>
                        <p className="text-sm text-gray-500">Connect your Google account for seamless integration</p>
                      </div>
                    </div>
                    <button 
                      className="btn-secondary text-sm"
                      onClick={() => handleConnectService('Google Workspace')}
                      disabled={isConnectingService === 'Google Workspace'}
                    >
                      {isConnectingService === 'Google Workspace' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Connecting...
                        </>
                      ) : 'Connect'}
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-purple-500 text-white p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Slack</p>
                        <p className="text-sm text-gray-500">Connect Slack to get notifications</p>
                      </div>
                    </div>
                    <button 
                      className="btn-secondary text-sm"
                      onClick={() => handleConnectService('Slack')}
                      disabled={isConnectingService === 'Slack'}
                    >
                      {isConnectingService === 'Slack' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Connecting...
                        </>
                      ) : 'Connect'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 