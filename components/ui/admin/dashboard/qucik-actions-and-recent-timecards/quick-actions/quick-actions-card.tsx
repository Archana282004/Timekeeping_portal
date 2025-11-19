import { Button } from "@/components/ui/button"
import { Link } from "lucide-react"
import { ElementType } from "react";

interface QuickActionCardProps {
    link: string;
    icon: ElementType;
    title: string
}
const QuickActionsCard = ({ link, icon: Icon, title }: QuickActionCardProps) => {
    return (
        <Link href={link} className="block">
            <Button className="w-full" size="lg">
                <Icon className="mr-2 h-4 w-4" />
                {title}
            </Button>
        </Link>
    )
}

export default QuickActionsCard;