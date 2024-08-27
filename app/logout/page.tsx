'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await fetch("https://cf588464.cloudfree.jp/blog/logout.php", {
          method: "GET",
          credentials: 'include',
        });
  
        if (res.status === 200) {
          window.location.href = "/guest";
        }
      } catch (error) {
      }
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