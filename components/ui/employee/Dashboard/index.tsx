"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, CheckCircle, Building, Phone, Mail, Coffee } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { MobileTimecard } from "../mobile-timecard"
import TodayStatusCard from "./TodayStatusCard"
import WeeklySummaryCard from "./WeeklySummaryCard"
import ComplianceStatusCard from "./ComplianceStatusCard"
import MobileQuickClockInOut from "./MobileQuickClockInOut"
import QuickActions from "./QuickActions"
import RecentActivityCard from "./RecentActivityCard"

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Mock data
  const employee = {
    name: "John Doe",
    position: "Software Developer",
    department: "Engineering",
    employeeId: "EMP001",
  }

  const company = {
    name: "TechCorp Solutions",
    address: "123 Business Ave, San Francisco, CA 94105",
    phone: "(555) 123-4567",
    email: "hr@techcorp.com",
    officeHours: "Monday - Friday: 9:00 AM - 6:00 PM",
  }

  const weeklyHours = {
    regular: 32.5,
    overtime: 4.0,
    total: 36.5,
  }

  const todayStatus = {
    clockedIn: true,
    startTime: "9:00 AM",
    breaksTaken: 1,
    hoursWorked: 6.5,
  }

  const recentActivity = [

    { date: "2024-01-15", hours: 8.0, status: "approved", overtime: 0 },
    { date: "2024-01-14", hours: 9.5, status: "approved", overtime: 1.5 },
    { date: "2024-01-13", hours: 8.0, status: "pending", overtime: 0 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="employee" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {employee.name}</h1>
          <p className="text-gray-600">
            {employee.position} • {employee.department}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Status */}
          <TodayStatusCard todayStatus={todayStatus} />

          {/* Weekly Summary */}
          <WeeklySummaryCard weeklyHours={weeklyHours} />

          {/* Compliance Status */}
         <ComplianceStatusCard />
        </div>

        {/* Mobile Quick Clock In/Out - Only visible on mobile */}
        <MobileQuickClockInOut />

        {/* Quick Actions */}
        <QuickActions company={company} />
        {/* Recent Activity */}
        <RecentActivityCard recentActivity={recentActivity} />
      </div>
    </div>
  )
}
