"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Calendar, Coffee } from "lucide-react"
import Link from "next/link"
import QuickActionsCard from "./quick-actions-card"



const QuickActions = () => {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Manage your time and submissions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <QuickActionsCard
          link="/employee-submit-timecard"
          class="w-full h-12 text-lg"
          icon={Clock}
          data="Submit Timecard"
        />
        <QuickActionsCard link="/employee-history"
          class="w-full bg-transparent h-12 text-lg"
          icon={Calendar}
          data="View History"
        />
        <QuickActionsCard link="/employee-updatepassword"
          class="w-full bg-transparent h-12 text-lg"
          icon={Calendar}
          data="Update Password"
        />

        <div className="grid grid-cols-2 gap-2 md:hidden">
          <Button variant="outline" className="h-10 bg-transparent">
            <Clock className="mr-1 h-4 w-4" />
            Clock In
          </Button>
          <Button variant="outline" className="h-10 bg-transparent">
            <Coffee className="mr-1 h-4 w-4" />
            Break
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default QuickActions;