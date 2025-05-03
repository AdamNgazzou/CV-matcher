"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Palette, Code, TrendingUp, Box, Headphones, DollarSign, Briefcase } from "lucide-react"
import Link from "next/link"

export function CategoryCard({ category }) {
  // Map category names to icons
  const getIcon = (iconName) => {
    switch (iconName) {
      case "palette":
        return <Palette className="h-6 w-6 text-teal-600" />
      case "code":
        return <Code className="h-6 w-6 text-blue-600" />
      case "trending-up":
        return <TrendingUp className="h-6 w-6 text-purple-600" />
      case "box":
        return <Box className="h-6 w-6 text-amber-600" />
      case "headphones":
        return <Headphones className="h-6 w-6 text-green-600" />
      case "dollar-sign":
        return <DollarSign className="h-6 w-6 text-red-600" />
      default:
        return <Briefcase className="h-6 w-6 text-gray-600" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Link href="/candidate" className="block h-full">
        <Card className="h-full cursor-pointer border-none shadow-md transition-all duration-300 hover:shadow-lg">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              {getIcon(category.icon)}
            </div>
            <h3 className="mb-1 text-lg font-bold text-gray-900">{category.name}</h3>
            <p className="text-sm text-gray-500">{category.count} jobs available</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
