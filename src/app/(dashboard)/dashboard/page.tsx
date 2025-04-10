import { FiUsers, FiFolder, FiCheckSquare, FiDollarSign } from 'react-icons/fi'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome to your business platform!</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex items-center">
          <div className="rounded-full bg-blue-100 p-3">
            <FiUsers className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-sm font-medium text-gray-500">Clients</h2>
            <p className="text-2xl font-semibold text-gray-900">24</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="rounded-full bg-green-100 p-3">
            <FiFolder className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-sm font-medium text-gray-500">Projects</h2>
            <p className="text-2xl font-semibold text-gray-900">12</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="rounded-full bg-yellow-100 p-3">
            <FiCheckSquare className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-sm font-medium text-gray-500">Tasks</h2>
            <p className="text-2xl font-semibold text-gray-900">42</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="rounded-full bg-purple-100 p-3">
            <FiDollarSign className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-sm font-medium text-gray-500">Revenue</h2>
            <p className="text-2xl font-semibold text-gray-900">$24,500</p>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Projects</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div>
                  <h3 className="font-medium text-gray-900">Project {i}</h3>
                  <p className="text-sm text-gray-500">Client Name</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Tasks</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 mt-1"
                />
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">Task {i} title goes here</h3>
                  <p className="text-sm text-gray-500">Due in 2 days</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 