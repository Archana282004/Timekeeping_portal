import { useAppSelector } from "@/store/hooks"
import { Card } from "../../card"
import { CardHeader, CardTitle, CardContent } from "../../card"
import { Users, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { Skeleton } from "../../skeleton";



export default function StatsCard({ stats }: { stats: { totalEmployees: number, pendingTimecards: number, complianceIssues: number, approvedThisWeek: number } }) {
  const loading = useAppSelector((state)=> state.admin.statscard);
  return (
    (loading ?
      ( <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEmployees}</div>
              <p className="text-xs text-muted-foreground">Active employees</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingTimecards}</div>
              <p className="text-xs text-muted-foreground">Timecards to review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.complianceIssues}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved This Week</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approvedThisWeek}</div>
              <p className="text-xs text-muted-foreground">Timecards processed</p>
            </CardContent>
          </Card>
        </div>
    )
    )
    
  )
}