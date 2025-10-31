import { useAppSelector } from "@/store/hooks"
import { Card, CardHeader, CardTitle, CardContent } from "../../card"
import { Calendar, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { Skeleton } from "../../skeleton"

export default function SummaryStats({ filteredHistory, totalHoursAllTime, totalOvertimeAllTime, approvalrate }: { filteredHistory: any[], totalHoursAllTime: number, totalOvertimeAllTime: number , approvalrate: number}) {
  const loading = useAppSelector((state)=> state.user.historycards)
  return (
   (
    loading?
    (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20 mb-2" />
            <Skeleton className="h-3 w-24" />
          </CardContent>
        </Card>
      ))}
    </div>
    )
    :
    (
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Timecards</CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{filteredHistory}</div>
        <p className="text-xs text-muted-foreground">Submitted</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalHoursAllTime}h</div>
        <p className="text-xs text-muted-foreground">All time</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Overtime Hours</CardTitle>
        <AlertTriangle className="h-4 w-4 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-orange-600">{totalOvertimeAllTime}h</div>
        <p className="text-xs text-muted-foreground">Total overtime</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
        <CheckCircle className="h-4 w-4 text-green-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-600">
          {approvalrate}
          %
        </div>
        <p className="text-xs text-muted-foreground">Approved timecards</p>
      </CardContent>
    </Card>
  </div>

    )
   )
  )
}