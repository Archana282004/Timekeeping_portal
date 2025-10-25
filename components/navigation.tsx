"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Clock, Users, FileText, Settings, LogOut, Menu, Home, Calendar, Cookie } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { MobileBottomNav } from "./mobile-bottom-nav"
import { useAppDispatch } from "@/store/hooks"
import Cookies from "js-cookie";
import { logout } from "@/store/actions/authAction"

interface NavigationProps {
  userType: "employee" | "admin"
}

export function Navigation({ userType }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const employeeLinks = [
    { href: "/employee-dashboard", label: "Dashboard", icon: Home },
    {
      href: "/employee-submit-timecard",
      label: "Submit Timecard",
      icon: Clock,
      // Add active patterns for related routes
      activePatterns: [
        "/employee-submit-timecard",
        "/employee-timecard-quickview",
        "/employee-timecard-standardview",
      ]
    },
    { href: "/employee-history", label: "History", icon: Calendar },
    { href: "/employee-updatepassword", label: "Password Update", icon: Cookie }
  ]

  const adminLinks = [
    { href: "/admin-dashboard", label: "Dashboard", icon: Home },
    { href: "/admin-review-timecards", label: "Review Timecards", icon: FileText },
    { href: "/admin-manage-employees", label: "Manage Employees", icon: Users },
    { href: "/admin-reports", label: "Reports", icon: Calendar },
  ]

  const links = userType === "admin" ? adminLinks : employeeLinks

  // Helper function to check if link is active
  const isLinkActive = (link: any) => {

    if (link.activePatterns) {
      return link.activePatterns.some((pattern: string) => pathname.startsWith(pattern))
    }
    return pathname === link.href
  }

  const refresh = Cookies.get("refresh_token");
  const dispatch = useAppDispatch()
  const router = useRouter();
  const handleLogout = async () => { 
    const response = await logout();
    router.push("/login");
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={userType === "admin" ? "/admin-dashboard" : "/employee-dashboard"} className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Timekeeping Portal</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {links.map((link) => {
                const isActive = isLinkActive(link)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center space-x-2 transition-colors px-3 py-2 rounded-md ${isActive
                        ? "text-blue-600 bg-blue-50 font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    <link.icon className={`h-4 w-4 ${isActive ? "text-blue-600" : ""}`} />
                    <span>{link.label}</span>
                  </Link>
                )
              })}

              <div className="flex items-center space-x-4 border-l pl-4">
                <span className="text-sm text-gray-600">{userType === "admin" ? "Admin" : "Employee"}</span>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to logout? You will need to sign in again to access your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>
                        Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col space-y-4 mt-8">
                    {links.map((link) => {
                      const isActive = isLinkActive(link)
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 transition-colors p-2 rounded-lg ${isActive
                              ? "text-blue-600 bg-blue-50 font-medium"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            }`}
                        >
                          <link.icon className={`h-5 w-5 ${isActive ? "text-blue-600" : ""}`} />
                          <span>{link.label}</span>
                        </Link>
                      )
                    })}

                    <div className="border-t pt-4">
                      <div className="flex items-center space-x-3 p-2 text-sm text-gray-600">
                        <Settings className="h-4 w-4" />
                        <span>{userType === "admin" ? "Admin Panel" : "Employee Portal"}</span>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" className="w-full justify-start mt-2">
                            <LogOut className="h-4 w-4 mr-3" />
                            Logout
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to logout? You will need to sign in again to access your account.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLogout}>
                              Logout
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Add padding for mobile bottom nav */}
        <div className="md:hidden h-20" />
      </nav>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav userType={userType} />
    </>
  )
}