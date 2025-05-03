"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Briefcase, Users, Eye, Search } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useJobStore } from "@/lib/store"

export default function EmployerPage() {
  const { postedJobs } = useJobStore()
  const [searchTerm, setSearchTerm] = useState("")

  // Filter jobs based on search term
  const filteredJobs = postedJobs.filter((job) => {
    return job.title.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20 pt-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Employer Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your job listings and track applicant progress</p>
        </div>

        {/* Stats overview */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none bg-white shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                <Briefcase className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                <h3 className="text-2xl font-bold text-gray-900">{postedJobs.length}</h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-white shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Applicants</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {postedJobs.reduce((total, job) => total + (job.applicantCount || 0), 0)}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Post job CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 shadow-lg"
        >
          <div className="relative px-6 py-8 md:px-8">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

            <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="max-w-md space-y-2 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white">Ready to find your next team member?</h2>
                <p className="text-teal-50">
                  Post a new job listing and connect with qualified candidates in your field.
                </p>
              </div>
              <Button asChild size="lg" className="h-12 rounded-lg bg-white px-6 text-teal-600 hover:bg-teal-50">
                <Link href="/employer/post-job">
                  <Plus className="mr-2 h-5 w-5" /> Post a New Job
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Job listings */}
        <Card className="overflow-hidden border-none bg-white shadow-lg">
          <CardHeader className="border-b bg-white px-6 py-5">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <CardTitle className="text-xl font-bold">Your Job Listings</CardTitle>
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">{renderJobList(filteredJobs)}</CardContent>
        </Card>
      </div>
    </div>
  )

  function renderJobList(jobs) {
    if (jobs.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <Briefcase className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-slate-700">No jobs found</h3>
          <p className="mt-2 text-sm text-slate-500">
            {searchTerm
              ? "Try adjusting your search to find what you're looking for."
              : "Get started by posting your first job listing to find qualified candidates."}
          </p>
          {!searchTerm && postedJobs.length === 0 && (
            <Button asChild className="mt-6 rounded-lg bg-teal-600 text-white hover:bg-teal-700">
              <Link href="/employer/post-job">
                <Plus className="mr-2 h-4 w-4" /> Post a Job
              </Link>
            </Button>
          )}
        </div>
      )
    }

    return (
      <div className="divide-y">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative"
          >
            <div className="flex flex-col p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                    <Briefcase className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{job.title}</h3>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-800">
                  <Users className="mr-1 h-3 w-3" />
                  {job.applicantCount} Applicant{job.applicantCount !== 1 ? "s" : ""}
                </Badge>

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-9 gap-1 rounded-lg border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                >
                  <Link href={`/employer/jobs/${job.id}`}>
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">View Candidates</span>
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }
}
