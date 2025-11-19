import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ElementType } from "react";

interface StatsCardProps {
    title:string;
    data:number| string;
    description:string;
    icon:ElementType;
    class:string;
}
const StatsCard = ({title, data, description, icon:Icon, class:name}:StatsCardProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className= {name} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-600">{data}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}

export default StatsCard;