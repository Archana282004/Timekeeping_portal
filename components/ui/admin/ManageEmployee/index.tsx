"use client"

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { addUser, editUser, FetchUser } from "@/store/actions/userAction";
import AddEmployeeDialog from "../AddEmployeeDialog";
import EmployeeList from "./EmployeeList";
import StatsOverview from "./StatsOverview";
import Filters from "./Filters";
import NoEmployees from "./NoEmployees";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";

export default function EmployeeManagementPage() {
  const dispatch = useDispatch<AppDispatch>();
  const userlist = useSelector((state: RootState) => state.user.userlist);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"];

\

  const filteredEmployees = userlist.filter(emp => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = departmentFilter === "all" || emp.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || emp.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleAddEmployee = async (employeeData: any) => {
    // Transform form data for API
    const payload = {
      name: employeeData.name,
      email: employeeData.email,
      phone: employeeData.phone,
      position: employeeData.position,
      department: employeeData.department,
      hireDate: employeeData.hireDate,
      status: employeeData.status,
      userStatus: employeeData.userStatus,
      weeklyHours: employeeData.weeklyHours,
      overtimeHours: employeeData.overtimeHours,
      company_name: employeeData.company.name,
      company_address: employeeData.company.address,
      company_phone: employeeData.company.phone,
      company_email: employeeData.company.email,
      company_office_hours: employeeData.company.officeHours,
      password: employeeData.password || "Bitcot@123",
      role: "employee",
    };
    await dispatch(addUser(payload));
    setIsAddDialogOpen(false);
  };

  const handleEditEmployee = async (employee: any) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
    // Fetch fresh data from API for edit
    await dispatch(FetchUser(employee.id));
  };

  const handleUpdateEmployee = async (employeeData: any) => {
    const payload = {
      name: employeeData.name,
      password: employeeData.password || "", // optional
      position: employeeData.position,
      department: employeeData.department,
      status: employeeData.status,
      userStatus: employeeData.userStatus,
      weeklyHours: employeeData.weeklyHours,
      overtimeHours: employeeData.overtimeHours,
      company_name: employeeData.company.name,
      company_address: employeeData.company.address,
      company_phone: employeeData.company.phone,
      company_email: employeeData.company.email,
      company_office_hours: employeeData.company.officeHours,
    };
    await dispatch(editUser(payload, employeeData.id));
    setIsEditDialogOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>

        <StatsOverview employees={filteredEmployees} departments={departments} />
        <Filters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          departments={departments}
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <EmployeeList filteredEmployees={filteredEmployees} handleEditEmployee={handleEditEmployee} handleDeleteEmployee={() => {}} />
        <NoEmployees filteredEmployees={filteredEmployees} />

        {/* Add Employee Dialog */}
        <AddEmployeeDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAddEmployee={handleAddEmployee}
          departments={departments}
          mode="add"
        />

        {/* Edit Employee Dialog */}
        <AddEmployeeDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          departments={departments}
          mode="edit"
          initialEmployee={selectedEmployee}
          onUpdateEmployee={handleUpdateEmployee}
        />
      </div>
    </div>
  );
}
