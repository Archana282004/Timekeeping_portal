import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../card"
import { Button } from "../../button"
import Link from "next/link"
import { Clock, Users, Download } from "lucide-react"
import RecentTimecards from "./recent-timecards"

export default function QuickActions({ exportPayroll, recentTimecards }: { exportPayroll: () => void, recentTimecards: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common administrative tasks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Link href="/admin-review-timecards" className="block">
          <Button className="w-full" size="lg">
            <Clock className="mr-2 h-4 w-4" />
            Review Timecards
          </Button>
        </Link>
        <Link href="/admin-manage-employees" className="block">
          <Button variant="outline" className="w-full bg-transparent" size="lg">
            <Users className="mr-2 h-4 w-4" />
            Manage Employees
          </Button>
        </Link>
        {/* <Button onClick={exportPayroll} variant="outline" className="w-full bg-transparent" size="lg">
          <Download className="mr-2 h-4 w-4" />
          Export Payroll
        </Button> */}
      </CardContent>
    </Card>

    {/* Recent Timecards */}
    <RecentTimecards recentTimecards={recentTimecards} />
  </div>
  )
}