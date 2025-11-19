import { useAppSelector } from "@/store/hooks"
import { Card, CardHeader, CardContent } from "../../../card"
import { Users } from "lucide-react"
import { Skeleton } from "../../../skeleton"
import StatsCard from "../../../stats-card"
interface emptype {
  employees: {
    avgWeeklyHoursPerEmployee: number,
    departments: number,
    notactive: number,
    totalEmployeesActive: number,
    totalOvertimeThisWeek: number
  }
}

const StatsOverview = ({ employees }: emptype) =>{
  const loading = useAppSelector((state) => state.admin.adminemployee)
  return (
    (
      loading ?
        (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-6 w-20 mb-2" />
                <Skeleton className="h-3 w-16" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-6 w-20 mb-2" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-6 w-16 mb-2" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-6 w-16 mb-2" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          </div>
        )
        :
        (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Employees"
              icon={Users}
              data={employees.totalEmployeesActive}
              description="active"
              class="text-2xl font-bold text-transparent-600"
            />

            <StatsCard
              title="Departments"
              icon={Users}
              data={employees.departments}
              description="Active departments"
              class="text-2xl font-bold text-transparent-600"
            />

            <StatsCard
              title="Avg Weekly Hours"
              icon={Users}
              data={`${employees.avgWeeklyHoursPerEmployee}h`}
              description="Per employee"
              class="text-2xl font-bold text-transparent-600"
            />

            <StatsCard
              title="Total Overtime"
              icon={Users}
              data={`${employees.totalOvertimeThisWeek}h`}
              description="This week"
              class="text-2xl font-bold text-transparent-600"
            />
          </div>
        )
    )

  )
}

export default StatsOverview;