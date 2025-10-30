import { Card, CardContent } from "../../card"
import { Badge } from "../../badge"
import { Button } from "../../button"
import { Eye, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import ResubmitTimecardModal from "./resubmit-timecard-modal"
import ViewTimecardModal from "./view-timecard-modal"

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

export default function TimecardHistoryList({
  filteredHistory,
  getStatusIcon,
  getStatusColor
}: {
  filteredHistory: Timecard[],
  getStatusIcon: (status: string) => React.ReactNode,
  getStatusColor: (status: string) => string
}) {
  const [selectedTimecard, setSelectedTimecard] = useState<Timecard | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isResubmitModalOpen, setIsResubmitModalOpen] = useState(false)

  const handleResubmit = (timecardId: string, updatedEntries: TimeEntry[]) => {
    // Here you would typically make an API call to resubmit the timecard
    console.log("Resubmitting timecard:", timecardId, updatedEntries)
    // For now, just close the modal
    setIsResubmitModalOpen(false)
    setSelectedTimecard(null)
  }

  const openViewModal = (timecard: Timecard) => {
    setSelectedTimecard(timecard)
    setIsViewModalOpen(true)
  }

  const openResubmitModal = (timecard: Timecard) => {
    setSelectedTimecard(timecard)
    setIsResubmitModalOpen(true)
  }

  const closeViewModal = () => {
    setIsViewModalOpen(false)
    setSelectedTimecard(null)
  }

  const closeResubmitModal = () => {
    setIsResubmitModalOpen(false)
    setSelectedTimecard(null)
  }

  const handleEditFromView = (timecard: Timecard) => {
    setIsViewModalOpen(false)
    openResubmitModal(timecard)
  }

  return (
    <>
      <div className="space-y-4">
        {filteredHistory.map((timecard) => (
          <Card key={timecard.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(timecard.status)}
                    <h3 className="font-semibold">Week Ending {timecard.weekEnding}</h3>
                    <Badge className={getStatusColor(timecard.status)}>{timecard.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Hours</p>
                      <p className="font-medium text-lg">{timecard.totalHours}h</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Regular Hours</p>
                      <p className="font-medium">{timecard.regularHours}h</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Overtime</p>
                      <p className="font-medium text-orange-600">{timecard.overtime}h</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Submitted</p>
                      <p className="font-medium text-sm">{new Date(timecard.submittedAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Daily Breakdown - Mobile Optimized */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Daily Breakdown:</p>
                    <div className="grid grid-cols-5 gap-1 md:gap-2">
                      {timecard.dailyBreakdown.map((day, index) => (
                        <div key={index} className="text-center p-2 bg-gray-50 rounded text-xs">
                          <div className="font-medium">
                            {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                          </div>
                          <div className="text-gray-600">{day.hours}h</div>
                          {day.overtime > 0 && <div className="text-orange-600 text-xs">+{day.overtime}h</div>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {timecard.issues.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-800">Issues Found:</p>
                          <ul className="text-sm text-red-700 mt-1 space-y-1">
                            {timecard.issues.map((issue, index) => (
                              <li key={index}>• {issue}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {timecard.approvedAt && (
                    <div className="text-sm text-green-600 mt-2">
                      ✓ Approved on {new Date(timecard.approvedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openViewModal(timecard)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">View Details</span>
                    <span className="sm:hidden">View</span>
                  </Button>
                  {timecard.status === "draft" && (
                    <Link href={`/timecard/edit/${timecard.id}`}>
                      <Button size="sm" className="w-full">
                        Continue
                      </Button>
                    </Link>
                  )}
                  {timecard.status === "rejected" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => openResubmitModal(timecard)}
                    >
                      Resubmit
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ViewTimecardModal
        isOpen={isViewModalOpen}
        onClose={closeViewModal}
        timecard={selectedTimecard}
        onEdit={handleEditFromView}
      />

      <ResubmitTimecardModal
        isOpen={isResubmitModalOpen}
        onClose={closeResubmitModal}
        timecard={selectedTimecard}
        onResubmit={handleResubmit}
      />
    </>
  )
}
