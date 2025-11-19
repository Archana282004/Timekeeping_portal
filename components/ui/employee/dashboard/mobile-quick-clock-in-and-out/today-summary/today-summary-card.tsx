
interface TodaySummaryCardProps{
    title:string;
    data:string;
}
const TodaySummaryCard = ({title, data}:TodaySummaryCardProps) =>{
    return(
        <div className="flex justify-between">
            <span className="text-sm text-gray-600">{title}</span>
            <span className="font-medium">{data}</span>
          </div>
    )
}

export default TodaySummaryCard;