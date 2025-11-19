import { Card, CardContent } from "../../../../card"
import { Button } from "../../../../button"
import Link from "next/link"
import { Clock, Users } from "lucide-react"
import Header from "@/components/ui/header"
import QuickActionsCard from "./quick-actions-card"

const QuickActions = () => {
  return (
    <div>
      <Card>
        <Header
          title="Quick Actions"
          description="Common administrative tasks"
        />
        <CardContent className="space-y-4">
          <QuickActionsCard
            link="/admin-review-timecards"
            icon={Clock}
            title="Review Timecards"
          />
        <QuickActionsCard
          link="/admin-manage-employees"
          icon={Users}
          title="Manage Employees"
        />
        {/* <Button onClick={exportPayroll} variant="outline" className="w-full bg-transparent" size="lg">
          <Download className="mr-2 h-4 w-4" />
          Export Payroll
        </Button> */}
      </CardContent>
    </Card>

    </div >
  )
}

export default QuickActions;