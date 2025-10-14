"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Clock, AlertTriangle, CheckCircle, Download, Search } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { AdminMobileDashboard } from "./Dashboard/dashboard-mobile"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")

  // Mock data
  const stats = {
    totalEmployees: 45,
    pendingTimecards: 12,
    complianceIssues: 3,
    approvedThisWeek: 28,
  }

  const recentTimecards = [
    {
      id: "1",
      employee: "John Doe",
      department: "Engineering",
      weekEnding: "2024-01-15",
      totalHours: 42.5,
      overtime: 2.5,
      status: "pending",
      issues: ["Missing meal break on Tuesday"],
    },
    {
      id: "2",
      employee: "Jane Smith",
      department: "Marketing",
      weekEnding: "2024-01-15",
      totalHours: 40.0,
      overtime: 0,
      status: "approved",
      issues: [],
    },
    {
      id: "3",
      employee: "Mike Johnson",
      department: "Sales",
      weekEnding: "2024-01-15",
      totalHours: 45.0,
      overtime: 5.0,
      status: "flagged",
      issues: ["Excessive overtime", "No second meal break"],
    },
  ]

  const employees = [
    { id: "1", name: "John Doe", department: "Engineering", position: "Software Developer", status: "active" },
    { id: "2", name: "Jane Smith", department: "Marketing", position: "Marketing Manager", status: "active" },
    { id: "3", name: "Mike Johnson", department: "Sales", position: "Sales Representative", status: "active" },
    { id: "4", name: "Sarah Wilson", department: "HR", position: "HR Specialist", status: "active" },
    { id: "5", name: "Tom Brown", department: "Engineering", position: "Senior Developer", status: "active" },
  ]

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || emp.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  const exportPayroll = () => {
    // Mock export functionality
    alert("Payroll data exported to Excel format")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="admin" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage employees and review timecards</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEmployees}</div>
              <p className="text-xs text-muted-foreground">Active employees</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingTimecards}</div>
              <p className="text-xs text-muted-foreground">Timecards to review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.complianceIssues}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved This Week</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approvedThisWeek}</div>
              <p className="text-xs text-muted-foreground">Timecards processed</p>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Admin Dashboard - Only visible on mobile */}
        <div className="md:hidden">
          <AdminMobileDashboard />
        </div>

        {/* Desktop Content - Hidden on mobile */}
        <div className="hidden md:block">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/admin-review-timecards" className="block">
                  <Button className="w-full" size="lg">
                    <Clock className="mr-2 h-4 w-4" />
                    Review Timecards
                  </Button>
                </Link>
                <Link href="/admin-manage-employees" className="block">
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Employees
                  </Button>
                </Link>
                <Button onClick={exportPayroll} variant="outline" className="w-full bg-transparent" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Export Payroll
                </Button>
              </CardContent>
            </Card>

            {/* Recent Timecards */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Timecard Submissions</CardTitle>
                <CardDescription>Latest submissions requiring review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTimecards.slice(0, 3).map((timecard) => (
                    <div key={timecard.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{timecard.employee}</p>
                        <p className="text-sm text-gray-600">
                          {timecard.totalHours}h total
                          {timecard.overtime > 0 && ` (${timecard.overtime}h OT)`}
                        </p>
                        {timecard.issues.length > 0 && (
                          <p className="text-xs text-red-600 mt-1">{timecard.issues.length} issue(s)</p>
                        )}
                      </div>
                      <Badge
                        variant={
                          timecard.status === "approved"
                            ? "default"
                            : timecard.status === "flagged"
                              ? "destructive"
                              : "secondary"
                        }
                        className={
                          timecard.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : timecard.status === "flagged"
                              ? "bg-red-100 text-red-800"
                              : ""
                        }
                      >
                        {timecard.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Employee Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Employee Management</CardTitle>
                  <CardDescription>View and manage employee information</CardDescription>
                </div>
                <Link href="admin-add-new-emploee">
                  <Button>Add Employee</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Employee List */}
              <div className="space-y-4">
                {filteredEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-gray-600">{employee.position}</p>
                        </div>
                        <Badge variant="outline">{employee.department}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {employee.status}
                      </Badge>
                      <Link href={`/admin/employees/${employee.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
