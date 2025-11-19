import { Calendar, Users } from "lucide-react";
import QuickAccessButtonsCard from "./quick-access-buttons-card";

const QuickAccessButtons = () => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <QuickAccessButtonsCard
                link="/admin-manage-employees"
                icon={Users}
                title="Manage Employees"
            />
            <QuickAccessButtonsCard
                link="/admin-reports"
                icon={Calendar}
                title="View Reports"
            />
        </div>
    )
}

export default QuickAccessButtons;