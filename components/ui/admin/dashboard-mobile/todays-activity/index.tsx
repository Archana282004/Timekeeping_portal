import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeaderCard from "@/components/ui/cardheader";
import { TrendingUp } from "lucide-react";
import ActivityCard from "./activity-card";

export interface TodaysActivityProps {
    recentActivity: {
        id: number;
        employee: string;
        action: string;
        time: string;
        type: string;
    }[]
}
const TodaysActiviy = ({ recentActivity }: TodaysActivityProps) => {
    return (
        <Card>
            <HeaderCard
                icon={TrendingUp}
                title="Today's Activity"
            />
            <CardContent className="space-y-3">
                {recentActivity.map((activity) => (
                    <ActivityCard activity={activity} />
                ))}
            </CardContent>
        </Card>
    )
}

export default TodaysActiviy;