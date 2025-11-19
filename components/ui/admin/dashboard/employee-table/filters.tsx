import { Search } from "lucide-react"
import { Input } from "../../../input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../select"

interface FiltersProps {
    searchTerm: string,
  setSearchTerm: (value: string) => void,
  departmentFilter: string,
  setDepartmentFilter: (value: string) => void
}
const Filters = ({ searchTerm, setSearchTerm, departmentFilter, setDepartmentFilter }: FiltersProps)=> {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Filter by department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          <SelectItem value="Engineering">Engineering</SelectItem>
          <SelectItem value="Marketing">Marketing</SelectItem>
          <SelectItem value="Sales">Sales</SelectItem>
          <SelectItem value="HR">HR</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default Filters;