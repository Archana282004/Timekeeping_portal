"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SimpleReactValidator from "simple-react-validator"
import { useRef, useState } from "react"
import { Eye, EyeOff } from "lucide-react" // 👈 import icons

interface LoginProps {
  loginData: { email: string; password: string }
  setLoginData: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>
  handleLogin: (data: { email: string; password: string }) => void
}

export const Login = ({ loginData, setLoginData, handleLogin }: LoginProps) => {
  const simpleValidator = useRef(new SimpleReactValidator())
  const [, forceUpdate] = useState<number>()
  const [showPassword, setShowPassword] = useState(false) // 👈 state for toggle

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    simpleValidator.current.showMessages()

    const isValid = simpleValidator.current.allValid()
    if (!isValid) {
      forceUpdate(Date.now())
      return
    }

    const log = {
      email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value,
      password: (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value,
    }

    handleLogin(log)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        />
        <span className="text-red-500 text-sm">
          {simpleValidator.current.message("email", loginData.email, "required|email")}
        </span>
      </div>

      {/* Password with Eye Toggle */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"} // 👈 toggles visibility
            placeholder="Enter your password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />

          {/* 👁️ Eye Icon Button */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <span className="text-red-500 text-sm">
          {simpleValidator.current.message("password", loginData.password, "required|min:6")}
        </span>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Sign In
      </Button>

      {/* Demo Info */}
      <div className="space-y-2 text-sm text-center text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="font-medium text-blue-800">Demo Login Credentials:</p>
        <div className="space-y-1">
          <p className="font-mono text-xs">
            <strong>Employee:</strong> john.doe@company.com / password123
          </p>
          <p className="font-mono text-xs">
            <strong>Admin:</strong> admin@company.com / admin123
          </p>
        </div>
        <p className="text-xs text-blue-600 mt-2">
          Click the email field and use these credentials to login
        </p>
      </div>
    </form>
  )
}
