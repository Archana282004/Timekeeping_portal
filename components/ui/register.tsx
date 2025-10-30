"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SimpleReactValidator from "simple-react-validator"
import { useRef, useState } from "react"

interface Company {
  name: string
  address: string
  phone: string
  email: string
  officeHours: string
}

interface RegisterData {
  id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  hireDate: string
  status: string
  weeklyHours: number
  overtimeHours: number
  company: Company
  password: string
  confirmPassword: string
}

interface RegisterProps {
  registerData: RegisterData
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterData>>
  handleRegister: (e: React.FormEvent) => void
}

const Register = ({ registerData, setRegisterData, handleRegister }: RegisterProps) => {
  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"]
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState<number>();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simpleValidator.current.showMessages();
    
    // Custom validation for confirm password
    const confirmPasswordError = validateConfirmPassword();
    const isConfirmPasswordValid = !confirmPasswordError;
    
    const isValid = simpleValidator.current.allValid() && isConfirmPasswordValid;
    if (isValid) {
      handleRegister(e);
    }
    forceUpdate && forceUpdate(Date.now());
  };

  // Custom validation function for confirm password
  const validateConfirmPassword = () => {
    // if (!registerData.confirmPassword) {
    //   return "Confirm password is required";
    // }
    if (registerData.password !== registerData.confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          value={registerData.name}
          onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
        />
        <span className="text-red-500">{simpleValidator.current.message("name", registerData.name, "required")}</span>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="reg-email">Email</Label>
        <Input
          id="reg-email"
          type="email"
          placeholder="Enter your email"
          value={registerData.email}
          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
        />
        <span className="text-red-500">{simpleValidator.current.message("email", registerData.email, "required|email")}</span>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={registerData.phone}
          onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
        />
        <span className="text-red-500">{simpleValidator.current.message("phone", registerData.phone, "required")}</span>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="position">Position</Label>
        <Input
          id="position"
          placeholder="Your job position"
          value={registerData.position}
          onChange={(e) => setRegisterData({ ...registerData, position: e.target.value })}
        />
        <span className="text-red-500">{simpleValidator.current.message("position", registerData.position, "required")}</span>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select
          value={registerData.department}
          onValueChange={(value) => setRegisterData({ ...registerData, department: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-red-500">{simpleValidator.current.message("department", registerData.department, "required")}</span>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hireDate">Hire Date</Label>
        <Input
          id="hireDate"
          type="date"
          value={registerData.hireDate}
          onChange={(e) => setRegisterData({ ...registerData, hireDate: e.target.value })}
        />
        <span className="text-red-500">{simpleValidator.current.message("hireDate", registerData.hireDate, "required")}</span>
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
        />
        <span className="text-red-500">{simpleValidator.current.message("weeklyHours", registerData.weeklyHours, "required")}</span>
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
        />
        <span className="text-red-500">{simpleValidator.current.message("overtimeHours", registerData.overtimeHours, "required")}</span>
      </div>

      {/* Company Information Section */}
      <div className="space-y-4 border-t pt-4">
        <h3 className="text-lg font-medium text-gray-900">Company Information</h3>
        
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
          />
          <span className="text-red-500">{simpleValidator.current.message("companyName", registerData.company.name, "required")}</span>
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
          />
          <span className="text-red-500">{simpleValidator.current.message("companyAddress", registerData.company.address, "required")}</span>
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
          />
          <span className="text-red-500">{simpleValidator.current.message("companyPhone", registerData.company.phone, "required")}</span>
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
          />
          <span className="text-red-500">{simpleValidator.current.message("companyEmail", registerData.company.email, "required")}</span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="officeHours">Office Hours</Label>
          <Input
            id="officeHours"
            placeholder="e.g., Mon - Fri: 9:00 AM - 6:00 PM"
            value={registerData.company.officeHours}
            onChange={(e) => setRegisterData({ 
              ...registerData, 
              company: { ...registerData.company, officeHours: e.target.value }
            })}
          />
          <span className="text-red-500">{simpleValidator.current.message("officeHours", registerData.company.officeHours, "required")}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="reg-password">Password</Label>
        <Input
          id="reg-password"
          type="password"
          placeholder="Create a password"
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        />
        <span className="text-red-500">{simpleValidator.current.message("password", registerData.password, "required|min:6")}</span>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="reg-confirm-password">Confirm Password</Label>
        <Input
          id="reg-confirm-password"
          type="password"
          placeholder="Confirm your password"
          value={registerData.confirmPassword}
          onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
        />
        <span className="text-red-500">{validateConfirmPassword()}</span>
      </div>
      
      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
  )
}

export default Register
