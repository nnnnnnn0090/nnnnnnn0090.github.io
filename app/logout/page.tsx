'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from "lucide-react"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(async () => {
      localStorage.setItem('X-Auth-Token', '');
      window.location.href = "/guest";
    }, 2000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">ログアウト中...</h1>
      <p className="text-gray-400">まもなくホームページにリダイレクトします</p>
    </div>
  )
}