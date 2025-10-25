"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Clock, CheckCircle, AlertTriangle, ArrowRight, Calendar } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchMyWeekTimecards } from "@/store/actions/userAction"

interface DayEntry {
  date: string
  clockIn: string
  clockOut: string
  breakMinutes: number
  isComplete: boolean
  hours: number
  overtime: number
  notes: string
}

// TypeScript interfaces for Timecard and DailyEntry

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


export default function QuickTimecardPage() {
  const [currentWeek, setCurrentWeek] = useState<DayEntry[]>([])
  const [selectedDay, setSelectedDay] = useState<number>(0)
  const [weekNotes, setWeekNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useAppDispatch();
 const today = new Date().toISOString().split("T")[0]
  useEffect(() => {
    dispatch(fetchMyWeekTimecards({ "weekEnding": "2025-10-19" }));
  }, [dispatch])

  const weekTimecards = useAppSelector(
  (state: any) => state.user.getmyweektimecards
) as timecard | null

useEffect(() => {
  const dailyEntries = weekTimecards?.timecard?.dailyEntries
  if (!dailyEntries?.length) return

  const weekData = dailyEntries.map((entry) => ({
    date: entry.date,
    clockIn: entry.startTime,
    clockOut: entry.endTime,
    breakMinutes: entry.breakMinutes,
    isComplete: !!entry.startTime && !!entry.endTime,
    hours: entry.hours,
    overtime: Math.max(0, entry.hours - 8),
    notes: entry.notes,
  }))

  setCurrentWeek(weekData)
}, [weekTimecards])


  const calculateHours = (clockIn: string, clockOut: string, breakMinutes: number) => {
    if (!clockIn || !clockOut) return 0
    const start = new Date(`2000-01-01T${clockIn}:00`)
    const end = new Date(`2000-01-01T${clockOut}:00`)
    const diffMs = end.getTime() - start.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)
    return Math.max(0, diffHours - breakMinutes / 60)
  }

  const updateDayEntry = (dayIndex: number, field: keyof DayEntry, value: string | number) => {
    const updatedWeek = [...currentWeek]
    updatedWeek[dayIndex] = { ...updatedWeek[dayIndex], [field]: value }

    if (field === "clockIn" || field === "clockOut" || field === "breakMinutes") {
      const hours = calculateHours(
        updatedWeek[dayIndex].clockIn,
        updatedWeek[dayIndex].clockOut,
        updatedWeek[dayIndex].breakMinutes,
      )
      updatedWeek[dayIndex].hours = hours
      updatedWeek[dayIndex].overtime = Math.max(0, hours - 8)
    }

    setCurrentWeek(updatedWeek)
  }

  const getTotalHours = () => currentWeek.reduce((sum, day) => sum + day.hours, 0)
  const getTotalOvertime = () => currentWeek.reduce((sum, day) => sum + day.overtime, 0)

  const getComplianceIssues = () => {
    const issues: string[] = []
    const totalWeeklyHours = getTotalHours()

    if (totalWeeklyHours > 40) {
      issues.push(`Weekly total: ${totalWeeklyHours.toFixed(1)} hours exceeds 40-hour limit`)
    }

    currentWeek.forEach((day, index) => {
      if (day.hours > 5 && day.breakMinutes < 30) {
        issues.push(`${getDayName(index)}: Missing required 30-minute meal break`)
      }
      if (day.hours > 10 && day.breakMinutes < 60) {
        issues.push(`${getDayName(index)}: Missing second meal break for 10+ hour shift`)
      }
      if (day.hours > 8) {
        issues.push(`${getDayName(index)}: ${day.hours.toFixed(1)} hours exceeds 8-hour daily limit`)
      }
    })

    return issues
  }

  const getDayName = (index: number) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days[index]
  }

  const handleQuickFill = () => {
    const updatedWeek = currentWeek.map((day, index) => {
      if (index >= 1 && index <= 5) {
        return {
          ...day,
          clockIn: "09:00",
          clockOut: "17:00",
          breakMinutes: 60,
          hours: 7,
          overtime: 0,
          isComplete: true,
        }
      }
      return day
    })
    setCurrentWeek(updatedWeek)
  }

  const handleSubmit = async () => {
    const issues = getComplianceIssues()
    if (issues.length > 0) {
      alert("Please resolve compliance issues before submitting")
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    alert("Timecard submitted successfully!")
    setIsSubmitting(false)
  }

  const complianceIssues = getComplianceIssues()
  const totalHours = getTotalHours()
  const totalOvertime = getTotalOvertime()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="employee" />

      <div className="container mx-auto px-4 py-8 pb-24">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Quick Timecard</h1>
              <p className="text-gray-600">Fast weekly time entry</p>
            </div>
            <div className="flex space-x-2">
              <Link href="/employee-timecard-standardview">
                <Button variant="outline" size="sm">
                  Standard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalHours.toFixed(1)}h</div>
                <div className="text-xs text-gray-600">Total Hours</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{totalOvertime.toFixed(1)}h</div>
                <div className="text-xs text-gray-600">Overtime</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {complianceIssues.length === 0 ? (
                    <CheckCircle className="h-6 w-6 text-green-600 mx-auto" />
                  ) : (
                    <span className="text-red-600">{complianceIssues.length}</span>
                  )}
                </div>
                <div className="text-xs text-gray-600">{complianceIssues.length === 0 ? "Compliant" : "Issues"}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Fill Option */}
        <Card className="mb-6">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Standard Work Week</h3>
                <p className="text-sm text-gray-600">9 AM - 5 PM, Monday to Friday with 1-hour lunch</p>
              </div>
              <Button onClick={handleQuickFill} variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                Quick Fill
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Alerts */}
        {complianceIssues.length > 0 && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription>
              <div className="font-medium text-red-800 mb-2">Compliance Issues:</div>
              <ul className="list-disc list-inside space-y-1 text-red-700 text-sm">
                {complianceIssues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Weekly Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Week Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {currentWeek.map((day, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedDay === index ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  onClick={() => setSelectedDay(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h4 className="font-medium">{getDayName(index)}</h4>
                          <p className="text-sm text-gray-600">{new Date(day.date).toLocaleDateString()}</p>
                        </div>
                        {day.isComplete && <CheckCircle className="h-4 w-4 text-green-600" />}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="text-center">
                        <div className="font-medium">{day.clockIn || "--"}</div>
                        <div className="text-gray-500">In</div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <div className="text-center">
                        <div className="font-medium">{day.clockOut || "--"}</div>
                        <div className="text-gray-500">Out</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{day.hours.toFixed(1)}h</div>
                        <div className="text-gray-500">Total</div>
                      </div>
                      {day.overtime > 0 && (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          +{day.overtime.toFixed(1)}h OT
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Day Detail Editor */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              Edit {getDayName(selectedDay)} - {new Date(currentWeek[selectedDay]?.date).toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Clock In</label>
                <input
                  type="time"
                  value={currentWeek[selectedDay]?.clockIn || ""}
                  onChange={(e) => updateDayEntry(selectedDay, "clockIn", e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Clock Out</label>
                <input
                  type="time"
                  value={currentWeek[selectedDay]?.clockOut || ""}
                  onChange={(e) => updateDayEntry(selectedDay, "clockOut", e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Break (minutes)</label>
                <input
                  type="number"
                  min="0"
                  max="480"
                  value={currentWeek[selectedDay]?.breakMinutes || 0}
                  onChange={(e) => updateDayEntry(selectedDay, "breakMinutes", Number.parseInt(e.target.value) || 0)}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Total Hours</label>
                <div className="w-full p-2 bg-gray-50 border rounded-md font-medium">
                  {currentWeek[selectedDay]?.hours.toFixed(1) || "0.0"}h
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Notes (optional)</label>
              <Textarea
                placeholder="Add any notes for this day..."
                value={currentWeek[selectedDay]?.notes || ""}
                onChange={(e) => updateDayEntry(selectedDay, "notes", e.target.value)}
                rows={2}
              />
            </div>

            {/* Quick Time Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  updateDayEntry(selectedDay, "clockIn", "09:00")
                  updateDayEntry(selectedDay, "clockOut", "17:00")
                  updateDayEntry(selectedDay, "breakMinutes", 60)
                }}
              >
                Standard Day (9-5)
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  updateDayEntry(selectedDay, "clockIn", "08:00")
                  updateDayEntry(selectedDay, "clockOut", "16:00")
                  updateDayEntry(selectedDay, "breakMinutes", 60)
                }}
              >
                Early Shift (8-4)
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  updateDayEntry(selectedDay, "clockIn", "")
                  updateDayEntry(selectedDay, "clockOut", "")
                  updateDayEntry(selectedDay, "breakMinutes", 0)
                }}
              >
                Day Off
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Week Notes */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Week Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add any notes for the entire week..."
              value={weekNotes}
              onChange={(e) => setWeekNotes(e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Submit Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="flex-1 bg-transparent">
            Save Draft
          </Button>
          <Button onClick={handleSubmit} disabled={complianceIssues.length > 0 || isSubmitting} className="flex-1">
            {isSubmitting ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Submit Timecard
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
