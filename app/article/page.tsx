'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import Base from '../base'
import { GithubIcon, TwitterIcon } from 'lucide-react'
import MarkdownRenderer from '../../components/markdown'
import { toast } from "@/components/ui/use-toast"
import { PuffLoader } from 'react-spinners'

interface BlogPost {
  id: number
  date: string
  title: string
  author: string
  content: string;
  excerpt: string;
}

const LoadingAnimation = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('class');
    setTheme(currentTheme || 'light');
  }, []);

  const loaderColor = theme === 'dark' ? '#fff' : '#000';

  return (
    <main className="flex flex-col h-[calc(100dvh)] text-gray-100 bg-background dark:bg-black dark:text-gray-200 relative overflow-hidden">
      <div className="flex justify-center items-center h-[calc(100dvh)]">
        <PuffLoader color={loaderColor} size={50} />
      </div>
    </main>
  );
};

const fetchFromApi = async (url: string, token: string | null) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        'X-Auth-Token': token ?? '',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

const UpdatePrompt = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const wait = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  useEffect(() => {
    const authToken = localStorage.getItem('X-Auth-Token');

    const fetchPost = async () => {
      setLoading(true)
      try {
        const data: BlogPost[] = await fetchFromApi("https://cf588464.cloudfree.jp/blog/articles.php", authToken);
        const article = data.find(post => post.id === parseInt(id || ''))
        setPost(article || null)
      } catch (err) {
        console.error('Failed to load the blog post:', err)
        setError('Failed to load the blog post')
      } finally {
        await wait(30);
        setLoading(false)
      }
    };

    fetchPost();
  }, []);


  useEffect(() => {
    const auth = async () => {
      try {
        const authToken = localStorage.getItem('X-Auth-Token');
        const res = await fetch("https://cf588464.cloudfree.jp/blog/authcheck.php", {
          method: "GET",
          headers: { 'X-Auth-Token': authToken ?? '' },
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
        console.error('Authentication check failed:', error)
      }
    }

    auth()
  }, [])

  if (loading) {
    return <LoadingAnimation />
  }

  if (error) {
    return <p className="text-center text-red-500 font-bold text-xl">{error}</p>
  }

  if (!post) {
    return <p className="text-center text-yellow-500 font-bold text-xl">Post not found</p>
  }

  return (
    <Base>
      <main className="container mx-auto px-4">
        <article className="bg-card/80 backdrop-blur-md rounded-lg shadow-md overflow-hidden mb-12">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">{post.date}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{post.author}</span>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{post.title}</h1>
            <div className="text-gray-800 dark:text-gray-300">
              <MarkdownRenderer>{post.content}</MarkdownRenderer>
            </div>
          </div>
        </article>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md shadow-lg p-4">
        <div className="flex justify-center space-x-4">
          <a href="https://github.com/nnnnnnn0090" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GithubIcon className="h-6 w-6 text-gray-400 hover:text-gray-100 transition-colors duration-200" />
          </a>
          <a href="https://x.com/nnnnnnn0090" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <TwitterIcon className="h-6 w-6 text-gray-400 hover:text-gray-100 transition-colors duration-200" />
          </a>
        </div>
      </footer>
    </Base>
  )
}

const Page = () => {
  return (
    <Suspense fallback={<LoadingAnimation />}>
      <UpdatePrompt />
    </Suspense>
  )
}

export default Page
