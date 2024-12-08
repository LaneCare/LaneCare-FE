import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BarChart2,
  Bell,
  Eye,
  MapPin,
  MessageSquare,
  Shield,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PublicTopbar from "@/components/navbar/PublicTopbar";
import Footer from "../(public)/components/footer";
import FeatureSet from "../(public)/components/feature-set";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicTopbar isLoggedIn={false} />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800 min-h-[80vh] flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-5xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text">
                  Welcome to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 dark:invert font-bold">
                    LaneCare
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400">
                  Revolutionizing road quality monitoring with IoT sensors and
                  AI-powered damage detection.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" className="animate-pulse">
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full">
          {/* <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Card className="cursor-pointer transition-all hover:shadow-lg">
                    <CardHeader>
                      <Eye className="h-6 w-6 mb-2 text-primary" />
                      <CardTitle>Automatic Damage Detection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        AI-powered system for accurate and timely road damage
                        identification.
                      </p>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">
                        AI-Powered Detection
                      </h4>
                      <p className="text-sm">
                        Our advanced AI algorithms can detect various types of
                        road damage with high accuracy.
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <BarChart2 className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>Real-time Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Continuous tracking of road conditions using IoT sensors.
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <MessageSquare className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>Reporting Platform</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    User-friendly interface for public reporting and
                    communication.
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <Bell className="h-6 w-6 mb-2 text-primary" />
                  <CardTitle>Email Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Stay informed with updates on reported issues and repair
                    progress.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div> */}
          <FeatureSet />
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <img
                alt="LaneCare Dashboard"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last shadow-2xl transition-all hover:scale-105"
                height="310"
                src="/placeholder.svg?height=310&width=550"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Empower Your Community
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    LaneCare enhances transparency, accountability, and resource
                    allocation efficiency for road repairs. By providing
                    real-time data to governments and empowering communities,
                    we're improving road safety and quality of life.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="animate-pulse">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[500px_1fr] lg:gap-12 xl:grid-cols-[550px_1fr]">
              <img
                alt="LaneCare Dashboard"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full shadow-2xl transition-all hover:scale-105"
                height="310"
                src="/placeholder.svg?height=310&width=550"
                width="550"
              />
              <div className="flex flex-col justify-end items-end space-y-4 text-right">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Empower Your Community
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    LaneCare enhances transparency, accountability, and resource
                    allocation efficiency for road repairs. By providing
                    real-time data to governments and empowering communities,
                    we're improving road safety and quality of life.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="animate-pulse">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Join the LaneCare Revolution
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Be part of the solution. Help improve road infrastructure in
                  your community with LaneCare's cutting-edge technology and
                  collaborative approach.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sign up to receive updates and be the first to know when we
                  launch.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 LaneCare. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer> */}
      <footer className="bg-gray-100 dark:bg-gray-800">
        <Footer />
      </footer>
    </div>
  );
}
