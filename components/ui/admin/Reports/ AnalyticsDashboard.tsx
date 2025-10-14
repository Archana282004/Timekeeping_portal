import { Bar, BarChart, ResponsiveContainer, YAxis, Tooltip, XAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../card";
import { BarChart3 } from "lucide-react";

export default function AnalyticsDashboard({weeklyHoursData}: {weeklyHoursData: any}) {
  return   <Card>
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
}