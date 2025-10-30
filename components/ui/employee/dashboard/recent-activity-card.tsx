import { useAppSelector } from "@/store/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "../../skeleton";

export default function RecentActivityCard({ recentActivity }: { recentActivity: any }) {
  const loading = useAppSelector((state) => state.user.weekcard)
  return (
    (loading ?
      (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest timecard submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Render a few placeholder items */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" /> {/* date */}
                    <Skeleton className="h-3 w-32" /> {/* hours + overtime */}
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" /> {/* badge */}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )
      :
      (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest timecard submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((entry: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{entry.date}</p>
                    <p className="text-sm text-gray-600">
                      {entry.hours}h total {entry.overtime > 0 && `(${entry.overtime}h OT)`}
                    </p>
                  </div>
                  <Badge
                    variant={entry.status === "approved" ? "default" : "secondary"}
                    className={entry.status === "approved" ? "bg-green-100 text-green-800" : ""}
                  >
                    {entry.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )
    )
  )
}