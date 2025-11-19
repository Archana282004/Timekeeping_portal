
interface ActivityCardProps {
    activity: {
        id: number;
        employee: string;
        action: string;
        time: string;
        type: string;
    }
}
const ActivityCard = ({ activity }: ActivityCardProps) => {
    return (
        <div key={activity.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
            <div className="flex-1">
                <p className="text-sm font-medium">{activity.employee}</p>
                <p className="text-xs text-gray-600">{activity.action}</p>
            </div>
            <div className="text-xs text-gray-500">{activity.time}</div>
        </div>
    )
}

export default ActivityCard;