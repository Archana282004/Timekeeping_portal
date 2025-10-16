"use client"

import { CardDescription, CardHeader, CardTitle } from "../../card";
import { Button } from "../../button";
import { useState } from "react";
import AddEmployeeDialog from "../AddEmployeeDialog";

export default function EmployeeManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddEmployee = (employeeData: any) => {
    console.log("New Employee data:", employeeData);
  };

  return (
    <>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Employee Management</CardTitle>
            <CardDescription>View and manage employee information</CardDescription>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            Add Employee
          </Button>
        </div>
      </CardHeader>

      <AddEmployeeDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddEmployee={handleAddEmployee}
      />
    </>
  )
}
