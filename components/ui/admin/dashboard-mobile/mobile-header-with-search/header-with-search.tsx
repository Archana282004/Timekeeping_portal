import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Filter, Search } from "lucide-react";

export interface MobileHeaderSearchProps {
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>
    showNotifications: boolean
}
const HeaderSearch = ({ searchTerm, setSearchTerm, setShowNotifications, showNotifications }: MobileHeaderSearchProps) => {
    return (
        <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder="Search employees, timecards..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>
            <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
            >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                </span>
            </Button>
        </div>
    )
}

export default HeaderSearch;