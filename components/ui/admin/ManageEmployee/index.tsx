"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Label } from "@/components/ui/label"
import { Users, Search, Download, Plus, Edit, Trash2, Mail, Phone } from "lucide-react"
import { Navigation } from "@/components/navigation"
import StatsOverview from "./StatsOverview"
import Filters from "./Filters"
import NoEmployees from "./NoEmployees"
import EmployeeList from "./EmployeeList"
import AddEmployeeDialog from "../AddEmployeeDialog"

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  hireDate: string
  status: "active" | "inactive"
  weeklyHours: number
  overtimeHours: number
  company: {
    name: string,
    address: string,
    phone: string,
    email: string,
    officeHours: string,
  },
}

export default function EmployeeManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Mock employee data
  const employees: Employee[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@company.com",
      phone: "(555) 123-4567",
      position: "Software Developer",
      department: "Engineering",
      hireDate: "2023-01-15",
      status: "active",
      weeklyHours: 42.5,
      overtimeHours: 2.5,
      company: {
        name: "Tech Innovators Ltd.",
        address: "123 Innovation Park, Silicon Valley, CA 94043, USA",
        phone: "+1 (555) 123-4567",
        email: "contact@techinnovators.com",
        officeHours: "Mon - Fri: 9:00 AM - 6:00 PM",
      },
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@company.com",
      phone: "(555) 234-5678",
      position: "Marketing Manager",
      department: "Marketing",
      hireDate: "2022-08-20",
      status: "active",
      weeklyHours: 40.0,
      overtimeHours: 0,
      company: {
        name: "Tech Innovators Ltd.",
        address: "123 Innovation Park, Silicon Valley, CA 94043, USA",
        phone: "+1 (555) 123-4567",
        email: "contact@techinnovators.com",
        officeHours: "Mon - Fri: 9:00 AM - 6:00 PM",
      },
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      phone: "(555) 345-6789",
      position: "Sales Representative",
      department: "Sales",
      hireDate: "2023-03-10",
      status: "active",
      weeklyHours: 45.0,
      overtimeHours: 5.0,
      company: {
        name: "Tech Innovators Ltd.",
        address: "123 Innovation Park, Silicon Valley, CA 94043, USA",
        phone: "+1 (555) 123-4567",
        email: "contact@techinnovators.com",
        officeHours: "Mon - Fri: 9:00 AM - 6:00 PM",
      },
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah.wilson@company.com",
      phone: "(555) 456-7890",
      position: "HR Specialist",
      department: "HR",
      hireDate: "2022-11-05",
      status: "active",
      weeklyHours: 38.0,
      overtimeHours: 0,
      company: {
        name: "Tech Innovators Ltd.",
        address: "123 Innovation Park, Silicon Valley, CA 94043, USA",
        phone: "+1 (555) 123-4567",
        email: "contact@techinnovators.com",
        officeHours: "Mon - Fri: 9:00 AM - 6:00 PM",
      },
    },
    {
      id: "5",
      name: "Tom Brown",
      email: "tom.brown@company.com",
      phone: "(555) 567-8901",
      position: "Senior Developer",
      department: "Engineering",
      hireDate: "2021-06-12",
      status: "inactive",
      weeklyHours: 0,
      overtimeHours: 0,
      company: {
        name: "Tech Innovators Ltd.",
        address: "123 Innovation Park, Silicon Valley, CA 94043, USA",
        phone: "+1 (555) 123-4567",
        email: "contact@techinnovators.com",
        officeHours: "Mon - Fri: 9:00 AM - 6:00 PM",
      },
    },
  ]

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || emp.department === departmentFilter
    const matchesStatus = statusFilter === "all" || emp.status === statusFilter
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const exportEmployees = () => {
    // Mock export functionality
  }

  const handleAddEmployee = (employeeData: any) => {
    console.log("New employee data:", employeeData);
    // Add your logic here to handle the new employee data
    // For example, send to API, update state, etc.
    setIsAddDialogOpen(false)
  }

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsEditDialogOpen(true)
  }

  const handleUpdateEmployee = (employeeData: any) => {
    console.log("Updated employee data:", employeeData);
    // Update logic here (API/state)
    setIsEditDialogOpen(false)
    setSelectedEmployee(null)
  }

  const handleDeleteEmployee = (employeeId: string) => {
   
  }

  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="admin" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
              <p className="text-gray-600">Manage employee information and access</p>
            </div>
            <div className="flex space-x-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Export</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to export employee data? This will download all employee information in Excel format.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={exportEmployees}>
                      Export Data
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview employees={filteredEmployees} departments={departments} />

        {/* Filters */}
        <Filters searchTerm={searchTerm} departments={departments}  setSearchTerm={setSearchTerm} departmentFilter={departmentFilter} setDepartmentFilter={setDepartmentFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
       
        {/* Employee List */}
        <EmployeeList filteredEmployees={filteredEmployees} handleEditEmployee={handleEditEmployee} handleDeleteEmployee={handleDeleteEmployee} />
        <NoEmployees filteredEmployees={filteredEmployees} /> 

        {/* Add Employee Dialog */}
        <AddEmployeeDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAddEmployee={handleAddEmployee}
          departments={departments}
          mode="add"
        />

        {/* Edit Employee Dialog (reuse same component) */}
        <AddEmployeeDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          departments={departments}
          mode="edit"
          initialEmployee={selectedEmployee as any}
          onUpdateEmployee={handleUpdateEmployee}
        />
      </div>
    </div>
  )
}
