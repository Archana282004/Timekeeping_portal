"use client";

import { CardDescription, CardHeader, CardTitle } from "../../../card";
import { Button } from "../../../button";
import { useState } from "react";
import AddEmployeeDialog from "../../add-employee-dialog";
import Header from "@/components/ui/header";

const EmployeeManagement = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddEmployee = (employeeData: any) => {
    console.log("New Employee data:", employeeData);
  };

  return (
    <>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Header
            title="Employee Management"
            description="View and manage employee information"
          />
          <Button onClick={() => setIsAddDialogOpen(true)}>Add Employee</Button>
        </div>
      </CardHeader>

      <AddEmployeeDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddEmployee={handleAddEmployee}
      />
    </>
  );
}

export default EmployeeManagement;