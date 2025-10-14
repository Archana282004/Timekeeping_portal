import { AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../card";

export default function ComplianceCard({ complianceIssues }: { complianceIssues: string[] }) {
  return (
    <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Compliance</CardTitle>
      {complianceIssues.length === 0 ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <AlertTriangle className="h-4 w-4 text-red-500" />
      )}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {complianceIssues.length === 0 ? (
          <span className="text-green-600">Good</span>
        ) : (
          <span className="text-red-600">{complianceIssues.length}</span>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        {complianceIssues.length === 0 ? "CA compliant" : "Issues found"}
      </p>
    </CardContent>
  </Card>
  )
}