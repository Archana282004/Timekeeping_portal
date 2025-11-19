"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { AdminMobileDashboard } from "../dashboard-mobile"
import StatsCard from "./stats-card"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchAdminDashboardStats, fetchTimeCards, fetchUsers } from "@/store/actions/admin-action"
import PageHeader from "../../pageheader"
import EmployeeTable from "./employee-table"
import QuickActionsandRecentCards from "./qucik-actions-and-recent-timecards"

const AdminDashboard = () =>{
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAdminDashboardStats())
  }, [dispatch])
  // Mock data
  const stats = useAppSelector((state) => state.admin.adminDashboardStats) || {
    totalEmployees: 0,
    pendingTimecards: 0,
    complianceIssues: 0,
    approvedThisWeek: 0,
  }

  const recentTimecards = useAppSelector((state) => state.admin.timeCardList)
  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 50 }));
    dispatch(fetchTimeCards({ page: 1 }))
  }, [])

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
        <PageHeader
          title="Admin Dashboard"
          description="Manage employees and review timecards"
        />

        {/* Stats Overview */}

        <StatsCard stats={stats} />
        {/* Mobile Admin Dashboard - Only visible on mobile */}
        <div className="md:hidden">
          <AdminMobileDashboard />
        </div>

        {/* Desktop Content - Hidden on mobile */}
        <div className="hidden md:block">
          {/* Quick Actions */}
          <QuickActionsandRecentCards recentTimecards={recentTimecards} />

          {/* Employee Management */}
          <EmployeeTable
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            filteredEmployees={filteredEmployees}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard