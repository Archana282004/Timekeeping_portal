import { Card, CardContent } from "@/components/ui/card"
import EmployeeManagement from "./employee-management"
import Filters from "./filters"
import EmployeeList from "./employee-list"

interface EmployeeTableProps {
    searchTerm: string,
    setSearchTerm: (value: string) => void,
    departmentFilter: string,
    setDepartmentFilter: (value: string) => void,
    filteredEmployees: any[]
}
const EmployeeTable = ({ searchTerm, setSearchTerm, departmentFilter,setDepartmentFilter, filteredEmployees }: EmployeeTableProps) => {
    return (
        <Card>
            <EmployeeManagement />
            <CardContent>
                {/* Filters */}
                <Filters searchTerm={searchTerm} setSearchTerm={setSearchTerm} departmentFilter={departmentFilter} setDepartmentFilter={setDepartmentFilter} />

                {/* Employee List */}
                <EmployeeList filteredEmployees={filteredEmployees} />

            </CardContent>
        </Card>
    )
}

export default EmployeeTable;