"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import SimpleReactValidator from "simple-react-validator"
import { useRef, useState, useEffect } from "react"
import { addUser, editUser } from "@/store/actions/userAction"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

interface Company {
  name: string
  address: string
  phone: string
  email: string 
  officeHours: string
}

interface RegisterData {
  name: string
  email: string
  phone: string
  position: string
  department: string
  hireDate: string
  userStatus: string
  weeklyHours: number
  overtimeHours: number
  company: Company
  password: string
  status: string
}

interface AddEmployeeDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddEmployee?: (employeeData: RegisterData) => void
  departments?: string[]
  // added props for edit mode reuse
  mode?: "add" | "edit"
  initialEmployee?: Partial<RegisterData> | null
  onUpdateEmployee?: (employeeData: RegisterData) => void
}

const AddEmployeeDialog = ({ 
  isOpen, 
  onClose, 
  onAddEmployee,
  departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"],
  mode = "add",
  initialEmployee = null,
  onUpdateEmployee
}: AddEmployeeDialogProps) => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    id: "",
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    hireDate: "",
    userStatus: "active",
    weeklyHours: 40,
    overtimeHours: 0,
    company: {
      name: "",
      address: "",
      phone: "",
      email: "",
      officeHours: ""
    },
    password: "",
    status: "pending"
  });

  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState<number>();

  // Reset or prefill form when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialEmployee) {
        setRegisterData({
          name: initialEmployee.name ?? "",
          email: initialEmployee.email ?? "",
          phone: initialEmployee.phone ?? "",
          position: initialEmployee.position ?? "",
          department: initialEmployee.department ?? "",
          hireDate: initialEmployee.hireDate ?? "",
          userStatus: (initialEmployee as any).userStatus ?? "active",
          weeklyHours: (initialEmployee as any).weeklyHours ?? 40,
          overtimeHours: (initialEmployee as any).overtimeHours ?? 0,
          company: {
            name: (initialEmployee.company as any)?.name ?? "",
            address: (initialEmployee.company as any)?.address ?? "",
            phone: (initialEmployee.company as any)?.phone ?? "",
            email: (initialEmployee.company as any)?.email ?? "",
            officeHours: (initialEmployee.company as any)?.officeHours ?? "",
          },
          password: "", // not used in edit
          status: "pending"
        });
      } else {
        setRegisterData({
          name: "",
          email: "",
          phone: "",
          position: "",
          department: "",
          hireDate: "",
          userStatus: "active",
          weeklyHours: 40,
          overtimeHours: 0,
          company: {
            name: "",
            address: "",
            phone: "",
            email: "",
            officeHours: ""
          },
            password: "",
          status: "pending"
        });
      }
      simpleValidator.current.hideMessages();
    }
  }, [isOpen, mode, initialEmployee]);

  const dispatch = useAppDispatch();
  
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  simpleValidator.current.showMessages();

  const isValid = simpleValidator.current.allValid();

  if (!isValid) {
    forceUpdate && forceUpdate(Date.now());
    return;
  }

  // Prepare API body
  const payload = {
    name: registerData.name,
    email: registerData.email,
    phone: registerData.phone,
    position: registerData.position,
    department: registerData.department.toLowerCase(),
    hireDate: registerData.hireDate,
    status: registerData.status,
    userStatus: registerData.userStatus,
    weeklyHours: registerData.weeklyHours,
    overtimeHours: registerData.overtimeHours,
    company_name: registerData.company.name,
    company_address: registerData.company.address,
    company_phone: registerData.company.phone,
    company_email: registerData.company.email,
    company_office_hours: registerData.company.officeHours,
    password: mode === "add" ? "Bitcot@123" : undefined,
    role: "employee"
  };

  if (mode === "edit") {
    dispatch(editUser(payload,6));
    onUpdateEmployee?.(payload);
  } else {
    dispatch(addUser(payload));
    onAddEmployee?.(payload);
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
          <DialogTitle className="text-2xl font-bold text-gray-900">{mode === "edit" ? "Edit Employee" : "Add New Employee"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Employee Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Employee Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  className="h-10"
                />
                <span className="text-red-500 text-sm">{simpleValidator.current.message("name", registerData.name, "required")}</span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="Enter email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="h-10"
                />
                <span className="text-red-500 text-sm">{simpleValidator.current.message("email", registerData.email, "required|email")}</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                  className="h-10"
                />
                <span className="text-red-500 text-sm">{simpleValidator.current.message("phone", registerData.phone, "required")}</span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  placeholder="Job position"
                  value={registerData.position}
                  onChange={(e) => setRegisterData({ ...registerData, position: e.target.value })}
                  className="h-10"
                />
                <span className="text-red-500 text-sm">{simpleValidator.current.message("position", registerData.position, "required")}</span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={registerData.department}
                  onValueChange={(value) => setRegisterData({ ...registerData, department: value })}
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
                <span className="text-red-500 text-sm">{simpleValidator.current.message("department", registerData.department, "required")}</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hireDate">Hire Date</Label>
                <Input
                  id="hireDate"
                  type="date"
                  value={registerData.hireDate}
                  onChange={(e) => setRegisterData({ ...registerData, hireDate: e.target.value })}
                  className="h-10"
                />
                <span className="text-red-500 text-sm">{simpleValidator.current.message("hireDate", registerData.hireDate, "required")}</span>
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
                  onChange={(e) => setRegisterData({ ...registerData, weeklyHours: parseFloat(e.target.value) || 0 })}
                  className="h-10"
                />
                <span className="text-red-500 text-sm">{simpleValidator.current.message("weeklyHours", registerData.weeklyHours, "required")}</span>
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
                  onChange={(e) => setRegisterData({ ...registerData, overtimeHours: parseFloat(e.target.value) || 0 })}
                  className="h-10"
                />
                <span className="text-red-500 text-sm">{simpleValidator.current.message("overtimeHours", registerData.overtimeHours, "required")}</span>
              </div>
            </div>
          </div>

          {/* Company Information Section */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Company Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  value={registerData.company.name}
                  onChange={(e) => setRegisterData({ 
                    ...registerData, 
                    company: { ...registerData.company, name: e.target.value }
                  })}
                  className="h-10"
                />
                <span className="text-red-500 text-sm">{simpleValidator.current.message("companyName", registerData.company.name, "required")}</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyAddress">Company Address</Label>
                <Input
                  id="companyAddress"
                  placeholder="Enter company address"
                  value={registerData.company.address}
                  onChange={(e) => setRegisterData({ 
                    ...registerData, 
                    company: { ...registerData.company, address: e.target.value }
                  })}
                  className="h-10"
                />
                <span className="text-red-500 text-sm">{simpleValidator.current.message("companyAddress", registerData.company.address, "required")}</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyPhone">Company Phone</Label>
                <Input
                  id="companyPhone"
                  type="tel"
                  placeholder="Enter company phone"
                  value={registerData.company.phone}
                  onChange={(e) => setRegisterData({ 
                    ...registerData, 
                    company: { ...registerData.company, phone: e.target.value }
                  })}
                  className="h-10"
                />
                <span className="text-red-500 text-sm">{simpleValidator.current.message("companyPhone", registerData.company.phone, "required")}</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyEmail">Company Email</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  placeholder="Enter company email"
                  value={registerData.company.email}
                  onChange={(e) => setRegisterData({ 
                    ...registerData, 
                    company: { ...registerData.company, email: e.target.value }
                  })}
                  className="h-10"
                />
                <span className="text-red-500 text-sm">{simpleValidator.current.message("companyEmail", registerData.company.email, "required")}</span>
              </div>
{/* Office Hours */}
<div className="space-y-2">
  <Label htmlFor="officeHours">Office Hours</Label>

  <Select
    value={registerData.company.officeHours}
    onValueChange={(value) =>
      setRegisterData({
        ...registerData,
        company: { ...registerData.company, officeHours: value },
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
      registerData.company.officeHours,
      "required"
    )}
  </span>
</div>

{/* Status */}
<div className="space-y-2">
  <Label htmlFor="status">Status</Label>

  <Select
    value={registerData.status}
    onValueChange={(value) =>
      setRegisterData({ ...registerData, status: value })
    }
  >
    <SelectTrigger className="h-10">
      <SelectValue placeholder="Select status" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="active">Active</SelectItem>
      <SelectItem value="inactive">Inactive</SelectItem>
    </SelectContent>
  </Select>

  <span className="text-red-500 text-sm">
    {simpleValidator.current.message("status", registerData.status, "required")}
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
  )
}

export default AddEmployeeDialog
