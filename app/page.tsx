"use client";

import Image from "next/image";
import Link from 'next/link';
import { ModeToggle } from "@/app/dark-toggle"

import nextConfig from "../next.config.mjs";
const BASE_PATH = nextConfig.basePath || "";

export default function Home() {
  return (
    <main className="flex h-[calc(100dvh)] flex-col items-center justify-center p-24">
      <div className="relative z-[-1] flex items-center justify-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-40 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffffff] dark:invert"
          src={`${BASE_PATH}/logo.png`}
          alt="nnnnnn0090"
          width={380}
          height={40}
          quality={100}
          priority
        />
      </div>

      <div className="mt-8 flex space-x-4 dark:drop-shadow-[0_0_0.3rem_#ffffffff]">
        <Link href="https://github.com/nnnnnnn0090" passHref>
          <p className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
            GitHub
          </p>
        </Link>
        <Link href="https://x.com/nnnnnnn0090" passHref>
          <p className="text-gray-800 dark:text-gray-200 hover:text-blue-400 dark:hover:text-blue-300">
            Twitter
          </p>
        </Link>
        <Link href="https://zenn.dev/nnnnnnn0090" passHref>
          <p className="text-gray-800 dark:text-gray-200 hover:text-blue-400 dark:hover:text-blue-300">
            Zenn
          </p>
        </Link>
      </div>

      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
    </main>
  );
}
