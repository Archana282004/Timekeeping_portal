import { Card, CardHeader, CardTitle, CardContent } from "../../card";
import { PieChartIcon } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export default function DepartmentHoursDistribution({departmentHoursData}: {departmentHoursData: any}) { 
  return <Card>
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
}