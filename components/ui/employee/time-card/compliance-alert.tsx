import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "../../alert";

const ComplianceAlert = ({ complianceIssues }: { complianceIssues: string[] })=> {
  return (
    <>
        {complianceIssues.length > 0 && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription>
              <div className="font-medium text-red-800 mb-2">California Labor Law Compliance Issues:</div>
              <ul className="list-disc list-inside space-y-1 text-red-700">
                {complianceIssues.map((issue, index) => (
                  <li key={index} className="text-sm">
                    {issue}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
    </>
  )
}

export default ComplianceAlert;