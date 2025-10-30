"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  addUser,
  adminEmployeeCard,
  DeleteUser,
  editUser,
  fetchUsers,
} from "@/store/actions/admin-action";
import AddEmployeeDialog from "../add-employee-dialog";
import EmployeeList from "./employee-list";
import StatsOverview from "./stats-overview";
import Filters from "./filters";
import NoEmployees from "./no-employees";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Navigation } from "@/components/navigation";

export default function EmployeeManagementPage() {
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Operations",
  ];
  const pagination ={
    page:1,
    perPage:25
  }

  useEffect(() => {
    dispatch(adminEmployeeCard());
    dispatch(fetchUsers(pagination))
  }, [dispatch, addUser]);

  const userlist = useSelector((state: RootState) => state.admin.userlist);
  const emp = useAppSelector((state) => state.admin.adminEmployeecardsData);

  const filteredEmployees = userlist.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || emp.department === departmentFilter;
    const matchesStatus =
      statusFilter === "all" || emp.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleAddEmployee = async (employeeData: any) => {
    const payload = {
      ...employeeData,
      role: "employee",
      password: employeeData.password || "Bitcot@123",
    };
    await dispatch(addUser(payload));
    setIsAddDialogOpen(false);
  };

  const handleEditEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
  };

  const handleDeleteEmployee = async (employeeId: any) => {
    await dispatch(DeleteUser(employeeId));
  };

  const handleUpdateEmployee = async (employeeData: any) => {
    await dispatch(editUser(employeeData, employeeData.id));
    setIsEditDialogOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="admin" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Employee Management
          </h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Employee
          </Button>
        </div>

        <StatsOverview employees={emp} departments={departments} />

        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          departments={departments}
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <EmployeeList
          filteredEmployees={filteredEmployees}
          handleEditEmployee={handleEditEmployee}
          handleDeleteEmployee={handleDeleteEmployee}
        />

        <NoEmployees filteredEmployees={filteredEmployees} />

        <AddEmployeeDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAddEmployee={handleAddEmployee}
          departments={departments}
          mode="add"
        />

        <AddEmployeeDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onUpdateEmployee={handleUpdateEmployee}
          departments={departments}
          mode="edit"
          initialEmployee={selectedEmployee}
        />
      </div>
    </div>
  );
}
