import { Card, CardContent } from "../../card"
import { Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "../../button"

export default function FirstTimecard({ filteredHistory }: { filteredHistory: any[] }) {
  return (
    <>
       {filteredHistory.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">No timecards found matching your criteria.</p>
                <Link href="/employee-submit-timecard">
                  <Button>Submit Your First Timecard</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
    </>
  )
}