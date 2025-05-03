import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Search, MapPin, Building, ChevronRight, Users, Zap, CheckCircle } from "lucide-react"
import { FeaturedJobCard } from "@/components/featured-job-card"
import { CategoryCard } from "@/components/category-card"
import { TestimonialCard } from "@/components/testimonial-card"

export default function Home() {
  // Featured jobs data
  const featuredJobs = [
    {
      id: "1",
      title: "UI/UX Designer",
      company: "TechCorp",
      location: "Remote",
      salary: "$80,000 - $110,000",
      posted: "2 days ago",
      isNew: true,
    },
    {
      id: "2",
      title: "Frontend Developer",
      company: "WebSolutions",
      location: "New York, NY",
      salary: "$120,000 - $150,000",
      posted: "1 week ago",
    },
    {
      id: "4",
      title: "Product Manager",
      company: "InnovateCo",
      location: "Austin, TX",
      salary: "$130,000 - $160,000",
      posted: "Just now",
      isNew: true,
    },
  ]

  // Job categories
  const categories = [
    { name: "Design", icon: "palette", count: 142 },
    { name: "Development", icon: "code", count: 305 },
    { name: "Marketing", icon: "trending-up", count: 87 },
    { name: "Product", icon: "box", count: 63 },
    { name: "Customer Support", icon: "headphones", count: 41 },
    { name: "Sales", icon: "dollar-sign", count: 92 },
  ]

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "UI Designer at Adobe",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "I found my dream job through JobSearch in just two weeks! The platform made it incredibly easy to connect with top employers in my field.",
    },
    {
      name: "Michael Chen",
      role: "Senior Developer at Stripe",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "As someone who's used many job platforms, JobSearch stands out for its clean interface and quality listings. I received multiple offers within days.",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager at Spotify",
      image: "/placeholder.svg?height=80&width=80",
      content:
        "The personalized job recommendations were spot on! JobSearch understood my skills and connected me with opportunities I wouldn't have found elsewhere.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 to-white pb-16 pt-24 md:pb-24 md:pt-32">
        <div className="absolute -top-24 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-r from-teal-100/30 to-emerald-100/30 blur-3xl"></div>
        <div className="absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-yellow-100/30 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-blue-100/20 blur-3xl"></div>

        <div className="container relative mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-teal-100 px-3 py-1 text-sm font-medium text-teal-800 hover:bg-teal-200">
              Over 10,000 jobs available
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Find Your <span className="text-teal-600">Dream Job</span> Today
            </h1>
            <p className="mb-8 text-lg text-gray-600 md:text-xl">
              Connect with top employers and discover opportunities that match your skills, experience, and career
              goals.
            </p>

            <div className="mx-auto mb-8 max-w-2xl">
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <Button asChild size="lg" className="h-12 rounded-full bg-teal-600 px-8 text-white hover:bg-teal-700">
                <Link href="/candidate">Find Jobs</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-teal-200 text-teal-700 hover:bg-teal-50"
              >
                <Link href="/employer">For Employers</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-16 px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-teal-600" />
              <span className="text-sm font-medium text-gray-600">10k+ Candidates</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-teal-600" />
              <span className="text-sm font-medium text-gray-600">2k+ Companies</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-teal-600" />
              <span className="text-sm font-medium text-gray-600">5k+ Job Postings</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-teal-600" />
              <span className="text-sm font-medium text-gray-600">98% Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Featured Jobs</h2>
              <p className="mt-2 text-gray-600">Explore our handpicked selection of top opportunities</p>
            </div>
            <Button
              asChild
              variant="outline"
              className="group h-10 gap-1 rounded-full border-teal-200 text-teal-700 hover:bg-teal-50"
            >
              <Link href="/candidate">
                View All Jobs
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <FeaturedJobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Browse by Category</h2>
            <p className="mt-4 text-gray-600">
              Explore job opportunities across various industries and specializations
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-teal-100 px-3 py-1 text-sm font-medium text-teal-800">Simple Process</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">How It Works</h2>
            <p className="mt-4 text-gray-600">
              Our streamlined process helps you find and apply to your ideal job in just a few steps
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <Card className="relative overflow-hidden border-none bg-gradient-to-br from-teal-50 to-emerald-50 shadow-md">
              <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-2xl font-bold text-teal-600">
                1
              </div>
              <CardContent className="p-6 pt-16">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
                  <Users className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Create Your Profile</h3>
                <p className="text-gray-600">
                  Sign up and build your professional profile highlighting your skills, experience, and career goals.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-none bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md">
              <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                2
              </div>
              <CardContent className="p-6 pt-16">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Discover Opportunities</h3>
                <p className="text-gray-600">
                  Browse through our extensive job listings or receive personalized job recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-none bg-gradient-to-br from-purple-50 to-pink-50 shadow-md">
              <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600">
                3
              </div>
              <CardContent className="p-6 pt-16">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Apply & Connect</h3>
                <p className="text-gray-600">
                  Submit applications with just a few clicks and connect directly with hiring managers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-teal-100 px-3 py-1 text-sm font-medium text-teal-800">Testimonials</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Success Stories</h2>
            <p className="mt-4 text-gray-600">
              Hear from professionals who found their perfect career match through our platform
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-600 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready to Take the Next Step in Your Career?
            </h2>
            <p className="mt-4 text-xl text-teal-100">
              Join thousands of professionals who have found their dream jobs on our platform
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-full bg-white px-8 text-teal-700 hover:bg-teal-50">
                <Link href="/candidate">Find Jobs</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-teal-300 text-teal-700 hover:bg-teal-700 hover:text-white"
              >
                <Link href="/employer">Post a Job</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
