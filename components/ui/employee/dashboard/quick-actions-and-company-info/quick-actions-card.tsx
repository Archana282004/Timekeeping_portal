import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ElementType } from "react";

interface QuickActionsCardProps{
    link:string;
    class:string;
    data:string;
    icon:ElementType
}
const QuickActionsCard = ({link, class:name, data, icon:Icon}: QuickActionsCardProps) =>{
    return(
        <Link href={link} className="block">
          <Button className={name} size="lg">
            <Icon className="mr-2 h-5 w-5" />
            {data}
          </Button>
        </Link>
    )
}

export default QuickActionsCard;