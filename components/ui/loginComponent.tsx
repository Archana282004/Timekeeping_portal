"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Shield, Users } from "lucide-react"
import Register from "./Register"
import { Login } from "./Login"
import { useAppDispatch } from "@/store/hooks"
import { login } from "@/store/actions/authAction"


export default function LoginPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const dispatch=useAppDispatch();

  const [registerData, setRegisterData] = useState({
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
    password: "",
    confirmPassword: "",
    role:{
      id: "1",
      name: "employee",
     
    }
  })


  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault()
//    let form={
    
//   "email": "Noemy.Bogisich92@gmail.com",
//   "password": "Bitcot@123"
// }
   let form={
    
  "email": "Madaline_Johnston99@hotmail.com",
  "password": "Bitcot@123"
}
const formData = new FormData();
formData.append('email', 'Madaline_Johnston99@hotmail.com');
formData.append('password', 'Bitcot@123');

      const res = await dispatch(login(formData));
      debugger
    // Mock login - in real app, authenticate with backend
    if (loginData.email.includes("admin")) {
        window.location.href = "/admin-dashboard"
    } else {
      window.location.href = "/employee-dashboard"
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock registration - in real app, create user account
    window.location.href = "/employee-dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Clock className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Timekeeping Portal</h1>
          <p className="text-gray-600 mt-2">Secure employee time tracking system</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Login
                  loginData={loginData}
                  setLoginData={setLoginData}
                  handleLogin={handleLogin}
                />
              </TabsContent>

              <TabsContent value="register">
                <Register
                  registerData={registerData}
                  setRegisterData={setRegisterData}
                  handleRegister={handleRegister}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center">
            <Clock className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm text-gray-600">Time Tracking</span>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm text-gray-600">CA Compliant</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm text-gray-600">Team Management</span>
          </div>
        </div>
      </div>
    </div>
  )
}
