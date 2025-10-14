"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Clock, AlertTriangle, CheckCircle, Search, Filter, Bell, TrendingUp, Calendar } from "lucide-react"

interface QuickAction {
  id: string
  title: string
  description: string
  count: number
  priority: "high" | "medium" | "low"
  action: () => void
}

export function AdminMobileDashboard() {
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
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search employees, timecards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">45</div>
              <div className="text-xs text-gray-600">Employees</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">12</div>
              <div className="text-xs text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">3</div>
              <div className="text-xs text-gray-600">Issues</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">28</div>
              <div className="text-xs text-gray-600">Approved</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Panel */}
      {showNotifications && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm p-2 bg-white rounded border-l-4 border-red-500">
              <p className="font-medium">Compliance Alert</p>
              <p className="text-gray-600 text-xs">Mike Johnson exceeded daily hours limit</p>
            </div>
            <div className="text-sm p-2 bg-white rounded border-l-4 border-orange-500">
              <p className="font-medium">Overtime Warning</p>
              <p className="text-gray-600 text-xs">7 employees approaching weekly overtime</p>
            </div>
            <div className="text-sm p-2 bg-white rounded border-l-4 border-blue-500">
              <p className="font-medium">Timecard Submitted</p>
              <p className="text-gray-600 text-xs">John Doe submitted weekly timecard</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 gap-4">
        {quickActions.map((action) => (
          <Card
            key={action.id}
            className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${getPriorityColor(action.priority)}`}
            onClick={action.action}
          >
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-sm">{action.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {action.count}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </div>
                <div className="ml-2">
                  {action.priority === "high" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                  {action.priority === "medium" && <Clock className="h-5 w-5 text-orange-500" />}
                  {action.priority === "low" && <CheckCircle className="h-5 w-5 text-green-500" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Today's Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.employee}</p>
                <p className="text-xs text-gray-600">{activity.action}</p>
              </div>
              <div className="text-xs text-gray-500">{activity.time}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="h-16 flex-col space-y-1" onClick={() => (window.location.href = "/admin-manage-employees")}>
          <Users className="h-5 w-5" />
          <span className="text-xs">Manage Employees</span>
        </Button>
        <Button className="h-16 flex-col space-y-1" onClick={() => (window.location.href = "/admin-reports")}>
          <Calendar className="h-5 w-5" />
          <span className="text-xs">View Reports</span>
        </Button>
      </div>
    </div>
  )
}
