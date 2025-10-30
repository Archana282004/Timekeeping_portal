import { useAppSelector } from "@/store/hooks";
import { Card, CardHeader, CardTitle, CardContent } from "../../card";
import { PieChartIcon } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Skeleton } from "../../skeleton";

export default function DepartmentHoursDistribution({ departmentHoursData }: { departmentHoursData: any }) {
  const loading = useAppSelector((state) => state.admin.departmenthour)
  return (
    (
      loading ?
        (
          
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="mr-2 h-5 w-5 text-gray-400" />
                  <Skeleton className="h-5 w-56" />
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-col items-center justify-center h-[300px] space-y-4">
                  <div className="relative w-40 h-40">
                    <Skeleton className="absolute inset-0 rounded-full" />
                    <Skeleton className="absolute inset-[30px] rounded-full bg-background" />
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
                <PieChartIcon className="mr-2 h-5 w-5" />
                Department Hours Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentHoursData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ department, hours }) => `${department}: ${hours}h`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="hours"
                  >

                    {departmentHoursData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )
    )
  )
}