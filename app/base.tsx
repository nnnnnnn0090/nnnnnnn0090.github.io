"use client"

import { useState, useEffect } from 'react'
import { MenuIcon, XIcon, HomeIcon, LogOutIcon, GithubIcon, TwitterIcon } from 'lucide-react'
import Link from 'next/link'
import Image from "next/image"
import nextConfig from "../next.config.mjs"
import { ModeToggle } from "@/app/dark-toggle";

const BASE_PATH = nextConfig.basePath || ""

export default function Base({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const load = async () => {
      await new Promise(resolve => setTimeout(resolve, 10))
      setIsLoaded(true)
    }
    load()
  }, [])

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-card/80 backdrop-blur-md shadow-lg transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Image
              className="relative dark:invert"
              src={`${BASE_PATH}/logo.png`}
              alt="Logo"
              width={180}
              height={40}
              quality={100}
              priority
            />
          </Link>
          <div className={`h-6 w-6 absolute top-2 right-24 z-50`}>
            <ModeToggle />
          </div>
          <button
            className="md:flex transition-transform duration-300 ease-in-out"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <MenuIcon className={`h-6 w-6 text-gray-600 dark:text-gray-300 transition-colors duration-200 ${isMenuOpen ? 'text-gray-900 dark:text-gray-100' : ''} transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`} />
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out md:flex ${isMenuOpen ? 'opacity-50 z-50' : 'opacity-0 -z-10'}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-card/80 backdrop-blur-md z-50 shadow-lg border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              className="mb-4"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <XIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Menu</h2>
          </div>
          <nav className="flex-grow py-4">
            {[
              { name: 'Home', icon: HomeIcon, href: '/' },
              { name: 'Logout', icon: LogOutIcon, href: '/logout' },
            ].map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <div>{item.name}</div>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-center space-x-4">
              <a href="https://github.com/nnnnnnn0090" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GithubIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200" />
              </a>
              <a href="https://x.com/nnnnnnn0090" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <TwitterIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pt-20">
        {children}
      </main>
    </main>
  )
}
