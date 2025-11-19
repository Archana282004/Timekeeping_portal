import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

const ComplianceAlertModal = ({ todayHours }: { todayHours: number }) => {
    return (
        <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-4">
                <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-orange-800">Break Reminder</p>
                        <p className="text-xs text-orange-700 mt-1">
                            You've worked {todayHours} hours. California law requires a 30-minute meal break.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ComplianceAlertModal;