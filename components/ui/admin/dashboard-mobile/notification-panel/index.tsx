import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import NotificationPanelCard from "./notification-panel-card";
import HeaderCard from "@/components/ui/cardheader";

export interface NotificationsPanelProps {
    showNotifications: boolean
}
const NotificationsPanel = ({ showNotifications }: NotificationsPanelProps) => {
    return (
        <div>
            {showNotifications && (
                <Card className="border-orange-200 bg-orange-50">
                        <HeaderCard
                            icon={Bell}
                            title="Recent Notifications"
                        />
                    <CardContent className="space-y-2">
                        <NotificationPanelCard
                            title="Compliance Alert"
                            description="Mike Johnson exceeded daily hours limit"
                        />
                        <NotificationPanelCard
                            title="Overtime Warning"
                            description="7 employees approaching weekly overtime"
                        />
                        <NotificationPanelCard
                            title="Timecard Submitted"
                            description="John Doe submitted weekly timecard"
                        />
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default NotificationsPanel;