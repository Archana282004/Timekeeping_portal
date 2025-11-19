import { useAppSelector } from "@/store/hooks"
import { Card, CardHeader, CardTitle, CardContent } from "../../../card"
import { Calendar, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { Skeleton } from "../../../skeleton"
import StatsCard from "../../../stats-card"

interface SummaryStatsProps {
  filteredHistory: number,
  totalHoursAllTime: number,
  totalOvertimeAllTime: number,
  approvalrate: number
}
const SummaryStats = ({ filteredHistory, totalHoursAllTime, totalOvertimeAllTime, approvalrate }: SummaryStatsProps) => {
  const loading = useAppSelector((state) => state.user.historycards)
  return (
    (
      loading ?
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

            <StatsCard
              title="Total Timecards"
              icon={Calendar}
              class="h-4 w-4 text-muted-foreground"
              data={filteredHistory}
              description="Submitted"
            />

            <StatsCard
              title="Total Hours"
              icon={Clock}
              class="h-4 w-4 text-muted-foreground"
              data={`${totalHoursAllTime}h`}
              description="All time"
            />

            <StatsCard
              title="Overtime Hours"
              icon={AlertTriangle}
              class="h-4 w-4 text-orange-500"
              data={`${totalOvertimeAllTime}h`}
              description="Total overtime"
            />

            <StatsCard
              title="Approval Rate"
              icon={CheckCircle}
              data={`${approvalrate}%`}
              description="Approved timecards"
              class="h-4 w-4 text-green-500"
            />

          </div>

        )
    )
  )
}

export default SummaryStats;