"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Briefcase,
  Download,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Search,
  Filter,
  SlidersHorizontal,
  Eye,
  MessageSquare,
  X,
  ChevronDown,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useJobStore } from "@/lib/store"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function JobCandidatesPage() {
  const params = useParams()
  const router = useRouter()
  const { postedJobs, getJobApplicants } = useJobStore()
  const jobId = params.jobId as string

  const job = postedJobs.find((j) => j.id === jobId)
  const applicants = getJobApplicants(jobId)

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  // Filter and sort applicants
  const filteredApplicants = applicants
    .filter((applicant) => {
      // Search filter
      const matchesSearch =
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.message.toLowerCase().includes(searchTerm.toLowerCase())

      // Status filter
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "reviewed" && applicant.status === "reviewed") ||
        (statusFilter === "pending" && applicant.status === "pending")

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      // Sort by selected criteria
      if (sortBy === "rating") {
        return b.cvRating - a.cvRating
      } else if (sortBy === "date") {
        return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      }
      return 0
    })

  // If job not found
  if (!job) {
    return (
      <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
        <Briefcase className="h-16 w-16 text-slate-300" />
        <h1 className="mt-6 text-2xl font-bold text-slate-900">Job Not Found</h1>
        <p className="mt-2 text-slate-500">The job you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="mt-6 rounded-lg bg-teal-600 text-white hover:bg-teal-700">
          <Link href="/employer">Back to Dashboard</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-20 pt-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back button and header */}
        <div className="mb-8">
          <Link
            href="/employer"
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:bg-teal-50 hover:text-teal-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{job.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Badge className="bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-800">
                  {applicants.length} Applicant{applicants.length !== 1 ? "s" : ""}
                </Badge>
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Calendar className="h-3.5 w-3.5" />
                  Posted {job.posted}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="h-10 gap-2 rounded-lg border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">View Job</span>
              </Button>
              <Button asChild className="h-10 gap-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700">
                <Link href="/employer/post-job">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit Job</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Search and filters */}
        <div className="mb-8 rounded-xl bg-white p-5 shadow-md">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 gap-2 rounded-lg border-slate-200 text-slate-700 hover:bg-slate-100"
                  >
                    <Filter className="h-4 w-4" />
                    <span>
                      Status: {statusFilter === "all" ? "All" : statusFilter === "reviewed" ? "Reviewed" : "Pending"}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px]">
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("reviewed")}>Reviewed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 gap-2 rounded-lg border-slate-200 text-slate-700 hover:bg-slate-100"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Sort: {sortBy === "rating" ? "Rating" : sortBy === "date" ? "Date" : "Name"}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px]">
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>Rating</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("date")}>Date Applied</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("name")}>Name</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Candidates list */}
        <div className="space-y-6">
          {filteredApplicants.length > 0 ? (
            filteredApplicants.map((applicant, index) => (
              <motion.div
                key={applicant.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden border-none bg-white shadow-md transition-all hover:shadow-lg">
                  <CardContent className="p-0">
                    {/* Candidate header */}
                    <div className="flex flex-col border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="mb-4 flex items-center gap-4 sm:mb-0">
                        <Avatar className="h-12 w-12 border-2 border-white bg-teal-100 shadow-sm">
                          <AvatarFallback className="bg-teal-100 text-teal-600">
                            {applicant.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-slate-900">{applicant.name}</h3>
                            {applicant.status === "reviewed" ? (
                              <Badge className="bg-teal-100 text-teal-700">Reviewed</Badge>
                            ) : (
                              <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
                            )}
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              Applied {applicant.appliedDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="h-3.5 w-3.5" />
                              {applicant.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3.5 w-3.5" />
                              {applicant.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-9 gap-1.5 rounded-lg border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Download className="h-4 w-4" />
                          <span>CV</span>
                        </Button>
                      </div>
                    </div>

                    {/* Candidate content */}
                    <div className="p-5">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="mb-2 text-sm font-medium text-slate-700">Cover Message</h4>
                          <p className="text-sm text-slate-600">{applicant.message}</p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="mb-2 text-sm font-medium text-slate-700">Skills Match</h4>
                            <div className="flex items-center gap-3">
                              <Progress value={applicant.skillsMatch} className="h-2 flex-1" />
                              <span className="text-xs font-medium text-slate-700">{applicant.skillsMatch}%</span>
                            </div>
                          </div>

                          <div>
                            <h4 className="mb-2 text-sm font-medium text-slate-700">Skills</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {applicant.skills.map((skill, i) => (
                                <Badge
                                  key={i}
                                  variant="outline"
                                  className="rounded-full border-slate-200 bg-slate-50 text-xs font-normal text-slate-700"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-5 flex justify-end gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-9 gap-1.5 rounded-lg border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                        >
                          <X className="h-4 w-4" />
                          <span>Reject</span>
                        </Button>
                        <Button size="sm" className="h-9 gap-1.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700">
                          <MessageSquare className="h-4 w-4" />
                          <span>Contact Candidate</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-slate-700">No matching candidates</h3>
              <p className="mt-2 text-sm text-slate-500">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters to see more results."
                  : "There are no applicants for this job yet."}
              </p>
              {(searchTerm || statusFilter !== "all") && (
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("all")
                  }}
                  className="mt-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
