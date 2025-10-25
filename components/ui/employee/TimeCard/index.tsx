"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import TimeEntriesCard from "./TimeEntriesCard"
import ComplianceCard from "./ComplianceCard"
import TotalHoursCard from "./TotalHoursCard"
import OvertimeCard from "./OvertimeCard"
import ComplianceAlert from "./ComplianceAlert"
import { Zap, FileText } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchMyWeekTimecards, todayStatus } from "@/store/actions/userAction"

interface TimeEntry {
  date: string
  startTime: string
  endTime: string
  breakMinutes: number
  notes: string
}

export interface DailyEntry {
  id: number
  date: string // ISO date string (e.g., "2025-10-14T00:00:00.000Z")
  startTime: string // e.g., "09:30"
  endTime: string // e.g., "18:00"
  breakMinutes: number
  hours: number
  notes: string
  timecardId: number
  createdAt: string
  updatedAt: string
}

export interface Timecard {
  id: number
  userId: number
  weekEnding: string
  totalHours: number
  regularHours: number
  overtime: number
  status: "pending" | "approved" | "rejected" // restricts to known values
  submittedAt: string
  issues: string[] // empty or list of issue messages
  createdAt: string
  updatedAt: string
  dailyEntries: DailyEntry[]
}
export interface timecard {
  timecard: Timecard;
} 

export default function TimecardPage() {
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(todayStatus())
  },[])
  const timeEntries= useAppSelector((state) =>
    state.user.todayStatus ? [state.user.todayStatus] : []
  )
    useEffect(() => {
      dispatch(fetchMyWeekTimecards({ "weekEnding": "2025-10-19" }));
    }, [dispatch])
  
    const weekEntries = useAppSelector(
    (state: any) => state.user.getmyweektimecards
  ) as timecard | null;
  const [breaks, setBreaks] = useState([
    { id: "1", startTime: "12:00", endTime: "13:00", duration: 60 },
  ])

  const addBreak = () => {
    const newBreak = {
      id: Date.now().toString(),
      startTime: "12:00",
      endTime: "12:30",
      duration: 30,
    }
    setBreaks([...breaks, newBreak])
  }


  const updateBreak = (id: string, field: keyof typeof breaks[0], value: string | number) => {
    setBreaks((breakPeriods) =>
      breakPeriods.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    )
  }

  const removeBreak = (id: string) => {
    setBreaks((breakPeriods) => breakPeriods.filter((b) => b.id !== id))
  }

  // Hours calculation
  const calculateHours = (startTime: string, endTime: string, breakMinutes: number) => {
    const start = new Date(`2000-01-01T${startTime}:00`)
    const end = new Date(`2000-01-01T${endTime}:00`)
    const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    return Math.max(0, diffHours - breakMinutes / 60)
  }

  const getTotalHours = () =>(
    weekEntries?.timecard?.totalHours || 0
    )

  const getOvertimeHours = () => (
    weekEntries?.timecard?.overtime || 0
  )

  const getComplianceIssues = () => {
    const issues: string[] = []

    timeEntries.forEach((entry, index) => {
      const dailyHours = calculateHours(entry[0]?.startTime, entry[0]?.endTime, entry[0]?.breakMinutes)

      if (dailyHours > 8) {
        issues.push(`Day ${index + 1}: ${dailyHours.toFixed(1)} hours exceeds 8-hour daily limit`)
      }

      if (dailyHours > 5 && entry[0]?.breakMinutes < 30) {
        issues.push(
          `Day ${index + 1}: Missing required 30-minute meal break for ${dailyHours.toFixed(
            1
          )}-hour shift`
        )
      }

      if (dailyHours > 10 && entry[0]?.breakMinutes < 60) {
        issues.push(
          `Day ${index + 1}: Missing second meal break for ${dailyHours.toFixed(1)}-hour shift`
        )
      }
    })

    const totalHours = getTotalHours()
    if (totalHours > 40) {
      issues.push(`Weekly total: ${totalHours.toFixed(1)} hours exceeds 40-hour weekly limit`)
    }

    return issues
  }

  const handleSubmit = () => {
    const issues = getComplianceIssues()
    if (issues.length > 0) {
      alert("Please resolve compliance issues before submitting")
      return
    }

    alert("Timecard submitted successfully!")
  }

  const totalHours = getTotalHours()
  const overtimeHours = getOvertimeHours()
  const complianceIssues = getComplianceIssues()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="employee" />

      <div className="container mx-auto px-4 py-8 pb-24">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Submit Timecard</h1>
            <p className="text-gray-600">Enter your working hours for the week</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/employee-timecard-quickview">
              <Button variant="outline" size="sm">
                <Zap className="mr-2 h-4 w-4" />
                Quick
              </Button>
            </Link>
            <Link href="/employee-timecard-standardview">
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Standard
              </Button>
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <TotalHoursCard totalHours={totalHours} />
          <OvertimeCard overtimeHours={overtimeHours} />
          <ComplianceCard complianceIssues={complianceIssues} />
        </div>

        {/* Compliance Alerts */}
        <ComplianceAlert complianceIssues={complianceIssues} />

        {/* Time Entries */}
        <TimeEntriesCard
          timeEntries={timeEntries}
          addTimeEntry={todayStatus}
          updateTimeEntry={() => {}}
          removeTimeEntry={() => {}}
        />

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline">Save Draft</Button>
          <Button onClick={handleSubmit} disabled={complianceIssues.length > 0}>
            Submit Timecard
          </Button>
        </div>
      </div>
    </div>
  )
}