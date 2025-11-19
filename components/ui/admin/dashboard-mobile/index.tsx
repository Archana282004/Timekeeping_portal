"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Clock, AlertTriangle, CheckCircle, Search, Filter, Bell, TrendingUp, Calendar } from "lucide-react"
import QuickAccessButtons from "./quick-access-buttons"
import TodaysActiviy from "./todays-activity"
import QuickActionsGrid from "./quick-actions-grid"
import NotificationsPanel from "./notification-panel"
import QuickStatsRow from "./mobile-header-with-search/quick-stats-row"
import MobileHeaderSearch from "./mobile-header-with-search/header-with-search"

interface QuickAction {
  id: string
  title: string
  description: string
  count: number
  priority: "high" | "medium" | "low"
  action: () => void
}

const AdminMobileDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)

  const quickActions: QuickAction[] = [
    {
      id: "pending-reviews",
      title: "Pending Reviews",
      description: "Timecards awaiting approval",
      count: 12,
      priority: "high",
      action: () => (window.location.href = "/admin-review-timecards"),
    },
    {
      id: "compliance-issues",
      title: "Compliance Issues",
      description: "Labor law violations to address",
      count: 3,
      priority: "high",
      action: () => alert("Navigate to compliance issues"),
    },
    {
      id: "overtime-alerts",
      title: "Overtime Alerts",
      description: "Employees approaching overtime",
      count: 7,
      priority: "medium",
      action: () => alert("Navigate to overtime alerts"),
    },
    {
      id: "missing-timecards",
      title: "Missing Timecards",
      description: "Employees who haven't submitted",
      count: 5,
      priority: "medium",
      action: () => alert("Navigate to missing timecards"),
    },
  ]

  const recentActivity = [
    { id: 1, employee: "John Doe", action: "Submitted timecard", time: "2 min ago", type: "submission" },
    { id: 2, employee: "Jane Smith", action: "Approved timecard", time: "15 min ago", type: "approval" },
    { id: 3, employee: "Mike Johnson", action: "Flagged for overtime", time: "1 hour ago", type: "alert" },
    { id: 4, employee: "Sarah Wilson", action: "Clock in", time: "2 hours ago", type: "clock" },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Mobile Header with Search */}

      <MobileHeaderSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setShowNotifications={setShowNotifications}
        showNotifications={showNotifications}
      />

      {/* Notifications Panel */}
      <NotificationsPanel
        showNotifications={showNotifications}
      />

      {/* Quick Actions Grid */}
      <QuickActionsGrid
        quickActions={quickActions}
        getPriorityColor={getPriorityColor}
      />

      {/* Today's Activity */}
      <TodaysActiviy
        recentActivity={recentActivity}
      />

      {/* Quick Access Buttons */}
      <QuickAccessButtons />
    </div>
  )
}

export default AdminMobileDashboard;