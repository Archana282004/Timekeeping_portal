import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../card"
import { Badge } from "../../badge"


export default function RecentTimecards({ recentTimecards }: { recentTimecards: any[] }) {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Recent Timecard Submissions</CardTitle>
      <CardDescription>Latest submissions requiring review</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {recentTimecards.slice(0, 3).map((timecard) => (
          <div key={timecard.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex-1">
              <p className="font-medium">{timecard.employee}</p>
              <p className="text-sm text-gray-600">
                {timecard.totalHours}h total
                {timecard.overtime > 0 && ` (${timecard.overtime}h OT)`}
              </p>
              {timecard.issues.length > 0 && (
                <p className="text-xs text-red-600 mt-1">{timecard.issues.length} issue(s)</p>
              )}
            </div>
            <Badge
              variant={
                timecard.status === "approved"
                  ? "default"
                  : timecard.status === "flagged"
                    ? "destructive"
                    : "secondary"
              }
              className={
                timecard.status === "approved"
                  ? "bg-green-100 text-green-800"
                  : timecard.status === "flagged"
                    ? "bg-red-100 text-red-800"
                    : ""
              }
            >
              {timecard.status}
            </Badge>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
  )
}