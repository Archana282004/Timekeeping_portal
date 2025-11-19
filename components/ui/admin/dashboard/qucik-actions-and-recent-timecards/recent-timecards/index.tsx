import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppSelector } from "@/store/hooks"
import { Skeleton } from "@/components/ui/skeleton"
import Header from "@/components/ui/header"
import TimecardInterface from "./timecards-card"


const RecentTimecards = ({ recentTimecards }: { recentTimecards: any[] }) => {
  const loading = useAppSelector((state) => state.admin.recenttimecards)
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
          <Header
            title="Recent Timecard Submissions"
            description="Latest submissions requiring review"
          />
          <CardContent>
            <div className="space-y-4">
              {recentTimecards.slice(0, 3).map((timecard) => (
                <TimecardInterface
                  timecard={timecard}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )
    )
  )
}

export default RecentTimecards;