"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, X, AlertTriangle, Search, Download, Eye } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Filters from "./Filters"
import TimecardsList from "./TimecardsList"
import NoTimeCard from "./NoTimeCard"
import ExportTimeCard from "./ExportTimeCard"

interface Timecard {
  id: string
  employee: string
  employeeId: string
  department: string
  weekEnding: string
  totalHours: number
  regularHours: number
  overtime: number
  status: "pending" | "approved" | "rejected" | "flagged"
  issues: string[]
  dailyEntries: {
    date: string
    startTime: string
    endTime: string
    breakMinutes: number
    hours: number
    notes: string
  }[]
  submittedAt: string
}

export default function TimecardReviewPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTimecard, setSelectedTimecard] = useState<Timecard | null>(null)
  const [reviewNotes, setReviewNotes] = useState("")

  // Mock timecard data
  const timecards: Timecard[] = [
    {
      id: "1",
      employee: "John Doe",
      employeeId: "EMP001",
      department: "Engineering",
      weekEnding: "2024-01-15",
      totalHours: 42.5,
      regularHours: 40,
      overtime: 2.5,
      status: "pending",
      
      issues: ["Missing meal break on Tuesday", "Late clock-in on Wednesday"],
      dailyEntries: [
        { date: "2024-01-08", startTime: "09:00", endTime: "17:30", breakMinutes: 30, hours: 8.0, notes: "" },
        {
          date: "2024-01-09",
          startTime: "09:15",
          endTime: "17:45",
          breakMinutes: 30,
          hours: 8.0,
          notes: "Traffic delay",
        },
        {
          date: "2024-01-10",
          startTime: "09:00",
          endTime: "18:00",
          breakMinutes: 15,
          hours: 8.75,
          notes: "Project deadline",
        },
        { date: "2024-01-11", startTime: "09:00", endTime: "17:30", breakMinutes: 30, hours: 8.0, notes: "" },
        {
          date: "2024-01-12",
          startTime: "09:00",
          endTime: "19:00",
          breakMinutes: 60,
          hours: 9.0,
          notes: "Client meeting",
        },
      ],
      submittedAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      employee: "Jane Smith",
      employeeId: "EMP002",
      department: "Marketing",
      weekEnding: "2024-01-15",
      totalHours: 40.0,
      regularHours: 40,
      overtime: 0,
      status: "approved",
      issues: [],
      dailyEntries: [
        { date: "2024-01-08", startTime: "09:00", endTime: "17:00", breakMinutes: 60, hours: 7.0, notes: "" },
        { date: "2024-01-09", startTime: "09:00", endTime: "17:00", breakMinutes: 60, hours: 7.0, notes: "" },
        { date: "2024-01-10", startTime: "09:00", endTime: "17:00", breakMinutes: 60, hours: 7.0, notes: "" },
        { date: "2024-01-11", startTime: "09:00", endTime: "17:00", breakMinutes: 60, hours: 7.0, notes: "" },
        {
          date: "2024-01-12",
          startTime: "09:00",
          endTime: "21:00",
          breakMinutes: 60,
          hours: 11.0,
          notes: "Campaign launch",
        },
      ],
      submittedAt: "2024-01-15T09:15:00Z",
    },
    {
      id: "3",
      employee: "Mike Johnson",
      employeeId: "EMP003",
      department: "Sales",
      weekEnding: "2024-01-15",
      totalHours: 45.0,
      regularHours: 40,
      overtime: 5.0,
      status: "flagged",
      issues: ["Excessive overtime", "No second meal break on Friday"],
      dailyEntries: [
        {
          date: "2024-01-08",
          startTime: "08:00",
          endTime: "18:00",
          breakMinutes: 60,
          hours: 9.0,
          notes: "Client calls",
        },
        {
          date: "2024-01-09",
          startTime: "08:00",
          endTime: "18:00",
          breakMinutes: 60,
          hours: 9.0,
          notes: "Sales meetings",
        },
        { date: "2024-01-10", startTime: "08:00", endTime: "17:00", breakMinutes: 60, hours: 8.0, notes: "" },
        { date: "2024-01-11", startTime: "08:00", endTime: "17:00", breakMinutes: 60, hours: 8.0, notes: "" },
        {
          date: "2024-01-12",
          startTime: "08:00",
          endTime: "20:00",
          breakMinutes: 60,
          hours: 11.0,
          notes: "Quarter-end push",
        },
      ],
      submittedAt: "2024-01-15T11:45:00Z",
    },
  ]

  const filteredTimecards = timecards.filter((timecard) => {
    const matchesSearch =
      timecard.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timecard.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timecard.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || timecard.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApprove = (timecardId: string) => {
    // Mock approval
    alert(`Timecard ${timecardId} approved`)
  }

  const handleReject = (timecardId: string) => {
    // Mock rejection
    alert(`Timecard ${timecardId} rejected with notes: ${reviewNotes}`)
    setReviewNotes("")
  }

  const handleFlag = (timecardId: string) => {
    // Mock flagging
    alert(`Timecard ${timecardId} flagged for review`)
  }

  const exportTimecards = () => {
    // Mock export
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "flagged":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="admin" />

      <div className="container mx-auto px-4 py-8">
        <ExportTimeCard exportTimecards={exportTimecards} />

        {/* Filters */}
        <Filters searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

        {/* Timecards List */}
        <TimecardsList filteredTimecards={filteredTimecards} handleApprove={handleApprove} handleReject={handleReject} handleFlag={handleFlag} reviewNotes={reviewNotes} setReviewNotes={setReviewNotes} selectedTimecard={selectedTimecard} setSelectedTimecard={setSelectedTimecard} />

        <NoTimeCard filteredTimecards={filteredTimecards} />
      </div>
    </div>
  )
}
