import { Card, CardHeader, CardTitle, CardContent } from "../../card"
import { Users } from "lucide-react"
interface emptype {

  avgWeeklyHoursPerEmployee:number,
  departments:number,
  notactive:number,
  totalEmployeesActive: number,
  totalOvertimeThisWeek: number
}

export default function StatsOverview({ employees, departments }: { employees: emptype, departments: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{employees.totalEmployeesActive}</div>
          <p className="text-xs text-muted-foreground">
          active
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Departments</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{employees.departments}</div>
          <p className="text-xs text-muted-foreground">Active departments</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Weekly Hours</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {employees.avgWeeklyHoursPerEmployee}h
          </div>
          <p className="text-xs text-muted-foreground">Per employee</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Overtime</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {employees.totalOvertimeThisWeek}h
          </div>
          <p className="text-xs text-muted-foreground">This week</p>
        </CardContent>
      </Card>
    </div>
  )
}