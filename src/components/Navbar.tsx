'use client';
import { SignInButton, SignOutButton, useAuth, useUser } from '@clerk/nextjs';
import { Github, Menu, X, History } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import ThemeToggle from './ThemeToggle';
import { authService } from '@/services';
import { useHistorySidebarStore } from '@/app/stores';

export default function MainNavbar() {
  const toggle = useHistorySidebarStore((state) => state.toggle);

  const [synced, setSynced] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser()


  useEffect(() => {
    const syncUser = async () => {
      try {
        const data = await authService.login()
        if (data.user) {
          setSynced(true);
        } 
      } catch (err) {
        console.error('❌ Sync error:', err);
      }
    };

    if (isSignedIn && !synced) {
      syncUser();
    }
  }, [isSignedIn, synced]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--background)]/[0.85] backdrop-blur-lg border-b border-[var(--border)] shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 max-w-full">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl sm:text-2xl font-bold font-poppins bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
            Glotra
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {isSignedIn ? (
            <History className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200"
              onClick={toggle}
            />
          ) : <></>}
          <Link
            href="https://github.com/TuongLL/Glotra"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200"
          >
            <Github className="h-5 w-5" />
          </Link>
          {isSignedIn ? (
            <>
              <span className="text-sm font-medium text-[var(--foreground)]">
                {user?.firstName || user?.emailAddresses[0].emailAddress}
              </span>
              <SignOutButton>
                <button className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200">
                  Sign Out
                </button>
              </SignOutButton>
            </>
          ) : (
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200">
                Sign In
              </button>
            </SignInButton>
          )}
          <ThemeToggle />
        </nav>

        <button
          type="button"
          className="md:hidden text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200"
          onClick={handleToggle}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-16 z-50 bg-[var(--background)] border-b border-[var(--border)] shadow-lg md:hidden animate-in slide-in-from-top duration-300 max-w-full">
            <div className="container py-6 flex flex-col space-y-4 px-4 sm:px-6 max-w-full">

              <div className="flex items-center justify-between">
                <Link
                  href="https://github.com/AnwarHossainSR/nextjs-15-template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200"
                  onClick={handleToggle}
                >
                  <Github className="h-5 w-5" />
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
