"use client"

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "../../../dialog"
import { Button } from "../../../button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../card"
import { Badge } from "../../../badge"
import { Alert, AlertDescription } from "../../../alert"
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Edit3
} from "lucide-react"

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

interface ViewTimecardModalProps {
  isOpen: boolean
  onClose: () => void
  timecard: Timecard | null
  onEdit?: (timecard: Timecard) => void
}

const ViewTimecardModal = ({ 
  isOpen, 
  onClose, 
  timecard,
  onEdit
}: ViewTimecardModalProps) =>{
  if (!timecard) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Timecard Details - Week Ending {timecard.weekEnding}
              </DialogTitle>
              <DialogDescription>
                View your timecard details and status
              </DialogDescription>
            </div>
            {onEdit && timecard.status === "rejected" && (
              <Button
                onClick={() => onEdit(timecard)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Edit & Resubmit
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Issues */}
          <div className="flex items-center gap-4">
            <Badge variant={
              timecard.status === "approved" ? "default" : 
              timecard.status === "rejected" ? "destructive" : 
              "secondary"
            }>
              {timecard.status}
            </Badge>
            {timecard.issues.length > 0 && (
              <Alert className="flex-1">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Issues found:</strong> {timecard.issues.join(", ")}
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
                <div className="text-2xl font-bold">{timecard.totalHours}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Regular Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{timecard.regularHours}h</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Overtime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{timecard.overtime}h</div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {timecard.dailyBreakdown.map((day, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium text-sm text-gray-600 mb-2">
                      {new Date(day.date).toLocaleDateString("en-US", { 
                        weekday: "short",
                        month: "short", 
                        day: "numeric" 
                      })}
                    </div>
                    <div className="text-lg font-bold">{day.hours}h</div>
                    {day.overtime > 0 && (
                      <div className="text-sm text-orange-600 mt-1">
                        +{day.overtime}h overtime
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submission Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Submission Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Submitted:</span>
                <span>{new Date(timecard.submittedAt).toLocaleDateString()}</span>
              </div>
              {timecard.approvedAt && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Approved:</span>
                  <span className="text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    {new Date(timecard.approvedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
              {timecard.status === "rejected" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Timecard Rejected</p>
                      <p className="text-sm text-red-700 mt-1">
                        Please review the issues above and resubmit your timecard.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {onEdit && timecard.status === "rejected" && (
            <Button onClick={() => onEdit(timecard)} className="flex items-center gap-2">
              <Edit3 className="h-4 w-4" />
              Edit & Resubmit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ViewTimecardModal;