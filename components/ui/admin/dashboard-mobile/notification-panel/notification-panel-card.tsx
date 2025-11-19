
interface NotificationPanelCardProps {
    title: string;
    description: string;
}
const NotificationPanelCard = ({  title, description }: NotificationPanelCardProps) => {
    return (

        <div className="text-sm p-2 bg-white rounded border-l-4 border-blue-500">
            <p className="font-medium">{title}</p>
            <p className="text-gray-600 text-xs">{description}</p>
        </div>
    )
}

export default NotificationPanelCard