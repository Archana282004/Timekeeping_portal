"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Mail, Phone } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Pagination } from "@/components/pagination"
import EmployeeListOverviewCard from "./employee-list-overview-card"
import AlertDialogCard from "./alert-dialog"

interface EmployeeListProps {
  filteredEmployees: any[]
  handleEditEmployee: (employee: any) => void
  handleDeleteEmployee: (employeeId: string) => void
}
const EmployeeList = ({ filteredEmployees, handleEditEmployee, handleDeleteEmployee, }: EmployeeListProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  useEffect(() => {
    setCurrentPage(1)
  }, [filteredEmployees])

  const totalItems = filteredEmployees.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => setCurrentPage(page)
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }

  return (
    <>
      <div className="space-y-4">
        {paginatedEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{employee.name}</h3>
                      <p className="text-sm text-gray-600">{employee.position}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="mr-1 h-4 w-4" />
                          {employee.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="mr-1 h-4 w-4" />
                          {employee.phone}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{employee.department}</Badge>
                      <Badge
                        variant={employee.status === "active" ? "default" : "secondary"}
                        className={employee.status === "active" ? "bg-green-100 text-green-800" : ""}
                      >
                        {employee.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <EmployeeListOverviewCard
                      title="Hire Date"
                      description={employee.hireDate}
                    />
                    <EmployeeListOverviewCard
                      title="Weekly Hours"
                      description={`${employee.weeklyHours}h`}
                    />
                    <EmployeeListOverviewCard
                      title="Overtime"
                      description={`${employee.overtimeHours}h`}
                    />
                    <EmployeeListOverviewCard
                      title="Employee ID"
                      description={`EMP${employee?.id}`}
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => handleEditEmployee(employee)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>

                  <AlertDialogCard
                    employee={employee}
                    handleDeleteEmployee={handleDeleteEmployee}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPageOptions={[5, 10, 20, 50]}
        />
      )}
    </>
  )
}

export default EmployeeList;