"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import TodayStatusCard from "./stats/today-status-card"
import WeeklySummaryCard from "./stats/weekly-summary-card"
import ComplianceStatusCard from "./stats/compliance-status-card"
import MobileQuickClockInOut from "./mobile-quick-clock-in-and-out"
import RecentActivityCard from "./recent-activity"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchMyWeekTimecards, StatusCardData } from "@/store/actions/user-action"
import Cookies from "js-cookie"
import PageHeader from "../../pageheader"
import QuickActionsAndCompanyInfo from "./quick-actions-and-company-info"
import Stats from "./stats"


const Dashboard = () => {
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
  const employee = JSON.parse(CookieData);
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
    regular: week?.timecards?.regularHours,
    overtime: week?.timecards?.overtime,
    total: week?.timecards?.totalHours,
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
    ?.map((entry:any) => ({
      date: entry.date.split("T")[0],
      hours: entry.hours,
      status: week.timecard.status,
      overtime: week.timecard.overtime,
    })) || [];



  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="employee" />

      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title={`Welcome back,+${employee.name}`}
          description={`${employee.position} • ${employee.department}`}
        />
      <Stats 
      todayStatus={todayStatus}
      weeklyHours={weeklyHours}
      />
        

        {/* Mobile Quick Clock In/Out - Only visible on mobile */}
        <MobileQuickClockInOut />

        {/* Quick Actions */}
        <QuickActionsAndCompanyInfo company={company} />

        {/* Recent Activity */}
        <RecentActivityCard recentActivity={recentActivity} />
      </div>
    </div>
  )
}

export default Dashboard;