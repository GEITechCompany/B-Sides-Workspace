'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to login page
    router.push('/login')
  }, [router])
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-600">B-Sides Platform</h1>
        <p className="mt-2 text-lg text-gray-600">Loading...</p>
      </div>
    </div>
  )
} 