/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */

'use client';
import { authService } from '@/services';
import { useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { ArrowRight, Code } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  

  return (
    <div className="flex flex-col items-center w-full overflow-hidden h-full">
      {/* Hero Section */}
      <motion.section
        className="w-full  bg-[var(--background)] relative overflow-hidden h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/[0.1] to-[var(--accent)]/[0.1] pointer-events-none" />
        <div className="container px-4 sm:px-6 relative z-10 max-w-full h-full  flex justify-center items-center">
          <motion.div
            className="flex flex-col items-center space-y-6 text-center "
            {...fadeIn}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter font-poppins bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
              Glotra – AI-Powered Translation
            </h1>
            <p className="mx-auto max-w-[600px] text-[var(--muted-foreground)] text-base sm:text-lg px-4">
              A modern, production-ready translation app that combines real-time multilingual translation, contextual dictionary lookup, and AI-generated example sentences — built with Next.js, OpenAI, and best practices for exceptional language learning UX.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4">
              <Link
                href="/translator"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--primary)] px-6 text-sm font-semibold text-[var(--primary-foreground)] shadow-lg hover:bg-[var(--primary)]/[0.9] transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/TuongLL/Glotra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] px-6 text-sm font-semibold text-[var(--foreground)] shadow-sm hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                View on GitHub
                <Code className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
}
