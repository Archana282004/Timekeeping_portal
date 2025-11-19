import { Clock } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "../../card";

const TotalHoursCard = ({ totalHours }: { totalHours: number })=> {
  return (
    <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
      <Clock className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{totalHours.toFixed(1)}h</div>
      <p className="text-xs text-muted-foreground">This week</p>
    </CardContent>
  </Card>
  )
}

export default TotalHoursCard;