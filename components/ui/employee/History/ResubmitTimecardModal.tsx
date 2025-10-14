"use client"

import { useState, useEffect } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "../../dialog"
import { Button } from "../../button"
import { Card, CardContent, CardHeader, CardTitle } from "../../card"
import { Input } from "../../input"
import { Label } from "../../label"
import { Textarea } from "../../textarea"
import { Badge } from "../../badge"
import { Alert, AlertDescription } from "../../alert"
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Edit3, 
  Eye,
  Save,
  X
} from "lucide-react"

interface TimeEntry {
  id: string
  date: string
  startTime: string
  endTime: string
  breakMinutes: number
  notes: string
}

interface Timecard {
  id: string
  weekEnding: string
  totalHours: number
  regularHours: number
  overtime: number
  status: string
  issues: string[]
  dailyBreakdown: Array<{
    date: string
    hours: number
    overtime: number
  }>
  submittedAt: string
  approvedAt?: string
}

interface ResubmitTimecardModalProps {
  isOpen: boolean
  onClose: () => void
  timecard: Timecard | null
  onResubmit: (timecardId: string, updatedEntries: TimeEntry[]) => void
}

export default function ResubmitTimecardModal({ 
  isOpen, 
  onClose, 
  timecard, 
  onResubmit 
}: ResubmitTimecardModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (timecard) {
      // Convert dailyBreakdown to TimeEntry format for editing
      const entries: TimeEntry[] = timecard.dailyBreakdown.map((day, index) => ({
        id: `entry-${index}`,
        date: day.date,
        startTime: "09:00", // Default values - in real app, these would come from API
        endTime: "17:30",
        breakMinutes: 30,
        notes: ""
      }))
      setTimeEntries(entries)
      setHasChanges(false)
    }
  }, [timecard])

  const calculateHours = (startTime: string, endTime: string, breakMinutes: number) => {
    const start = new Date(`1970-01-01T${startTime}`)
    const end = new Date(`1970-01-01T${endTime}`)
    const diffMs = end.getTime() - start.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)
    return Math.max(0, diffHours - breakMinutes / 60)
  }

  const updateTimeEntry = (id: string, field: keyof TimeEntry, value: string | number) => {
    setTimeEntries(entries => 
      entries.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    )
    setHasChanges(true)
  }

  const getTotalHours = () => {
    return timeEntries.reduce((total, entry) => {
      return total + calculateHours(entry.startTime, entry.endTime, entry.breakMinutes)
    }, 0)
  }

  const getRegularHours = () => {
    return Math.min(getTotalHours(), 40)
  }

  const getOvertimeHours = () => {
    return Math.max(0, getTotalHours() - 40)
  }

  const handleSave = () => {
    if (timecard && hasChanges) {
      onResubmit(timecard.id, timeEntries)
      setIsEditing(false)
      setHasChanges(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setHasChanges(false)
    // Reset to original data
    if (timecard) {
      const entries: TimeEntry[] = timecard.dailyBreakdown.map((day, index) => ({
        id: `entry-${index}`,
        date: day.date,
        startTime: "09:00",
        endTime: "17:30",
        breakMinutes: 30,
        notes: ""
      }))
      setTimeEntries(entries)
    }
  }

  if (!timecard) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Resubmit Timecard - Week Ending {timecard.weekEnding}
              </DialogTitle>
              <DialogDescription>
                Review and edit your timecard details before resubmitting
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    variant="default"
                    size="sm"
                    disabled={!hasChanges}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Issues */}
          <div className="flex items-center gap-4">
            <Badge variant={timecard.status === "rejected" ? "destructive" : "secondary"}>
              {timecard.status}
            </Badge>
            {timecard.issues.length > 0 && (
              <Alert className="flex-1">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Issues to address:</strong> {timecard.issues.join(", ")}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getTotalHours().toFixed(1)}h</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Regular Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getRegularHours().toFixed(1)}h</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Overtime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{getOvertimeHours().toFixed(1)}h</div>
              </CardContent>
            </Card>
          </div>

          {/* Time Entries */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Daily Time Entries</CardTitle>
                  <p className="text-sm text-gray-600">
                    {isEditing ? "Edit your time entries below" : "View your time entries"}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {timeEntries.map((entry, index) => (
                <div key={entry.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Day {index + 1}</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`date-${entry.id}`}>Date</Label>
                      <Input
                        id={`date-${entry.id}`}
                        type="date"
                        value={entry.date}
                        onChange={(e) => updateTimeEntry(entry.id, "date", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`start-${entry.id}`}>Start Time</Label>
                      <Input
                        id={`start-${entry.id}`}
                        type="time"
                        value={entry.startTime}
                        onChange={(e) => updateTimeEntry(entry.id, "startTime", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`end-${entry.id}`}>End Time</Label>
                      <Input
                        id={`end-${entry.id}`}
                        type="time"
                        value={entry.endTime}
                        onChange={(e) => updateTimeEntry(entry.id, "endTime", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`break-${entry.id}`}>Break (minutes)</Label>
                      <Input
                        id={`break-${entry.id}`}
                        type="number"
                        value={entry.breakMinutes}
                        onChange={(e) => updateTimeEntry(entry.id, "breakMinutes", parseInt(e.target.value) || 0)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`notes-${entry.id}`}>Notes</Label>
                    <Textarea
                      id={`notes-${entry.id}`}
                      value={entry.notes}
                      onChange={(e) => updateTimeEntry(entry.id, "notes", e.target.value)}
                      placeholder="Add any notes for this day..."
                      disabled={!isEditing}
                      rows={2}
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm text-gray-600">
                      Calculated Hours: <strong>{calculateHours(entry.startTime, entry.endTime, entry.breakMinutes).toFixed(1)}h</strong>
                    </span>
                    {calculateHours(entry.startTime, entry.endTime, entry.breakMinutes) > 8 && (
                      <Badge variant="outline" className="text-orange-600">
                        Overtime: +{(calculateHours(entry.startTime, entry.endTime, entry.breakMinutes) - 8).toFixed(1)}h
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Submission Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Submission Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Originally Submitted:</span>
                <span>{new Date(timecard.submittedAt).toLocaleDateString()}</span>
              </div>
              {timecard.approvedAt && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Approved:</span>
                  <span className="text-green-600">{new Date(timecard.approvedAt).toLocaleDateString()}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {isEditing && hasChanges && (
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save & Resubmit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
