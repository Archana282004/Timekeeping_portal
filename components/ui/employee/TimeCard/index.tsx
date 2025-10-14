"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, AlertTriangle, CheckCircle, Plus, Minus, Zap, FileText } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import TimeEntriesComponent from "./TimeEntriesCard"
import ComplianceCard from "./ComplianceCard"
import TotalHoursCard from "./TotalHoursCard"
import OvertimeCard from "./OvertimeCard"
import ComplianceAlert from "./ComplianceAlert"
import TimeEntriesCard from "./TimeEntriesCard"

interface TimeEntry {
  id: string
  date: string
  startTime: string
  endTime: string
  breakMinutes: number
  notes: string
}

interface BreakPeriod {
  id: string
  startTime: string
  endTime: string
  duration: number
}

export default function TimecardPage() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    {
      id: "1",
      date: new Date().toISOString().split("T")[0],
      startTime: "09:00",
      endTime: "17:30",
      breakMinutes: 60,
      notes: "",
    },
  ])

  const [breaks, setBreaks] = useState<BreakPeriod[]>([{ id: "1", startTime: "12:00", endTime: "13:00", duration: 60 }])

  const addTimeEntry = () => {
    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      startTime: "09:00",
      endTime: "17:00",
      breakMinutes: 30,
      notes: "",
    }
    setTimeEntries([...timeEntries, newEntry])
  }

  const updateTimeEntry = (id: string, field: keyof TimeEntry, value: string | number) => {
    setTimeEntries((entries) => entries.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)))
  }

  const removeTimeEntry = (id: string) => {
    setTimeEntries((entries) => entries.filter((entry) => entry.id !== id))
  }

  const addBreak = () => {
    const newBreak: BreakPeriod = {
      id: Date.now().toString(),
      startTime: "12:00",
      endTime: "12:30",
      duration: 30,
    }
    setBreaks([...breaks, newBreak])
  }

  const updateBreak = (id: string, field: keyof BreakPeriod, value: string | number) => {
    setBreaks((breakPeriods) =>
      breakPeriods.map((breakPeriod) => (breakPeriod.id === id ? { ...breakPeriod, [field]: value } : breakPeriod)),
    )
  }

  const removeBreak = (id: string) => {
    setBreaks((breakPeriods) => breakPeriods.filter((breakPeriod) => breakPeriod.id !== id))
  }

  const calculateHours = (startTime: string, endTime: string, breakMinutes: number) => {
    const start = new Date(`2000-01-01T${startTime}:00`)
    const end = new Date(`2000-01-01T${endTime}:00`)
    const diffMs = end.getTime() - start.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)
    return Math.max(0, diffHours - breakMinutes / 60)
  }

  const getTotalHours = () => {
    return timeEntries.reduce((total, entry) => {
      return total + calculateHours(entry.startTime, entry.endTime, entry.breakMinutes)
    }, 0)
  }

  const getOvertimeHours = () => {
    const totalHours = getTotalHours()
    return Math.max(0, totalHours - 40) // Weekly overtime
  }

  const getComplianceIssues = () => {
    const issues: string[] = []

    timeEntries.forEach((entry, index) => {
      const dailyHours = calculateHours(entry.startTime, entry.endTime, entry.breakMinutes)

      // Check daily overtime (8+ hours)
      if (dailyHours > 8) {
        issues.push(`Day ${index + 1}: ${dailyHours.toFixed(1)} hours exceeds 8-hour daily limit`)
      }

      // Check break requirements
      if (dailyHours > 5 && entry.breakMinutes < 30) {
        issues.push(`Day ${index + 1}: Missing required 30-minute meal break for ${dailyHours.toFixed(1)}-hour shift`)
      }

      if (dailyHours > 10 && entry.breakMinutes < 60) {
        issues.push(`Day ${index + 1}: Missing second meal break for ${dailyHours.toFixed(1)}-hour shift`)
      }
    })

    // Check weekly overtime
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

    // Mock submission
    alert("Timecard submitted successfully!")
  }

  const totalHours = getTotalHours()
  const overtimeHours = getOvertimeHours()
  const complianceIssues = getComplianceIssues()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="employee" />

      <div className="container mx-auto px-4 py-8 pb-24">
        <div className="mb-8">
          <div className="flex items-center justify-between">
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
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <TotalHoursCard totalHours={totalHours} />
          <OvertimeCard overtimeHours={overtimeHours} />
          <ComplianceCard complianceIssues={complianceIssues} />
        </div>

        {/* Compliance Alerts */}
        <ComplianceAlert complianceIssues={complianceIssues} />
        <TimeEntriesCard timeEntries={timeEntries} addTimeEntry={addTimeEntry} updateTimeEntry={updateTimeEntry} removeTimeEntry={removeTimeEntry} />
        

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline">Save Draft</Button>
          <Button onClick={handleSubmit} disabled={complianceIssues.length > 0}>
            Submit Timecard
          </Button>
        </div>
      </div>
    </div>
  )
}
