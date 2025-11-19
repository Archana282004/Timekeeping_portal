import { Textarea } from "../../textarea"
import { Button } from "../../button"
import { CheckCircle, X, AlertTriangle } from "lucide-react"

interface ReviewActionsProps {
  reviewNotes: string,
  setReviewNotes: (value: string) => void,
  selectedTimecard: any,
  handleApprove: (timecardId: string) => void,
  handleReject: (timecardId: string) => void,
  handleFlag: (timecardId: string) => void
}
const ReviewActions = ({ reviewNotes, setReviewNotes, selectedTimecard, handleApprove, handleReject, handleFlag }:ReviewActionsProps) => {
  return (
    <div className="border-t pt-4">
      <h4 className="font-medium mb-3">Review Actions</h4>
      <div className="space-y-4">
        {/* <div>
        <label className="block text-sm font-medium mb-2">Review Notes (optional)</label>
        <Textarea
          placeholder="Add notes about this timecard review..."
          value={reviewNotes}
          onChange={(e) => setReviewNotes(e.target.value)}
        />
      </div> */}
        <div className="flex space-x-2">
          <Button
            onClick={() => handleApprove(selectedTimecard.id)}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve
          </Button>
          <Button onClick={() => handleReject(selectedTimecard.id)} variant="destructive">
            <X className="mr-2 h-4 w-4" />
            Reject
          </Button>
          <Button
            onClick={() => handleFlag(selectedTimecard.id)}
            variant="outline"
            className="border-orange-200 text-orange-800 hover:bg-orange-50"
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Flag for Review
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReviewActions;