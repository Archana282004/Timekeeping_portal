import ReviewActions from "./review-actions";

export default function DailyEntries({ selectedTimecard, reviewNotes, setReviewNotes, handleApprove, handleReject, handleFlag }: { selectedTimecard: any, reviewNotes: string, setReviewNotes: (value: string) => void, handleApprove: (timecardId: string) => void, handleReject: (timecardId: string) => void, handleFlag: (timecardId: string) => void }) {
  return (
    <div>
      {selectedTimecard && (
                    <div className="space-y-6">
                      {/* Daily Entries */}
                      <div>
                        <h4 className="font-medium mb-3">Daily Time Entries</h4>
                        <div className="space-y-3">
                          {selectedTimecard.dailyEntries.map((entry, index) => (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <div>
                                  <p className="text-sm text-gray-600">Date</p>
                                  <p className="font-medium">{entry.date}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Start</p>
                                  <p className="font-medium">{entry.startTime}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">End</p>
                                  <p className="font-medium">{entry.endTime}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Break</p>
                                  <p className="font-medium">{entry.breakMinutes}min</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Hours</p>
                                  <p className="font-medium">{entry.hours}h</p>
                                </div>
                              </div>
                              {entry.notes && (
                                <div className="mt-2">
                                  <p className="text-sm text-gray-600">Notes</p>
                                  <p className="text-sm">{entry.notes}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Review Actions */}
                      <ReviewActions reviewNotes={reviewNotes} setReviewNotes={setReviewNotes} selectedTimecard={selectedTimecard} handleApprove={handleApprove} handleReject={handleReject} handleFlag={handleFlag} />
                    </div>
                  )}
    </div>
  )
}