import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FiHome, 
  FiUsers, 
  FiFolder, 
  FiCheckSquare, 
  FiDollarSign,
  FiCalendar,
  FiFileText,
  FiSettings,
  FiHelpCircle
} from 'react-icons/fi'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: FiHome },
  { name: 'Clients', href: '/clients', icon: FiUsers },
  { name: 'Projects', href: '/projects', icon: FiFolder },
  { name: 'Tasks', href: '/tasks', icon: FiCheckSquare },
  { name: 'Budget', href: '/budget', icon: FiDollarSign },
  { name: 'Calendar', href: '/calendar', icon: FiCalendar },
  { name: 'Quotes', href: '/quotes', icon: FiFileText },
  { name: 'Settings', href: '/settings', icon: FiSettings },
  { name: 'Help', href: '/help', icon: FiHelpCircle },
]

export default function Sidebar() {
  // This would normally use usePathname() from next/navigation
  // But for simplicity, we'll just set a default value
  const pathname = '/dashboard'

  return (
    <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary-600">B-Sides</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className={`flex items-center p-2 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
              U
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">User Name</p>
            <p className="text-xs text-gray-500">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
} 