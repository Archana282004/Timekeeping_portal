import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TodaySummaryCard from "./today-summary-card";

interface TodaySummaryProps {
    todayHours: number
}
const TodaySummary = ({ todayHours }: TodaySummaryProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <TodaySummaryCard
                    title="Clock In Time:"
                    data="9:00 AM"
                />
                <TodaySummaryCard
                    title="Hours Worked:"
                    data={`${todayHours}h`}
                />
                <TodaySummaryCard
                    title="Breaks Taken:"
                    data="2 (45 min)"
                />
                <TodaySummaryCard
                    title="Remaining Break:"
                    data="15 min"
                />
            </CardContent>
        </Card>
    )
}

export default TodaySummary;