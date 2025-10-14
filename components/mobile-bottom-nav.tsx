"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Home, Clock, Calendar, Users, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface MobileBottomNavProps {
  userType: "employee" | "admin"
}

export function MobileBottomNav({ userType }: MobileBottomNavProps) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const employeeNavItems = [
    { href: "employee-dashboard/dashboard", icon: Home, label: "Home" },
    { href: "employee-submit-timecard/timecard", icon: Clock, label: "Timecard" },
    { href: "employee-history/history", icon: Calendar, label: "History" },
    { href: "employee-profile/profile", icon: Settings, label: "Profile" }, 
  ]

  const adminNavItems = [
    { href: "admin-dashboard/dashboard", icon: Home, label: "Dashboard" },
    { href: "admin-review-timecards/timecards", icon: Clock, label: "Review" },
    { href: "admin-manage-employees/employees", icon: Users, label: "Employees" },
    { href: "admin-reports/reports", icon: Calendar, label: "Reports" },
  ]

  const navItems = userType === "admin" ? adminNavItems : employeeNavItems

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-4 gap-1 p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`flex flex-col items-center space-y-1 h-16 w-full ${
                  isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? "text-blue-600" : ""}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
