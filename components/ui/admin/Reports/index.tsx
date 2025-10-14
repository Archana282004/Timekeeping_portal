"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { 
  Download, 
  Calendar as CalendarIcon, 
  FileText, 
  Clock, 
  Users, 
  AlertTriangle, 
  TrendingUp,
  Filter,
  Search,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { format } from "date-fns"
import AnalyticsDashboard from "./ AnalyticsDashboard"
import DepartmentHoursDistribution from "./DepartmentHoursDistribution"

interface ReportData {
  id: string
  name: string
  type: "timecard" | "compliance" | "payroll" | "overtime"
  period: string
  generatedDate: string
  status: "ready" | "generating" | "error"
  size: string
}

interface TimecardReport {
  employeeId: string
  employeeName: string
  department: string
  weekEnding: string
  totalHours: number
  regularHours: number
  overtimeHours: number
  status: "approved" | "pending" | "rejected"
  complianceIssues: string[]
}

interface ComplianceReport {
  issue: string
  count: number
  severity: "high" | "medium" | "low"
  trend: "increasing" | "decreasing" | "stable"
}

interface PayrollReport {
  employeeId: string
  employeeName: string
  department: string
  regularPay: number
  overtimePay: number
  totalPay: number
  hoursWorked: number
}

export default function Reports() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date()
  })
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [reportType, setReportType] = useState("timecard")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for reports
  const reports: ReportData[] = [
    {
      id: "1",
      name: "Weekly Timecard Summary",
      type: "timecard",
      period: "2024-01-08 to 2024-01-14",
      generatedDate: "2024-01-15T10:30:00Z",
      status: "ready",
      size: "2.3 MB"
    },
    {
      id: "2",
      name: "Compliance Issues Report",
      type: "compliance",
      period: "2024-01-01 to 2024-01-31",
      generatedDate: "2024-01-31T15:45:00Z",
      status: "ready",
      size: "1.8 MB"
    },
    {
      id: "3",
      name: "Monthly Payroll Report",
      type: "payroll",
      period: "2024-01-01 to 2024-01-31",
      generatedDate: "2024-02-01T09:00:00Z",
      status: "ready",
      size: "4.2 MB"
    },
    {
      id: "4",
      name: "Overtime Analysis",
      type: "overtime",
      period: "2024-01-01 to 2024-01-31",
      generatedDate: "2024-02-01T11:20:00Z",
      status: "generating",
      size: "0 MB"
    }
  ]

  const timecardData: TimecardReport[] = [
    {
      employeeId: "1",
      employeeName: "John Doe",
      department: "Engineering",
      weekEnding: "2024-01-14",
      totalHours: 42.5,
      regularHours: 40.0,
      overtimeHours: 2.5,
      status: "approved",
      complianceIssues: []
    },
    {
      employeeId: "2",
      employeeName: "Jane Smith",
      department: "Marketing",
      weekEnding: "2024-01-14",
      totalHours: 40.0,
      regularHours: 40.0,
      overtimeHours: 0,
      status: "approved",
      complianceIssues: []
    },
    {
      employeeId: "3",
      employeeName: "Mike Johnson",
      department: "Sales",
      weekEnding: "2024-01-14",
      totalHours: 45.0,
      regularHours: 40.0,
      overtimeHours: 5.0,
      status: "pending",
      complianceIssues: ["Excessive overtime", "Missing second meal break"]
    }
  ]

  const complianceData: ComplianceReport[] = [
    { issue: "Missing meal breaks", count: 15, severity: "high", trend: "increasing" },
    { issue: "Excessive overtime", count: 8, severity: "medium", trend: "stable" },
    { issue: "Late submissions", count: 12, severity: "low", trend: "decreasing" },
    { issue: "Incomplete timecards", count: 5, severity: "medium", trend: "stable" }
  ]

  const payrollData: PayrollReport[] = [
    {
      employeeId: "1",
      employeeName: "John Doe",
      department: "Engineering",
      regularPay: 3200.00,
      overtimePay: 300.00,
      totalPay: 3500.00,
      hoursWorked: 42.5
    },
    {
      employeeId: "2",
      employeeName: "Jane Smith",
      department: "Marketing",
      regularPay: 3000.00,
      overtimePay: 0.00,
      totalPay: 3000.00,
      hoursWorked: 40.0
    },
    {
      employeeId: "3",
      employeeName: "Mike Johnson",
      department: "Sales",
      regularPay: 2800.00,
      overtimePay: 525.00,
      totalPay: 3325.00,
      hoursWorked: 45.0
    }
  ]

  // Chart data
  const weeklyHoursData = [
    { week: "Week 1", regular: 320, overtime: 45 },
    { week: "Week 2", regular: 310, overtime: 38 },
    { week: "Week 3", regular: 325, overtime: 52 },
    { week: "Week 4", regular: 315, overtime: 41 }
  ]

  const departmentHoursData = [
    { department: "Engineering", hours: 1680, color: "#8884d8" },
    { department: "Marketing", hours: 1200, color: "#82ca9d" },
    { department: "Sales", hours: 1440, color: "#ffc658" },
    { department: "HR", hours: 800, color: "#ff7300" }
  ]

  const complianceTrendData = [
    { month: "Jan", issues: 12 },
    { month: "Feb", issues: 8 },
    { month: "Mar", issues: 15 },
    { month: "Apr", issues: 10 }
  ]

  const exportReport = (reportId: string) => {
    // Mock export functionality
    alert(`Exporting report ${reportId}...`)
  }

  const generateReport = () => {
    // Mock report generation
    alert(`Generating ${reportType} report for ${format(dateRange.from || new Date(), "MMM dd")} - ${format(dateRange.to || new Date(), "MMM dd, yyyy")}...`)
  }

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = reportType === "all" || report.type === reportType
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="admin" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and view comprehensive reports on employee timekeeping</p>
        </div>

       

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Hours Chart */}
         <AnalyticsDashboard weeklyHoursData={weeklyHoursData} />

          {/* Department Hours Distribution */}
           <DepartmentHoursDistribution departmentHoursData={departmentHoursData} />
        </div>

        
      </div>
    </div>
  )
}
