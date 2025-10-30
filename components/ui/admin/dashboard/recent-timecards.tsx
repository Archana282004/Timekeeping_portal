import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../card"
import { Badge } from "../../badge"
import { useAppSelector } from "@/store/hooks"
import { Skeleton } from "../../skeleton"


export default function RecentTimecards({ recentTimecards }: { recentTimecards: any[] }) { 
  const loading = useAppSelector((state)=> state.admin.recenttimecards)
  return (
   (loading ? 
    (
        <Card>
      <CardHeader>
        <Skeleton className="h-5 w-48 mb-2" /> {/* Title */}
        <Skeleton className="h-4 w-64" /> {/* Description */}
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" /> {/* User name */}
                <Skeleton className="h-3 w-32" /> {/* Total hours */}
                <Skeleton className="h-3 w-24" /> {/* Optional issues line */}
              </div>

              <Skeleton className="h-6 w-16 rounded-md" /> {/* Status badge */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    )
    :
    (
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
              <p className="font-medium">{timecard.user.name}</p>
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
   )
  )
}