import { AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "../../card";

export default function OvertimeCard({ overtimeHours }: { overtimeHours: number }) {
  return (
    <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Overtime</CardTitle>
      <AlertTriangle className="h-4 w-4 text-orange-500" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-orange-600">{overtimeHours.toFixed(1)}h</div>
      <p className="text-xs text-muted-foreground">Over 40 hours</p>
    </CardContent>
  </Card>
  )
}