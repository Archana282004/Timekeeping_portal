"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "../../card"
import { Badge } from "../../badge"
import { Button } from "../../button"
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
} from "../../alert-dialog"
import { Pagination } from "../../../pagination"

export default function EmployeeList({
  filteredEmployees,
  handleEditEmployee,
  handleDeleteEmployee,
}: {
  filteredEmployees: any[]
  handleEditEmployee: (employee: any) => void
  handleDeleteEmployee: (employeeId: string) => void
}) {
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
                    <div>
                      <p className="text-sm text-gray-600">Hire Date</p>
                      <p className="font-medium">{employee.hireDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Weekly Hours</p>
                      <p className="font-medium">{employee.weeklyHours}h</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Overtime</p>
                      <p className="font-medium text-orange-600">{employee.overtimeHours}h</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Employee ID</p>
                      <p className="font-medium">EMP{employee?.id}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => handleEditEmployee(employee)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Delete Employee</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {employee.name}? This action cannot be undone and will permanently remove the employee from the system.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete Employee
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
