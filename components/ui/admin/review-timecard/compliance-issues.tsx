import { Alert, AlertDescription } from "../../alert"
import { AlertTriangle } from "lucide-react"

export default function ComplianceIssues({ timecard }: { timecard: any }) {
  return (
    <>
          {timecard.issues.length > 0 && (
                <Alert className="mb-4 border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription>
                    <div className="font-medium text-orange-800 mb-1">Compliance Issues:</div>
                    <ul className="list-disc list-inside space-y-1 text-orange-700">
                      {timecard.issues.map((issue, index) => (
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