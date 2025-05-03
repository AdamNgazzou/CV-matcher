"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Building, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export function FeaturedJobCard({ job }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardContent className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                {job.isNew && <Badge className="bg-teal-100 text-xs font-medium text-teal-800">New</Badge>}
              </div>
              <p className="mt-1 text-gray-600">{job.salary}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
              <Briefcase className="h-5 w-5 text-teal-600" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building className="h-4 w-4 text-gray-400" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>{job.posted}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 p-4">
          <Button
            asChild
            variant="ghost"
            className="w-full justify-between text-teal-700 hover:bg-teal-50 hover:text-teal-800"
          >
            <Link href={`/jobs/${job.id}`}>
              View Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
