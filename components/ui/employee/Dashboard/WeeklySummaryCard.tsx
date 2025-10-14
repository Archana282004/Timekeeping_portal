import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../card";

export default function WeeklySummaryCard({ weeklyHours }: { weeklyHours: any }) {
  return (
    <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">This Week</CardTitle>
      <Calendar className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">Regular Hours:</span>
          <span className="text-sm font-medium">{weeklyHours.regular}h</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Overtime:</span>
          <span className="text-sm font-medium text-orange-600">{weeklyHours.overtime}h</span>
        </div>
        <div className="flex items-center justify-between border-t pt-2">
          <span className="text-sm font-medium">Total:</span>
          <span className="text-sm font-bold">{weeklyHours.total}h</span>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}