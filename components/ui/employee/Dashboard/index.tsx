"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, CheckCircle, Building, Phone, Mail, Coffee } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import TodayStatusCard from "./TodayStatusCard"
import WeeklySummaryCard from "./WeeklySummaryCard"
import ComplianceStatusCard from "./ComplianceStatusCard"
import MobileQuickClockInOut from "./MobileQuickClockInOut"
import QuickActions from "./QuickActions"
import RecentActivityCard from "./RecentActivityCard"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchMyWeekTimecards, StatusCardData } from "@/store/actions/userAction"

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update currentTime every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

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
  const dispatch = useAppDispatch();
  const TODAY =  new Date().toISOString().split("T")[0]
  const WeekEnding = {
    "weekEnding": "2025-10-19"
  }
  useEffect(()=>{
    dispatch(StatusCardData());
    dispatch(fetchMyWeekTimecards(WeekEnding))
  }, [dispatch])
  const week = useAppSelector((state)=> state.user.weekTimecards) ; 
  const weeklyHours = {
    regular: week?.timecard?.regularHours,
    overtime: week?.timecard?.overtime,
    total: week?.timecard?.totalHours,
  }
  
  const status = useAppSelector((state)=> state.user.statusCard); 
  const todayStatus = {
    clockedIn: status.clockedIn,
    startTime: status.startTime,
    breaksTaken: status.breaksTaken,
    hoursWorked: status.hoursWorked,
  }

 const recentActivity = week?.timecard?.dailyEntries
  ?.slice(0, 3)
  ?.map((entry) => ({
    date: entry.date.split("T")[0],
    hours: entry.hours,
    status: week.timecard.status,
    overtime: week.timecard.overtime,
  })) || [];



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
