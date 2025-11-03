"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, CheckCircle, Building, Phone, Mail, Coffee } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import TodayStatusCard from "./today-status-card"
import WeeklySummaryCard from "./weekly-summary-card"
import ComplianceStatusCard from "./compliance-status-card"
import MobileQuickClockInOut from "./mobile-quick-clock-in-out"
import QuickActions from "./quick-actions"
import RecentActivityCard from "./recent-activity-card"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchMyWeekTimecards, StatusCardData } from "@/store/actions/user-action"
import Cookies from "js-cookie"


export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update currentTime every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const CookieData = Cookies.get('user');
  if (!CookieData) {
    console.warn("⚠️ No user cookie found");
    return;
  }
  const employee= JSON.parse(CookieData);
  const company = JSON.parse(CookieData);
  const dispatch = useAppDispatch();
  const TODAY = new Date().toISOString().split("T")[0]
  const WeekEnding = {
    "weekEnding": "2025-10-19"
  }
  useEffect(() => {
    dispatch(StatusCardData());
    dispatch(fetchMyWeekTimecards(WeekEnding))
  }, [dispatch])
  const week = useAppSelector((state) => state.user.weekTimecards);
  const weeklyHours = {
    regular: week?.timecard?.regularHours,
    overtime: week?.timecard?.overtime,
    total: week?.timecard?.totalHours,
  }

  const status = useAppSelector((state) => state.user.statusCard);
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
