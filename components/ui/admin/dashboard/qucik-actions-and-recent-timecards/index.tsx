import RecentTimecards from "./recent-timecards"
import QuickActions from "./quick-actions"

const QuickActionsandRecentCards = ({  recentTimecards }: { recentTimecards: any[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <QuickActions />

            {/* Recent Timecards */}
            <RecentTimecards recentTimecards={recentTimecards} />
        </div>
    )
}

export default QuickActionsandRecentCards;