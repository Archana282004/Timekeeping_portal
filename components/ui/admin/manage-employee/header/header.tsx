import { Plus } from "lucide-react";
import { Button } from "../../../button";

interface HeaderProps{
    setIsAddDialogOpen:React.Dispatch<React.SetStateAction<boolean>>
}
const Header = ({setIsAddDialogOpen}:HeaderProps) => {
    return (
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Employee Management
                </h1>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Employee
                </Button>
            </div>
            )
}

export default Header;

            