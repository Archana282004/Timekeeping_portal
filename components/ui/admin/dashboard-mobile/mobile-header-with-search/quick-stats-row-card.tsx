
interface QuickStatsRowCardProps{
    count:number;
    description:string;
}
const QuickStatsRowCard = ({count, description}: QuickStatsRowCardProps) => {
    return (
        <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{count}</div>
            <div className="text-xs text-gray-600">{description}</div>
        </div>
    )
};
export default QuickStatsRowCard;