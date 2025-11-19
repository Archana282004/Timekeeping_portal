import { ElementType } from "react";
import { Button } from "react-day-picker"
import { useRouter } from "next/navigation";

interface QuickAccessButtonsCardProps{
    title:string;
    link:string;
    icon:ElementType
}

const QuickAccessButtonsCard = ({ title, link, icon: Icon }: QuickAccessButtonsCardProps) => {
  const router = useRouter();

  return (
    <Button
      className="h-16 flex-col space-y-1"
      onClick={() => router.push(link)}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs">{title}</span>
    </Button>
  );
};

export default QuickAccessButtonsCard