"use client"

import { useState, useEffect } from 'react'
import Base from '../base'
import Link from 'next/link'
import { toast } from "@/components/ui/use-toast"

interface BlogPost {
  id: number;
  date: string;
  title: string;
  author: string;
  excerpt: string;
}

export default function Home() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const wait = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("https://cf588464.cloudfree.jp/blog/articles.php", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });
        const data: BlogPost[] = await response.json()
        setBlogPosts(data)
      } catch (error) {
        console.error('Failed to fetch blog posts:', error)
      } finally {
        await wait(30)
        setIsLoaded(true)
      }
    }

    fetchBlogPosts()
  }, [])


  useEffect(() => {
    const auth = async () => {
      try {
        const res = await fetch("https://cf588464.cloudfree.jp/blog/authcheck.php", {
          method: "GET",
          credentials: 'include',
        });
  
        if (res.status === 401) {
          toast({
            title: "期限切れ",
            description: "再度ログインしてください。",
            variant: "destructive",
          });
          await wait(1000);
          window.location.href = "/guest";
        }
      } catch (error) {
      }
    }
    auth()
  })

  return (
    <Base>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <Link
            href={`/article?id=${post.id}`}
            key={post.id}
            className={`block transform transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <article className="bg-card/80 backdrop-blur-md rounded-lg shadow-md overflow-hidden h-full hover:bg-muted hover:scale-95 hover:shadow-xl transition-all duration-300">
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">{post.date}</span>
                  <span className="text-sm text-gray-400">{post.author}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-100">{post.title}</h3>
                <p className="text-gray-300 text-sm flex-grow">{post.excerpt}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </Base>
  )
}
