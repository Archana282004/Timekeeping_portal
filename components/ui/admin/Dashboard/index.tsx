"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Clock, AlertTriangle, CheckCircle, Download, Search, SortDesc } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { AdminMobileDashboard } from "./dashboard-mobile"
import StatsCard from "./StatsCard"
import EmployeeList from "./EmployeeList"
import Filters from "./Filters"
import RecentTimecards from "./RecentTimecards"
import EmployeeManagement from "./EmployeeManagement"
import QuickActions from "./QuickActions"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchAdminDashboardStats, fetchTimeCards, fetchUsers } from "@/store/actions/adminaction"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const dispatch = useAppDispatch();
 useEffect(() => {
  dispatch(fetchAdminDashboardStats())
 },[dispatch])
  // Mock data
  const stats = useAppSelector((state) => state.admin.adminDashboardStats) || {
    totalEmployees: 0,
    pendingTimecards: 0,
    complianceIssues: 0,
    approvedThisWeek: 0,
  }

  const recentTimecards = useAppSelector((state)=> state.admin.timeCardList)

  // const recentTimecards = [
  //   {
  //     id: "1",
  //     employee: "John Doe",
  //     department: "Engineering",
  //     weekEnding: "2024-01-15",
  //     totalHours: 42.5,
  //     overtime: 2.5,
  //     status: "pending",
  //     issues: ["Missing meal break on Tuesday"],
  //   },
  //   {
  //     id: "2",
  //     employee: "Jane Smith",
  //     department: "Marketing",
  //     weekEnding: "2024-01-15",
  //     totalHours: 40.0,
  //     overtime: 0,
  //     status: "approved",
  //     issues: [],
  //   },
  //   {
  //     id: "3",
  //     employee: "Mike Johnson",
  //     department: "Sales",
  //     weekEnding: "2024-01-15",
  //     totalHours: 45.0,
  //     overtime: 5.0,
  //     status: "flagged",
  //     issues: ["Excessive overtime", "No second meal break"],
  //   },
  // ]

  useEffect(()=>{
    dispatch(fetchUsers({ page: 1, limit: 50 }));
    dispatch(fetchTimeCards({page:1}))
  },[])

  const employees = useAppSelector((state) => state.admin.userlist) || [];
  console.log("Employees", employees)

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
       
        <StatsCard stats={stats} />
        {/* Mobile Admin Dashboard - Only visible on mobile */}
        <div className="md:hidden">
          <AdminMobileDashboard />
        </div>

        {/* Desktop Content - Hidden on mobile */}
        <div className="hidden md:block">
          {/* Quick Actions */}
          <QuickActions exportPayroll={exportPayroll} recentTimecards={recentTimecards} />

          {/* Employee Management */}
          <Card>
            <EmployeeManagement />
            <CardContent>
              {/* Filters */}
              <Filters searchTerm={searchTerm} setSearchTerm={setSearchTerm} departmentFilter={departmentFilter} setDepartmentFilter={setDepartmentFilter} />

              {/* Employee List */}
              <EmployeeList filteredEmployees={filteredEmployees} />
              
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
