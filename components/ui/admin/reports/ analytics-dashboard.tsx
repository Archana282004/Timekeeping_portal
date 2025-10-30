import { Bar, BarChart, ResponsiveContainer, YAxis, Tooltip, XAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../card";
import { BarChart3 } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { Skeleton } from "../../skeleton";

export default function AnalyticsDashboard({ weeklyHoursData }: { weeklyHoursData: any }) {
  const loading = useAppSelector((state) => state.admin.weekhour);
  return (
    (loading ?
      (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-gray-400" />
              <Skeleton className="h-5 w-48" />
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col items-center justify-center h-[300px] space-y-4">
              <div className="flex items-end justify-between w-full px-6 h-[200px]">
                {[100, 130, 90, 150, 120, 160].map((height, i) => (
                  <Skeleton
                    key={i}
                    className="w-8 rounded-sm"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
              <div className="flex justify-between w-full px-8">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-3 w-8 rounded" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )
      :
      (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Weekly Hours Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyHoursData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="regular" fill="#8884d8" name="Regular Hours" />
                <Bar dataKey="overtime" fill="#ffc658" name="Overtime Hours" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )
    )
  )
}