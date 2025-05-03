"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "border-b bg-white/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white">
            <Briefcase className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold">JobSearch</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              pathname === "/" ? "bg-teal-50 text-teal-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            )}
          >
            Home
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Find Jobs <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/candidate" className="cursor-pointer">
                  Browse All Jobs
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidate" className="cursor-pointer">
                  Job Categories
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/candidate" className="cursor-pointer">
                  Remote Jobs
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/employer"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              pathname === "/employer"
                ? "bg-teal-50 text-teal-700"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            )}
          >
            For Employers
          </Link>

          <Link
            href="/candidate"
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              pathname === "/candidate"
                ? "bg-teal-50 text-teal-700"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            )}
          >
            For Candidates
          </Link>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Button
            variant="ghost"
            className="rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Sign In
          </Button>
          <Button className="rounded-full bg-teal-600 text-white hover:bg-teal-700">Sign Up</Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="border-t bg-white px-4 py-4 shadow-lg">
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/"
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    pathname === "/"
                      ? "bg-teal-50 text-teal-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  Home
                </Link>
                <Link
                  href="/candidate"
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    pathname === "/candidate"
                      ? "bg-teal-50 text-teal-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  Find Jobs
                </Link>
                <Link
                  href="/employer"
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    pathname === "/employer"
                      ? "bg-teal-50 text-teal-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  For Employers
                </Link>
                <div className="pt-2">
                  <Button className="w-full rounded-lg bg-teal-600 text-white hover:bg-teal-700">Sign Up</Button>
                  <Button variant="outline" className="mt-2 w-full rounded-lg">
                    Sign In
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
