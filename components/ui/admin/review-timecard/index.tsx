"use client"

import { useEffect, useState } from "react"
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
import Filters from "./filters"
import TimecardsList from "./TimecardsList"
import NoTimeCard from "./no-time-card"
import ExportTimeCard from "./export-time-card"
import { fetchTimeCards, updateTimeCardStatus } from "@/store/actions/admin-action"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

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

const TimecardReviewPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTimecard, setSelectedTimecard] = useState<Timecard | null>(null)
  const [reviewNotes, setReviewNotes] = useState("")

  // Mock timecard data
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(fetchTimeCards({ page: 1 }));
  },[dispatch])
  const timecards = useAppSelector((state) => state.admin.timeCardList);
  const filteredTimecards = timecards.filter((timecard) => {
    const matchesSearch =
      timecard.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timecard.user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      timecard.user.id.toString().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || timecard.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApprove = (timecardId: string) => {
    // Mock approval
    alert(`Timecard ${timecardId} approved`)
    dispatch(updateTimeCardStatus({ status: "approved" }, timecardId))

  }

  const handleReject = (timecardId: string) => {
    // Mock rejection
    alert(`Timecard ${timecardId} rejected with notes: ${reviewNotes}`)
    dispatch(updateTimeCardStatus({ status: "rejected" }, timecardId))
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

export default TimecardReviewPage;