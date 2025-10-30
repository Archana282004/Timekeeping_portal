"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import SimpleReactValidator from "simple-react-validator";
import { useRef, useState, useEffect } from "react";
import { addUser, editUser } from "@/store/actions/adminaction";
import { useAppDispatch } from "@/store/hooks";

interface RegisterData {
  id?: number; 
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: string;
  userStatus: string;
  weeklyHours: number;
  overtimeHours: number;
  company_name: string;
  company_address: string;
  company_phone: string;
  company_email: string;
  company_office_hours: string;
  password: string;
  status: string;
  role:string
}

interface AddEmployeeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEmployee?: (employeeData: RegisterData) => void;
  departments?: string[];
  mode?: "add" | "edit";
  initialEmployee?: Partial<RegisterData> | null;
  onUpdateEmployee?: (employeeData: RegisterData) => void;
}

const AddEmployeeDialog = ({
  isOpen,
  onClose,
  onAddEmployee,
  departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Operations",
  ],
  mode = "add",
  initialEmployee = null,
  onUpdateEmployee,
}: AddEmployeeDialogProps) => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    id: undefined,
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    hireDate: "",
    userStatus: "active",
    weeklyHours: 40,
    overtimeHours: 0,
    company_name: "",
    company_address: "",
    company_phone: "",
    company_email: "",
    company_office_hours: "",
    password: "",
    status: "pending",
    role:"employee"
  });

  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState<number>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialEmployee) {
        setRegisterData({
          id: initialEmployee.id,
          name: initialEmployee.name ?? "",
          email: initialEmployee.email ?? "",
          phone: initialEmployee.phone ?? "",
          position: initialEmployee.position ?? "",
          department: initialEmployee.department ?? "",
          hireDate: initialEmployee.hireDate ?? "",
          userStatus: initialEmployee.userStatus ?? "active",
          weeklyHours: initialEmployee.weeklyHours ?? 40,
          overtimeHours: initialEmployee.overtimeHours ?? 0,
          company_name: initialEmployee.company_name ?? "",
          company_address: initialEmployee.company_address ?? "",
          company_phone: initialEmployee.company_phone ?? "",
          company_email: initialEmployee.company_email ?? "",
          company_office_hours: initialEmployee.company_office_hours ?? "",
          password: initialEmployee.password ?? "Bitcot@123",
          status: initialEmployee.status ?? "pending",
          role:"employee"
        });
      } else {
        setRegisterData({
          id: undefined,
          name: "",
          email: "",
          phone: "",
          position: "",
          department: "",
          hireDate: "",
          userStatus: "active",
          weeklyHours: 40,
          overtimeHours: 0,
          company_name: "",
          company_address: "",
          company_phone: "",
          company_email: "",
          company_office_hours: "",
          password: "Bitcot@123",
          status: "pending",
          role:"employee"
        });
      }
      simpleValidator.current.hideMessages();
    }
  }, [isOpen, mode, initialEmployee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simpleValidator.current.showMessages();

    if (!simpleValidator.current.allValid()) {
      forceUpdate(Date.now());
      return;
    }

    if (mode === "edit") {
      const updatePayload: RegisterData = {
        ...registerData,
        department: registerData.department.toLowerCase(),
        password: registerData.password || "Bitcot@123",
      };

      if (registerData.id) {
        dispatch(editUser(updatePayload, registerData.id));
      }

      onUpdateEmployee?.(updatePayload);
    } else {
      const addPayload: RegisterData = {
        ...registerData,
        department: registerData.department.toLowerCase(),
        company_office_hours: registerData.company_office_hours,
        status: "pending",
        role:"employee",

      };

      dispatch(addUser(addPayload));
      onAddEmployee?.(addPayload);
    }

    onClose();
  };

  const handleClose = () => {
    simpleValidator.current.hideMessages();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {mode === "edit" ? "Edit Employee" : "Add New Employee"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Employee Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, name: e.target.value })
                  }
                  className="h-10"
                />
                <span className="text-red-500 text-sm">
                  {simpleValidator.current.message(
                    "name",
                    registerData.name,
                    "required"
                  )}
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="Enter email"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                  className="h-10"
                />
                <span className="text-red-500 text-sm">
                  {simpleValidator.current.message(
                    "email",
                    registerData.email,
                    "required|email"
                  )}
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={registerData.phone}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, phone: e.target.value })
                  }
                  className="h-10"
                />
                <span className="text-red-500 text-sm">
                  {simpleValidator.current.message(
                    "phone",
                    registerData.phone,
                    "required"
                  )}
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  placeholder="Job position"
                  value={registerData.position}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      position: e.target.value,
                    })
                  }
                  className="h-10"
                />
                <span className="text-red-500 text-sm">
                  {simpleValidator.current.message(
                    "position",
                    registerData.position,
                    "required"
                  )}
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={registerData.department}
                  onValueChange={(value) =>
                    setRegisterData({ ...registerData, department: value })
                  }
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-red-500 text-sm">
                  {simpleValidator.current.message(
                    "department",
                    registerData.department,
                    "required"
                  )}
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hireDate">Hire Date</Label>
                <Input
                  id="hireDate"
                  type="date"
                  value={registerData.hireDate}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      hireDate: e.target.value,
                    })
                  }
                  className="h-10"
                />
                <span className="text-red-500 text-sm">
                  {simpleValidator.current.message(
                    "hireDate",
                    registerData.hireDate,
                    "required"
                  )}
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weeklyHours">Weekly Hours</Label>
                <Input
                  id="weeklyHours"
                  type="number"
                  step="0.5"
                  min="0"
                  max="80"
                  placeholder="40"
                  value={registerData.weeklyHours}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      weeklyHours: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="h-10"
                />
                <span className="text-red-500 text-sm">
                  {simpleValidator.current.message(
                    "weeklyHours",
                    registerData.weeklyHours,
                    "required"
                  )}
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="overtimeHours">Overtime Hours</Label>
                <Input
                  id="overtimeHours"
                  type="number"
                  step="0.5"
                  min="0"
                  placeholder="0"
                  value={registerData.overtimeHours}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      overtimeHours: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="h-10"
                />
                <span className="text-red-500 text-sm">
                  {simpleValidator.current.message(
                    "overtimeHours",
                    registerData.overtimeHours,
                    "required"
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Company Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  value={registerData.company_name}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      company_name: e.target.value,
                    })
                  }
                  className="h-10"
                />
                <span className="text-red-500 text-sm">
                  {simpleValidator.current.message(
                    "companyName",
                    registerData.company_name,
                    "required"
                  )}
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyAddress">Company Address</Label>
                <Input
                  id="companyAddress"
                  placeholder="Enter company address"
                  value={registerData.company_address}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      company_address: e.target.value,
                    })
                  }
                  className="h-10"
                />
                <span className="text-red-500 text-sm">
                  {simpleValidator.current.message(
                    "companyAddress",
                    registerData.company_address,
                    "required"
                  )}
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyPhone">Company Phone</Label>
                <Input
                  id="companyPhone"
                  type="tel"
                  placeholder="Enter company phone"
                  value={registerData.company_phone}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      company_phone: e.target.value,
                    })
                  }
                  className="h-10"
                />
                <span className="text-red-500 text-sm">
                  {simpleValidator.current.message(
                    "companyPhone",
                    registerData.company_phone,
                    "required"
                  )}
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyEmail">Company Email</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  placeholder="Enter company email"
                  value={registerData.company_email}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      company_email: e.target.value,
                    })
                  }
                  className="h-10"
                />
                <span className="text-red-500 text-sm">
                  {simpleValidator.current.message(
                    "companyEmail",
                    registerData.company_email,
                    "required"
                  )}
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="officeHours">Office Hours</Label>
                <Select
                  value={registerData.company_office_hours}
                  onValueChange={(value) =>
                    setRegisterData({
                      ...registerData,
                      company_office_hours: value,
                    })
                  }
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select office hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mon - Fri: 8:00 AM - 5:00 PM">Mon - Fri: 8:00 AM - 5:00 PM</SelectItem>
                    <SelectItem value="Mon - Fri: 8:30 AM - 5:30 PM">Mon - Fri: 8:30 AM - 5:30 PM</SelectItem>
                    <SelectItem value="Mon - Fri: 9:00 AM - 6:00 PM">Mon - Fri: 9:00 AM - 6:00 PM</SelectItem>
                    <SelectItem value="Mon - Fri: 9:30 AM - 6:30 PM">Mon - Fri: 9:30 AM - 6:30 PM</SelectItem>
                    <SelectItem value="Mon - Fri: 10:00 AM - 7:00 PM">Mon - Fri: 10:00 AM - 7:00 PM</SelectItem>
                    <SelectItem value="Mon - Fri: 10:30 AM - 7:30 PM">Mon - Fri: 10:30 AM - 7:30 PM</SelectItem>
                    <SelectItem value="Mon - Fri: 11:00 AM - 8:00 PM">Mon - Fri: 11:00 AM - 8:00 PM</SelectItem>
                    <SelectItem value="Mon - Fri: 11:30 AM - 8:30 PM">Mon - Fri: 11:30 AM - 8:30 PM</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-red-500 text-sm">
                  {simpleValidator.current.message(
                    "officeHours",
                    registerData.company_office_hours,
                    "required"
                  )}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === "edit" ? "Save Changes" : "Create Account"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;
