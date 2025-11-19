import { useAppSelector } from "@/store/hooks"
import { Card } from "../../../card"
import { CardHeader, CardContent } from "../../../card"
import { Users, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { Skeleton } from "../../../skeleton";
import StatsCard from "@/components/ui/stats-card";
import { DashboardStats } from "@/store/reducers/adminReducer";

interface StatsProps{
stats:DashboardStats
}

const Stats = ({ stats }: StatsProps) => {
  const loading = useAppSelector((state) => state.admin.statscard);
  return (
    (loading ?
      (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-32" /> {/* Title placeholder */}
              <Skeleton className="h-4 w-4 rounded-full" /> {/* Icon placeholder */}
            </CardHeader>

            <CardContent>
              <Skeleton className="h-8 w-20 mb-2" /> {/* Number placeholder */}
              <Skeleton className="h-3 w-28" /> {/* Text placeholder */}
            </CardContent>
          </Card>
        ))}
      </div>) :
      (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <StatsCard
            title="Total Employees"
            icon={Users}
            data={stats.totalEmployees}
            description="Active employees"
            class="text-2xl font-bold text-transparent-500"
          />

          <StatsCard
            title="Pending Reviews"
            icon={Clock}
            data={stats.pendingTimecards}
            description="Timecards to review"
            class="text-2xl font-bold text-orange-600"
          />

          <StatsCard
            title="Compliance Issues"
            icon={AlertTriangle}
            data={stats.complianceIssues}
            description="Require attention"
            class="text-2xl font-bold text-red-600"
          />

          <StatsCard
            title="Approved This Week"
            icon={CheckCircle}
            data={stats.approvedThisWeek}
            description="Timecards processed"
            class="text-2xl font-bold text-green-600"
          />
        </div>
      )
    )

  )
}

export default Stats;