import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

export interface QuickActionsGridProps {
    quickActions: {
        id: string
        title: string
        description: string
        count: number
        priority: "high" | "medium" | "low"
        action: () => void
    }[],
    getPriorityColor: (priority: string) => string
}
const QuickActionsGrid = ({ quickActions, getPriorityColor }: QuickActionsGridProps) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {quickActions.map((action) => (
                <Card
                    key={action.id}
                    className={`cursor-pointer hover:shadow-md transition-shadow border-l-4 ${getPriorityColor(action.priority)}`}
                    onClick={action.action}
                >
                    <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                    <h3 className="font-semibold text-sm">{action.title}</h3>
                                    <Badge variant="secondary" className="text-xs">
                                        {action.count}
                                    </Badge>
                                </div>
                                <p className="text-xs text-gray-600">{action.description}</p>
                            </div>
                            <div className="ml-2">
                                {action.priority === "high" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                                {action.priority === "medium" && <Clock className="h-5 w-5 text-orange-500" />}
                                {action.priority === "low" && <CheckCircle className="h-5 w-5 text-green-500" />}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default QuickActionsGrid;