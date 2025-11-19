import ComplianceStatusCard from "./compliance-status-card";
import TodayStatusCard from "./today-status-card";
import WeeklySummaryCard from "./weekly-summary-card";

interface StatsProps {
    todayStatus: {
        clockedIn: string,
        startTime: string,
        breaksTaken: string,
        hoursWorked: string,
    },
    weeklyHours:{
        regular:number,
    overtime:number,
    total: number,
    }

}
const Stats = ({ todayStatus, weeklyHours }: StatsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Today's Status */}
            <TodayStatusCard todayStatus={todayStatus} />

            {/* Weekly Summary */}
            <WeeklySummaryCard weeklyHours={weeklyHours} />

            {/* Compliance Status */}
            <ComplianceStatusCard />
        </div>
    )
}

export default Stats;