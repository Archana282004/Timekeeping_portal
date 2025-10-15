"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SimpleReactValidator from "simple-react-validator";
import { useRef, useState } from "react";

interface LoginProps {
  loginData: { email: string; password: string }
  setLoginData: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>
  handleLogin: (data: { email: string; password: string }) => void
}

export const Login = ({ loginData, setLoginData, handleLogin }: LoginProps) => {
  const simpleValidator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState<number>();
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {debugger
  e.preventDefault();
  simpleValidator.current.showMessages();

  const isValid = simpleValidator.current.allValid();
  if (!isValid) {
    forceUpdate(Date.now());
    return;
  }

  // Pass **current input values** explicitly
  const log = {
    email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value,
    password: (e.currentTarget.elements.namedItem("password") as HTMLInputElement).value,
  };

  handleLogin(log); // pass only data, not event
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        />
        <span className="text-red-500">
          {simpleValidator.current.message("email", loginData.email, "required|email")}
        </span>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
        <span className="text-red-500">
          {simpleValidator.current.message("password", loginData.password, "required|min:6")}
        </span>
      </div>

      <Button type="submit" className="w-full">
        Sign In
      </Button>

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
  );
};
