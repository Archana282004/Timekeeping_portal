import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAppSelector } from "@/store/hooks"
import { Skeleton } from "@/components/ui/skeleton"

const TodayStatusCard = ({ todayStatus }: { todayStatus: any }) => {
  const loading = useAppSelector((state) => state.user.status)
  return (
    (loading ?
      (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Status</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Status:</span>
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>

              {/* Start Time */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Start Time:</span>
                <Skeleton className="h-4 w-16" />
              </div>

              {/* Hours Worked */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Hours Worked:</span>
                <Skeleton className="h-4 w-12" />
              </div>

              {/* Breaks Taken */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Breaks Taken:</span>
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </CardContent>
        </Card>
      )
      :
      (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Status</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status:</span>
                <Badge variant={todayStatus.clockedIn ? "default" : "secondary"}>
                  {todayStatus.clockedIn ? "Clocked In" : "Clocked Out"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Start Time:</span>
                <span className="text-sm font-medium">{todayStatus.startTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Hours Worked:</span>
                <span className="text-sm font-medium">{todayStatus.hoursWorked}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Breaks Taken:</span>
                <span className="text-sm font-medium">{todayStatus.breaksTaken}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    )
  )
}

export default TodayStatusCard;