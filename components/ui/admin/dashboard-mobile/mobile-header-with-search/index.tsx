import { Card, CardContent } from "@/components/ui/card"
import QuickStatsRow from "./quick-stats-row"
import HeaderSearch, { MobileHeaderSearchProps } from "./header-with-search"
 
const MobileHeaderSearch = ({searchTerm, setSearchTerm, showNotifications, setShowNotifications}: MobileHeaderSearchProps) => {
    return (
        <Card>
            <CardContent className="pt-4">
                <HeaderSearch
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setShowNotifications={setShowNotifications}
                    showNotifications={showNotifications}
                />

                {/* Quick Stats Row */}
                <QuickStatsRow />
            </CardContent>
        </Card>
    )
}

export default MobileHeaderSearch