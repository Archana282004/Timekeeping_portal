import { Card, CardContent } from "../../card"
import { Search } from "lucide-react"
import { Input } from "../../input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../select"

export default function Filters({ searchTerm,departments, setSearchTerm, departmentFilter, setDepartmentFilter, statusFilter, setStatusFilter }: { searchTerm: string, departments: any[], setSearchTerm: (value: string) => void, departmentFilter: string, setDepartmentFilter: (value: string) => void, statusFilter: string, setStatusFilter: (value: string) => void }) {
  return (
    <Card className="mb-6">
    <CardContent className="pt-6">
      <div className="flex flex-col sm:flex-row gap-4">
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
            {departments?.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>
  )
}