"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Download, Search, Eye, AlertTriangle, CheckCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Pagination } from "@/components/pagination"
import Link from "next/link"
import SummaryStats from "./SummaryStats"
import FirstTimecard from "./FirstTimecard"
import Filter from "./Filter"
import TimecardHistoryList from "./TimecardHistoryList"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { HistoryPageData } from "@/store/actions/userAction"

interface TimecardHistory {
  id: string
  weekEnding: string
  totalHours: number
  regularHours: number
  overtime: number
  status: "approved" | "pending" | "rejected" | "draft"
  submittedAt: string
  approvedAt?: string
  issues: string[]
  dailyBreakdown: {
    date: string
    hours: number
    overtime: number
  }[]
}

export default function TimecardHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("last-30")
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  // Extended Mock history data (15 items for better pagination demonstration)
  const timecardHistory: TimecardHistory[] = [
    {
      id: "1",
      weekEnding: "2024-01-15",
      totalHours: 42.5,
      regularHours: 40,
      overtime: 2.5,
      status: "approved",
      submittedAt: "2024-01-15T10:30:00Z",
      approvedAt: "2024-01-16T09:15:00Z",
      issues: [],
      dailyBreakdown: [
        { date: "2024-01-08", hours: 8.0, overtime: 0 },
        { date: "2024-01-09", hours: 8.0, overtime: 0 },
        { date: "2024-01-10", hours: 8.5, overtime: 0.5 },
        { date: "2024-01-11", hours: 8.0, overtime: 0 },
        { date: "2024-01-12", hours: 10.0, overtime: 2.0 },
      ],
    },
    {
      id: "2",
      weekEnding: "2024-01-08",
      totalHours: 40.0,
      regularHours: 40,
      overtime: 0,
      status: "approved",
      submittedAt: "2024-01-08T11:00:00Z",
      approvedAt: "2024-01-09T08:30:00Z",
      issues: [],
      dailyBreakdown: [
        { date: "2024-01-01", hours: 8.0, overtime: 0 },
        { date: "2024-01-02", hours: 8.0, overtime: 0 },
        { date: "2024-01-03", hours: 8.0, overtime: 0 },
        { date: "2024-01-04", hours: 8.0, overtime: 0 },
        { date: "2024-01-05", hours: 8.0, overtime: 0 },
      ],
    },
    {
      id: "3",
      weekEnding: "2024-01-01",
      totalHours: 38.5,
      regularHours: 38.5,
      overtime: 0,
      status: "pending",
      submittedAt: "2024-01-01T16:45:00Z",
      issues: ["Missing break documentation for Tuesday"],
      dailyBreakdown: [
        { date: "2023-12-25", hours: 0, overtime: 0 },
        { date: "2023-12-26", hours: 7.5, overtime: 0 },
        { date: "2023-12-27", hours: 8.0, overtime: 0 },
        { date: "2023-12-28", hours: 8.0, overtime: 0 },
        { date: "2023-12-29", hours: 7.0, overtime: 0 },
      ],
    },
    {
      id: "4",
      weekEnding: "2023-12-25",
      totalHours: 32.0,
      regularHours: 32.0,
      overtime: 0,
      status: "rejected",
      submittedAt: "2023-12-25T14:20:00Z",
      issues: ["Incomplete timecard", "Missing supervisor approval"],
      dailyBreakdown: [
        { date: "2023-12-18", hours: 8.0, overtime: 0 },
        { date: "2023-12-19", hours: 8.0, overtime: 0 },
        { date: "2023-12-20", hours: 8.0, overtime: 0 },
        { date: "2023-12-21", hours: 8.0, overtime: 0 },
        { date: "2023-12-22", hours: 0, overtime: 0 },
      ],
    },
    {
      id: "5",
      weekEnding: "2023-12-18",
      totalHours: 45.0,
      regularHours: 40.0,
      overtime: 5.0,
      status: "rejected",
      submittedAt: "2023-12-18T17:30:00Z",
      issues: [
        "Overtime hours exceed company policy limit",
        "Missing break documentation for Wednesday",
        "Inconsistent clock-in/out times",
        "Project code not specified for overtime hours"
      ],
      dailyBreakdown: [
        { date: "2023-12-11", hours: 9.0, overtime: 1.0 },
        { date: "2023-12-12", hours: 8.0, overtime: 0 },
        { date: "2023-12-13", hours: 10.0, overtime: 2.0 },
        { date: "2023-12-14", hours: 9.0, overtime: 1.0 },
        { date: "2023-12-15", hours: 9.0, overtime: 1.0 },
      ],
    },
    {
      id: "6",
      weekEnding: "2023-12-11",
      totalHours: 40.0,
      regularHours: 40,
      overtime: 0,
      status: "approved",
      submittedAt: "2023-12-11T15:20:00Z",
      approvedAt: "2023-12-12T10:15:00Z",
      issues: [],
      dailyBreakdown: [
        { date: "2023-12-04", hours: 8.0, overtime: 0 },
        { date: "2023-12-05", hours: 8.0, overtime: 0 },
        { date: "2023-12-06", hours: 8.0, overtime: 0 },
        { date: "2023-12-07", hours: 8.0, overtime: 0 },
        { date: "2023-12-08", hours: 8.0, overtime: 0 },
      ],
    },
    {
      id: "7",
      weekEnding: "2023-12-04",
      totalHours: 37.5,
      regularHours: 37.5,
      overtime: 0,
      status: "approved",
      submittedAt: "2023-12-04T16:30:00Z",
      approvedAt: "2023-12-05T09:45:00Z",
      issues: [],
      dailyBreakdown: [
        { date: "2023-11-27", hours: 7.5, overtime: 0 },
        { date: "2023-11-28", hours: 8.0, overtime: 0 },
        { date: "2023-11-29", hours: 8.0, overtime: 0 },
        { date: "2023-11-30", hours: 8.0, overtime: 0 },
        { date: "2023-12-01", hours: 6.0, overtime: 0 },
      ],
    },
    {
      id: "8",
      weekEnding: "2023-11-27",
      totalHours: 35.0,
      regularHours: 35.0,
      overtime: 0,
      status: "pending",
      submittedAt: "2023-11-27T14:15:00Z",
      issues: ["Late submission", "Missing project codes"],
      dailyBreakdown: [
        { date: "2023-11-20", hours: 7.0, overtime: 0 },
        { date: "2023-11-21", hours: 7.0, overtime: 0 },
        { date: "2023-11-22", hours: 7.0, overtime: 0 },
        { date: "2023-11-23", hours: 0, overtime: 0 },
        { date: "2023-11-24", hours: 14.0, overtime: 0 },
      ],
    },
    {
      id: "9",
      weekEnding: "2023-11-20",
      totalHours: 43.0,
      regularHours: 40.0,
      overtime: 3.0,
      status: "approved",
      submittedAt: "2023-11-20T17:00:00Z",
      approvedAt: "2023-11-21T08:30:00Z",
      issues: [],
      dailyBreakdown: [
        { date: "2023-11-13", hours: 8.5, overtime: 0.5 },
        { date: "2023-11-14", hours: 8.0, overtime: 0 },
        { date: "2023-11-15", hours: 9.0, overtime: 1.0 },
        { date: "2023-11-16", hours: 8.0, overtime: 0 },
        { date: "2023-11-17", hours: 9.5, overtime: 1.5 },
      ],
    },
    {
      id: "10",
      weekEnding: "2023-11-13",
      totalHours: 39.0,
      regularHours: 39.0,
      overtime: 0,
      status: "rejected",
      submittedAt: "2023-11-13T18:45:00Z",
      issues: ["Invalid timecard format", "Missing supervisor signature"],
      dailyBreakdown: [
        { date: "2023-11-06", hours: 8.0, overtime: 0 },
        { date: "2023-11-07", hours: 8.0, overtime: 0 },
        { date: "2023-11-08", hours: 7.5, overtime: 0 },
        { date: "2023-11-09", hours: 8.0, overtime: 0 },
        { date: "2023-11-10", hours: 7.5, overtime: 0 },
      ],
    },
    {
      id: "11",
      weekEnding: "2023-11-06",
      totalHours: 41.5,
      regularHours: 40.0,
      overtime: 1.5,
      status: "approved",
      submittedAt: "2023-11-06T16:20:00Z",
      approvedAt: "2023-11-07T10:15:00Z",
      issues: [],
      dailyBreakdown: [
        { date: "2023-10-30", hours: 8.0, overtime: 0 },
        { date: "2023-10-31", hours: 8.0, overtime: 0 },
        { date: "2023-11-01", hours: 8.5, overtime: 0.5 },
        { date: "2023-11-02", hours: 8.0, overtime: 0 },
        { date: "2023-11-03", hours: 9.0, overtime: 1.0 },
      ],
    },
    {
      id: "12",
      weekEnding: "2023-10-30",
      totalHours: 36.0,
      regularHours: 36.0,
      overtime: 0,
      status: "draft",
      submittedAt: "2023-10-30T12:00:00Z",
      issues: [],
      dailyBreakdown: [
        { date: "2023-10-23", hours: 7.0, overtime: 0 },
        { date: "2023-10-24", hours: 7.5, overtime: 0 },
        { date: "2023-10-25", hours: 7.0, overtime: 0 },
        { date: "2023-10-26", hours: 7.5, overtime: 0 },
        { date: "2023-10-27", hours: 7.0, overtime: 0 },
      ],
    },
    {
      id: "13",
      weekEnding: "2023-10-23",
      totalHours: 44.0,
      regularHours: 40.0,
      overtime: 4.0,
      status: "approved",
      submittedAt: "2023-10-23T19:30:00Z",
      approvedAt: "2023-10-24T09:00:00Z",
      issues: [],
      dailyBreakdown: [
        { date: "2023-10-16", hours: 9.0, overtime: 1.0 },
        { date: "2023-10-17", hours: 8.5, overtime: 0.5 },
        { date: "2023-10-18", hours: 9.0, overtime: 1.0 },
        { date: "2023-10-19", hours: 8.0, overtime: 0 },
        { date: "2023-10-20", hours: 9.5, overtime: 1.5 },
      ],
    },
    {
      id: "14",
      weekEnding: "2023-10-16",
      totalHours: 38.0,
      regularHours: 38.0,
      overtime: 0,
      status: "pending",
      submittedAt: "2023-10-16T15:45:00Z",
      issues: ["Awaiting manager approval"],
      dailyBreakdown: [
        { date: "2023-10-09", hours: 7.5, overtime: 0 },
        { date: "2023-10-10", hours: 8.0, overtime: 0 },
        { date: "2023-10-11", hours: 7.5, overtime: 0 },
        { date: "2023-10-12", hours: 7.5, overtime: 0 },
        { date: "2023-10-13", hours: 7.5, overtime: 0 },
      ],
    },
    {
      id: "15",
      weekEnding: "2023-10-09",
      totalHours: 40.0,
      regularHours: 40.0,
      overtime: 0,
      status: "approved",
      submittedAt: "2023-10-09T17:15:00Z",
      approvedAt: "2023-10-10T08:45:00Z",
      issues: [],
      dailyBreakdown: [
        { date: "2023-10-02", hours: 8.0, overtime: 0 },
        { date: "2023-10-03", hours: 8.0, overtime: 0 },
        { date: "2023-10-04", hours: 8.0, overtime: 0 },
        { date: "2023-10-05", hours: 8.0, overtime: 0 },
        { date: "2023-10-06", hours: 8.0, overtime: 0 },
      ],
    },
  ]

  // Filter history based on search and status
  const filteredHistory = timecardHistory.filter((timecard) => {
    const matchesSearch = timecard.weekEnding.includes(searchTerm) || timecard.id.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || timecard.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Pagination logic
  const totalItems = filteredHistory.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedHistory = filteredHistory.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
    setCurrentPage(1)
  }

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(HistoryPageData())
  },[dispatch])
  const totalHoursAllTime = useAppSelector((state)=> state.user.historyPage.totalHours);
  const totalOvertimeAllTime = useAppSelector((state)=> state.user.historyPage.overtimeHours);
  const total = useAppSelector((state)=> state.user.historyPage.totalTimecards);
  const approvalrate = useAppSelector((state)=> state.user.historyPage.approvalRate)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="employee" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Timecard History</h1>
              <p className="text-gray-600">View your submitted timecards and their status</p>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <SummaryStats filteredHistory={total} totalHoursAllTime={totalHoursAllTime} totalOvertimeAllTime={totalOvertimeAllTime} approvalrate={approvalrate} />

        {/* Filters */}
        <Filter 
          searchTerm={searchTerm} 
          setSearchTerm={handleSearchChange} 
          statusFilter={statusFilter} 
          setStatusFilter={handleStatusFilterChange} 
          selectedPeriod={selectedPeriod} 
          setSelectedPeriod={handlePeriodChange} 
        />         

        {/* Timecard History List */}
        <TimecardHistoryList 
          filteredHistory={paginatedHistory} 
          getStatusIcon={getStatusIcon} 
          getStatusColor={getStatusColor} 
        />

        {/* Pagination */}
        {totalItems > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            itemsPerPageOptions={[5, 10, 20]}
          />
        )}

        <FirstTimecard filteredHistory={filteredHistory} />
      </div>
    </div>
  )
}
