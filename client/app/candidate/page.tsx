"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, MapPin, Building, Upload, Clock, Search, Filter, ArrowRight, Check } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useJobStore } from "@/lib/store"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { fetchJobs } from "@/services/fetch_jobs"

export default function CandidatePage() {
  const { jobs } = useJobStore()
  const [filteredJobs, setFilteredJobs] = useState(jobs)
  const [selectedJob, setSelectedJob] = useState(null)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [fileName, setFileName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [skillFilter, setSkillFilter] = useState("")
  const [toolsFilter, setToolsFilter] = useState("")

  const [jobs2, setJobs2] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filteredJobs2, setFilteredJobs2] = useState([])


  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobData = await fetchJobs();
        setJobs2(jobData);
        setFilteredJobs2(jobData);
      } catch (err : any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);
  console.log("jobs2", jobs2)

  // Filter jobs based on search and filters
useEffect(() => {
  let results = jobs2;

  if (searchTerm) {
    results = results.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) 

    );
  }

  if (skillFilter && skillFilter !== "all") {
    results = results.filter(
      (job) => Array.isArray(job.skills) && job.skills.includes(skillFilter)
    );
  }

  if (toolsFilter && toolsFilter !== "all") {
    results = results.filter(
      (job) => Array.isArray(job.tools) && job.tools.includes(toolsFilter)
    );
  }
  setFilteredJobs2(results);
}, [jobs2, searchTerm, skillFilter, toolsFilter]);

  const handleApply = (job) => {
    setSelectedJob(job)
    setIsDialogOpen(true)
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type === "application/pdf") {
        setFileName(file.name)
      } else {
        alert("Please upload a PDF file only")
        e.target.value = ""
      }
    }
  }

  const handleSubmitApplication = () => {
    if (name && message && fileName) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSuccess(true)

        // Reset form after showing success
        setTimeout(() => {
          setName("")
          setMessage("")
          setFileName("")
          setIsSuccess(false)
          setIsDialogOpen(false)
        }, 2000)
      }, 1000)
    } else {
      alert("Please fill out all fields")
    }
  }

  // Get unique locations and categories for filters
  const skills = [...new Set(jobs2.flatMap((job) => job.skills))];
  console.log(skills);
  const tools = [...new Set(jobs2.flatMap((job) => job.tools))]; // Add this near `skills`

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20 pt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Find Your Next Opportunity</h1>
          <p className="text-gray-600">
            Browse and apply to the latest job openings that match your skills and interests
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8 rounded-xl bg-white p-4 shadow-md md:p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
                type="text"
                placeholder="Search job title, company, or keywords"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full h-12"
                />
            </div>

            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger>
                <SelectValue placeholder="skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All skills</SelectItem>
                {skills.map((skill,index) => (
                  <SelectItem key={index} value={skill}>
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={toolsFilter} onValueChange={setToolsFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tool" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tools</SelectItem>
                {tools.map((tool, index) => (
                  <SelectItem key={index} value={tool}>
                    {tool}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>


        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-900">{filteredJobs2.length}</span> jobs
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Filter className="h-4 w-4" />
                <span>Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Newest First</DropdownMenuItem>
              <DropdownMenuItem>Oldest First</DropdownMenuItem>
              <DropdownMenuItem>A-Z</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Job listings */}
        { filteredJobs2.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs2.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                          {new Date(job.uploaded_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                            <Badge className="bg-teal-100 text-xs font-medium text-teal-800">New</Badge>
                          )}
                        </div>
                        <p className="mt-1 text-gray-600">
                          {job.education_levels && job.education_levels.length > 0
                            ? job.education_levels[0]
                            : "No education requirement"}
                        </p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                        <Briefcase className="h-5 w-5 text-teal-600" />
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="line-clamp-3 text-sm text-gray-500">{job.description}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="mb-2 text-sm font-semibold text-gray-700">Required Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.skills &&
                          job.skills.slice(0, 5).map((skill, i) => (
                            <Badge key={i} variant="outline" className="bg-gray-100">
                              {skill}
                            </Badge>
                          ))}
                        {job.skills && job.skills.length > 5 && (
                          <Badge variant="outline" className="bg-gray-100">
                            +{job.skills.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>Posted on {new Date(job.uploaded_at).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-3 border-t bg-gray-50 p-4">
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 rounded-lg border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <Link href={`/jobs/${job.id}`}>
                        Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      onClick={() => handleApply(job)}
                      className="flex-1 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                    >
                      Apply Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSkillFilter("")
                setToolsFilter("")
              }}
              className="mt-4 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
                <Check className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Application Submitted!</h3>
              <p className="mt-2 text-gray-500">
                Your application for {selectedJob?.title} at {selectedJob?.company} has been submitted successfully.
              </p>
            </motion.div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">Apply for {selectedJob?.title}</DialogTitle>
                <DialogDescription>
                  Complete the form below to submit your application to {selectedJob?.company}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Why are you a good fit?
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us why you're perfect for this role"
                    className="min-h-[120px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cv" className="text-sm font-medium">
                    Upload CV (PDF only)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input id="cv" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
                    <div className="relative w-full">
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("cv").click()}
                        className="w-full justify-start rounded-lg border-dashed border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {fileName ? fileName : "Choose File"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="rounded-lg border-gray-200 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitApplication}
                  disabled={isSubmitting}
                  className="rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}


