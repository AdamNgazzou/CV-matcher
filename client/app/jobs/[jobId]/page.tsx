"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, MapPin, Building, Clock, ArrowLeft, Upload, FileText, Check } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useJobStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"

export default function JobDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { jobs } = useJobStore()
  const jobId = params.jobId as string
  const job = jobs.find((j) => j.id === jobId)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [fileName, setFileName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    // Open dialog if apply=true is in the URL
    if (searchParams.get("apply") === "true") {
      setIsDialogOpen(true)
    }
  }, [searchParams])

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

        // Reset and close after showing success
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

  // If job not found
  if (!job) {
    return (
      <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
        <Briefcase className="h-16 w-16 text-slate-300" />
        <h1 className="mt-6 text-2xl font-bold text-slate-900">Job Not Found</h1>
        <p className="mt-2 text-slate-500">The job you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="mt-6 rounded-lg bg-teal-600 text-white hover:bg-teal-700">
          <Link href="/candidate">Browse All Jobs</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/candidate"
            className="inline-flex items-center text-sm font-medium text-slate-600 transition-colors hover:text-teal-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-8 grid gap-6 md:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{job.title}</h1>
                  {job.isNew && <Badge className="bg-teal-500 text-white hover:bg-teal-600">New</Badge>}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Building className="h-4 w-4" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>Posted {job.posted}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-end">
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="w-full rounded-lg bg-teal-600 text-white hover:bg-teal-700 md:w-auto"
                size="lg"
              >
                Apply for this position
              </Button>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            <div className="space-y-8">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <h2 className="mb-4 text-xl font-semibold text-slate-900">Job Description</h2>
                    <p className="mb-4 text-slate-600">{job.description}</p>

                    <h3 className="mb-3 mt-6 text-lg font-semibold text-slate-900">Responsibilities</h3>
                    <ul className="mb-6 list-inside list-disc space-y-2 text-slate-600">
                      {job.responsibilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>

                    <h3 className="mb-3 mt-6 text-lg font-semibold text-slate-900">Requirements</h3>
                    <ul className="mb-6 list-inside list-disc space-y-2 text-slate-600">
                      {job.requirements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>

                    {job.benefits && (
                      <>
                        <h3 className="mb-3 mt-6 text-lg font-semibold text-slate-900">Benefits</h3>
                        <ul className="list-inside list-disc space-y-2 text-slate-600">
                          {job.benefits.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-slate-900">Job Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-sm text-slate-500">Employment Type</span>
                      <span className="font-medium text-slate-700">{job.employmentType}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-sm text-slate-500">Experience Level</span>
                      <span className="font-medium text-slate-700">{job.experienceLevel}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-sm text-slate-500">Category</span>
                      <span className="font-medium text-slate-700">{job.category}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center justify-between pb-2">
                        <span className="text-sm text-slate-500">Salary Range</span>
                        <span className="font-medium text-slate-700">{job.salary}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {job.fileName && (
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-lg font-semibold text-slate-900">Job Description File</h3>
                    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                        <FileText className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">{job.fileName}</p>
                        <p className="text-xs text-slate-500">{job.fileSize}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto h-8 gap-1 rounded-full text-xs font-normal text-slate-700 hover:bg-slate-200"
                      >
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="border-none bg-teal-50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                      <Building className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{job.company}</h3>
                      <p className="text-sm text-slate-500">{job.companyDescription}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
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
                Your application for {job.title} at {job.company} has been submitted successfully.
              </p>
            </motion.div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">Apply for {job.title}</DialogTitle>
                <DialogDescription>
                  Complete the form below to submit your application to {job.company}.
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
                    className="h-11 rounded-lg border-slate-200 bg-white shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-teal-500"
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
                    className="min-h-[120px] rounded-lg border-slate-200 bg-white shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-teal-500"
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
                        className="w-full justify-start rounded-lg border-dashed border-slate-300 bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
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
                  className="rounded-lg border-slate-200 hover:bg-slate-100"
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
