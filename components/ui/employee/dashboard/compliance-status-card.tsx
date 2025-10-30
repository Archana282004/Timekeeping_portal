import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../card";
import { Badge } from "@/components/ui/badge";

export default function ComplianceStatusCard( ) {
  return (
    <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Compliance</CardTitle>
      <CheckCircle className="h-4 w-4 text-green-600" />
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">Break Compliance:</span>
          <Badge variant="default" className="bg-green-100 text-green-800">
            Good
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Overtime Alert:</span>
          <Badge variant="outline" className="border-orange-200 text-orange-800">
            Monitor
          </Badge>
        </div>
        <p className="text-xs text-gray-600 mt-2">All CA labor law requirements met</p>
      </div>
    </CardContent>
  </Card>
  )
}