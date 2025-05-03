"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Briefcase, Check, FileText, Upload, X } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useJobStore } from "@/lib/store"
import { Progress } from "@/components/ui/progress"
import { postJob } from "@/services/post_job";

export default function PostJobPage() {
  const router = useRouter()
  const { addJob } = useJobStore()
  const [jobTitle, setJobTitle] = useState("")
  const [fileName, setFileName] = useState("")
  const [fileSize, setFileSize] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Format file size
      const size = file.size / 1024
      const formattedSize =
        size < 1024 ? `${Math.round(size * 10) / 10} KB` : `${Math.round((size / 1024) * 10) / 10} MB`

      setFileName(file.name)
      setFileSize(formattedSize)

      // Simulate file upload
      setIsUploading(true)
      setUploadProgress(0)

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            return 100
          }
          return prev + 5
        })
      }, 100)
    }
  }

  const clearFileSelection = () => {
    console.log("Clearing file selection"); // Debugging
    setFileName("");
    setFileSize("");
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePostJob = async () => {
    if (!fileInputRef.current) {
      console.error("File input ref is not attached.");
      return;
    }
  
    console.log("File Input Ref:", fileInputRef.current);
    console.log("Selected File:", fileInputRef.current?.files?.[0]);
  
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      alert("Please select a file before posting the job.");
      return;
    }
  
    if (jobTitle && file) {
      setIsSubmitting(true);
      try {
        const response = await postJob(jobTitle, file);
        console.log("Job posted successfully:", response);
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/employer");
        }, 1500);
      } catch (error) {
        console.error("Error posting job:", error);
        setIsSubmitting(false);
      }
    } else {
      alert("Please fill out all fields and upload a file.");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/employer"
            className="inline-flex items-center text-sm font-medium text-slate-600 transition-colors hover:text-teal-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Post a Job</h1>
          <p className="text-gray-500">Create a new job listing to find qualified candidates</p>
        </div>

        <div className="mx-auto max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="overflow-hidden border-none shadow-lg">
              <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-1">
                <CardHeader className="bg-white pt-6">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-teal-600" />
                    <CardTitle>Job Details</CardTitle>
                  </div>
                  <CardDescription>Fill out the form below to create a new job listing</CardDescription>
                </CardHeader>
              </div>
              <CardContent className="p-6">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
                      <Check className="h-8 w-8 text-teal-600" />
                    </div>
                    <h3 className="mt-4 text-xl font-medium text-gray-900">Job Posted Successfully!</h3>
                    <p className="mt-2 text-gray-500">
                      Your job listing has been created and is now visible to candidates.
                    </p>
                    <p className="text-sm text-gray-400">Redirecting to dashboard...</p>
                  </motion.div>
                ) : (
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="job-title" className="text-sm font-medium">
                        Job Title
                      </Label>
                      <Input
                        id="job-title"
                        placeholder="e.g. Frontend Developer"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="h-11 rounded-lg border-slate-200 bg-white shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-teal-500"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="job-description-file" className="text-sm font-medium">
                        Upload Job Description
                      </Label>

                      {!fileName ? (
                        <div className="relative">
                          <Input
                            ref={fileInputRef} // Ensure this is correctly passed
                            id="job-description-file"
                            type="file"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={handleFileChange}
                            className="hidden"
                          />                       
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center transition-colors hover:border-teal-300 hover:bg-teal-50"
                          >
                            <Upload className="mb-2 h-8 w-8 text-slate-400" />
                            <p className="text-sm font-medium text-slate-700">Click to upload job description</p>
                            <p className="mt-1 text-xs text-slate-500">PDF, DOC, DOCX or TXT (Max 5MB)</p>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                                <FileText className="h-5 w-5 text-slate-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-700">{fileName}</p>
                                <p className="text-xs text-slate-500">{fileSize}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                              onClick={clearFileSelection}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove file</span>
                            </Button>
                          </div>

                          {isUploading && (
                            <div className="mt-3 space-y-1">
                              <Progress value={uploadProgress} className="h-1.5 w-full" />
                              <p className="text-right text-xs text-slate-500">{uploadProgress}%</p>
                            </div>
                          )}

                          {uploadProgress === 100 && !isUploading && (
                            <div className="mt-3 flex items-center gap-1.5 text-xs text-teal-600">
                              <Check className="h-3.5 w-3.5" />
                              <span>Upload complete</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex justify-end gap-3">
                      <Button variant="outline" className="rounded-lg border-slate-200 hover:bg-slate-100" asChild>
                        <Link href="/employer">Cancel</Link>
                      </Button>
                      <Button
                        onClick={handlePostJob}
                        disabled={!jobTitle || !fileName || isSubmitting || isUploading}
                        className="rounded-lg bg-teal-600 text-white hover:bg-teal-700 disabled:bg-teal-300"
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
                            Posting...
                          </>
                        ) : (
                          "Post Job"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
