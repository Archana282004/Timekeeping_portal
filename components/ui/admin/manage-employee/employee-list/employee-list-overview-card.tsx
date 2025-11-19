
interface EmployeeListOverviewCardProps{
    title:string;
    description:string
}
const EmployeeListOverviewCard = ({title, description}:EmployeeListOverviewCardProps) => {
    return (
        <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="font-medium">{description}</p>
        </div>
    )
}

export default EmployeeListOverviewCard;