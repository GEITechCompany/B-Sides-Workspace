'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiPlusCircle, FiSearch, FiDollarSign, FiTrendingUp, FiTrendingDown, FiBarChart2 } from 'react-icons/fi'

// Mock data
const mockExpenses = [
  { id: '1', description: 'Software Subscriptions', project: 'Website Redesign', amount: 1250.00, date: '2023-11-15', category: 'Software' },
  { id: '2', description: 'Design Assets', project: 'Brand Identity', amount: 750.00, date: '2023-11-18', category: 'Design' },
  { id: '3', description: 'Marketing Services', project: 'Marketing Campaign', amount: 3500.00, date: '2023-11-22', category: 'Marketing' },
  { id: '4', description: 'Development Tools', project: 'Mobile App Development', amount: 1875.00, date: '2023-11-25', category: 'Software' },
  { id: '5', description: 'Photography Equipment', project: 'Product Photoshoot', amount: 2200.00, date: '2023-11-28', category: 'Equipment' },
]

const mockBudgets = [
  { id: '1', project: 'Website Redesign', allocated: 15000, spent: 9750, remaining: 5250 },
  { id: '2', project: 'Brand Identity', allocated: 8000, spent: 5200, remaining: 2800 },
  { id: '3', project: 'Marketing Campaign', allocated: 12000, spent: 10500, remaining: 1500 },
  { id: '4', project: 'Mobile App Development', allocated: 25000, spent: 12250, remaining: 12750 },
  { id: '5', project: 'Product Photoshoot', allocated: 5000, spent: 3800, remaining: 1200 },
]

export default function BudgetPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredExpenses = mockExpenses.filter(expense => 
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.project.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  // Calculate totals
  const totalBudget = mockBudgets.reduce((sum, budget) => sum + budget.allocated, 0)
  const totalSpent = mockBudgets.reduce((sum, budget) => sum + budget.spent, 0)
  const totalRemaining = mockBudgets.reduce((sum, budget) => sum + budget.remaining, 0)
  const spentPercentage = Math.round((totalSpent / totalBudget) * 100)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget</h1>
          <p className="text-gray-500">Track expenses and manage project budgets</p>
        </div>
        <Link 
          href="/budget/new-expense"
          className="mt-3 sm:mt-0 btn-primary inline-flex items-center"
        >
          <FiPlusCircle className="mr-2 h-5 w-5" />
          Add Expense
        </Link>
      </div>
      
      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card flex items-center">
          <div className="rounded-full bg-blue-100 p-3">
            <FiDollarSign className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-sm font-medium text-gray-500">Total Budget</h2>
            <p className="text-2xl font-semibold text-gray-900">${totalBudget.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="rounded-full bg-green-100 p-3">
            <FiTrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-sm font-medium text-gray-500">Total Spent</h2>
            <p className="text-2xl font-semibold text-gray-900">${totalSpent.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="card flex items-center">
          <div className="rounded-full bg-purple-100 p-3">
            <FiTrendingDown className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-sm font-medium text-gray-500">Remaining</h2>
            <p className="text-2xl font-semibold text-gray-900">${totalRemaining.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      {/* Budget Progress */}
      <div className="card">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Budget Utilization</h2>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className={`h-4 rounded-full ${spentPercentage > 90 ? 'bg-red-500' : spentPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ width: `${spentPercentage}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          {spentPercentage}% of total budget used
        </div>
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
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10 w-full"
            />
          </div>
          <div>
            <select className="form-input">
              <option value="">All projects</option>
              <option value="website">Website Redesign</option>
              <option value="brand">Brand Identity</option>
              <option value="marketing">Marketing Campaign</option>
              <option value="mobile">Mobile App Development</option>
              <option value="photo">Product Photoshoot</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Expenses Table */}
      <div className="card overflow-hidden">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Expenses</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.project}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">${expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Project Budgets */}
      <div className="card">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Project Budgets</h2>
        <div className="space-y-4">
          {mockBudgets.map((budget) => {
            const percentage = Math.round((budget.spent / budget.allocated) * 100)
            return (
              <div key={budget.id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">{budget.project}</span>
                  <span className="text-sm text-gray-500">${budget.spent.toLocaleString()} / ${budget.allocated.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 