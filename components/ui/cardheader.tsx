import { ElementType } from "react";
import { CardHeader, CardTitle } from "./card"

interface CardHeaderProps {
    title: string;
    icon: ElementType
}
const HeaderCard = ({ title, icon: Icon }: CardHeaderProps) => {
    return (
        <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
                <Icon className="mr-2 h-5 w-5" />
                {title}
            </CardTitle>
        </CardHeader>
    )
}

export default HeaderCard;