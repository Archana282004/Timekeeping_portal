import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../card";
import { useAppSelector } from "@/store/hooks";
import { Skeleton } from "../../skeleton";

export default function WeeklySummaryCard({ weeklyHours }: { weeklyHours: any }) {
  const loading = useAppSelector((state) => state.user.weekcard)
  return (
    (loading ?
      (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* Regular Hours */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Regular Hours:</span>
                <Skeleton className="h-4 w-10" />
              </div>

              {/* Overtime */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Overtime:</span>
                <Skeleton className="h-4 w-10" />
              </div>

              {/* Total */}
              <div className="flex items-center justify-between border-t pt-2">
                <span className="text-sm font-medium">Total:</span>
                <Skeleton className="h-4 w-10" />
              </div>
            </div>
          </CardContent>
        </Card>
      )
      :
      (
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
    )
  )
}