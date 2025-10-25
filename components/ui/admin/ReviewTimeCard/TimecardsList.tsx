"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "../../card"
import { Badge } from "../../badge"
import { Alert, AlertDescription } from "../../alert"
import { AlertTriangle } from "lucide-react"
import { CheckCircle, X, Eye } from "lucide-react"
import { Button } from "../../button"
import { Textarea } from "../../textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../alert-dialog"
import { Pagination } from "../../../pagination"
import ComplianceIssues from "./ComplianceIssues"
import DailyEntries from "./DailyEnries"

export default function TimecardsList({ filteredTimecards, handleApprove, handleReject, handleFlag, reviewNotes, setReviewNotes, selectedTimecard, setSelectedTimecard }: { filteredTimecards: any[], handleApprove: (timecardId: string) => void, handleReject: (timecardId: string) => void, handleFlag: (timecardId: string) => void, reviewNotes: string, setReviewNotes: (value: string) => void, selectedTimecard: any, setSelectedTimecard: (timecard: any) => void }) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  // Reset pagination when filtered data changes
  useEffect(() => {
    setCurrentPage(1)
  }, [filteredTimecards])

  // Calculate pagination values
  const totalItems = filteredTimecards.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedTimecards = filteredTimecards.slice(startIndex, endIndex)

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
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
    <>
      <div className="space-y-4">
        {paginatedTimecards.map((timecard) => (
          <Card key={timecard.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{timecard.user.name}</h3>
                      <p className="text-sm text-gray-600">
                        {timecard.user.id} • {timecard.user.department}
                      </p>
                    </div>
                    <Badge className={getStatusColor(timecard.status)}>{timecard.user.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Week Ending</p>
                      <p className="font-medium">{timecard.weekEnding}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Hours</p>
                      <p className="font-medium">{timecard.totalHours}h</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Regular Hours</p>
                      <p className="font-medium">{timecard.regularHours}h</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Overtime</p>
                      <p className="font-medium text-orange-600">{timecard.overtime}h</p>
                    </div>
                  </div>

                  <ComplianceIssues timecard={timecard} />
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedTimecard(timecard)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Timecard Details - {timecard.employee}</DialogTitle>
                        <DialogDescription>
                          Week ending {timecard.weekEnding} • Submitted{" "}
                          {new Date(timecard.submittedAt).toLocaleDateString()}
                        </DialogDescription>
                      </DialogHeader>

                      <DailyEntries selectedTimecard={selectedTimecard} reviewNotes={reviewNotes} setReviewNotes={setReviewNotes} handleApprove={handleApprove} handleReject={handleReject} handleFlag={handleFlag} />
                    </DialogContent>
                  </Dialog>

                  {timecard.status === "pending" && (
                    <div className="flex space-x-2">
                      {/* Approve Button with Confirmation */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Approve Timecard</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to approve the timecard for {timecard.employee}? 
                              This action will mark the timecard as approved and cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleApprove(timecard.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Approve
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      {/* Reject Button with Confirmation */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <X className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Reject Timecard</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to reject the timecard for {timecard.employee}? 
                              This action will mark the timecard as rejected and the employee will need to resubmit.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleReject(timecard.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Reject
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      {/* Flag Button with Confirmation */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-orange-200 text-orange-800 hover:bg-orange-50"
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Flag Timecard</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to flag the timecard for {timecard.employee}? 
                              This action will mark the timecard for further review and investigation.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleFlag(timecard.id)}
                              className="border-orange-200 text-orange-800 hover:bg-orange-50"
                            >
                              Flag for Review
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Component */}
      {totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPageOptions={[2, 5, 10, 20, 50]}
        />
      )}
    </>
  )
}
