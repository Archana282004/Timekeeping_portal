"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, CheckCircle, Building, Phone, Mail, Coffee } from "lucide-react"
import Link from "next/link"


export default function QuickActions({ company }: { company: any }) {




 


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Manage your time and submissions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Link href="/employee-submit-timecard" className="block">
          <Button className="w-full h-12 text-lg" size="lg">
            <Clock className="mr-2 h-5 w-5" />
            Submit Timecard
          </Button>
        </Link>
        <Link href="/employee-history" className="block">
          <Button variant="outline" className="w-full bg-transparent h-12 text-lg" size="lg">
            <Calendar className="mr-2 h-5 w-5" />
            View History
          </Button>
        </Link>
         <Link href="/employee-updatepassword" className="block">
          <Button variant="outline" className="w-full bg-transparent h-12 text-lg" size="lg">
            <Calendar className="mr-2 h-5 w-5" />
            Update Password
          </Button>
        </Link>
        <div className="grid grid-cols-2 gap-2 md:hidden">
          <Button variant="outline" className="h-10 bg-transparent">
            <Clock className="mr-1 h-4 w-4" />
            Clock In
          </Button>
          <Button variant="outline" className="h-10 bg-transparent">
            <Coffee className="mr-1 h-4 w-4" />
            Break
          </Button>
        </div>
      </CardContent>
    </Card>

    {/* Company Information */}
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="mr-2 h-5 w-5" />
          Company Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h4 className="font-medium">{company.name}</h4>
          <p className="text-sm text-gray-600">{company.address}</p>
        </div>
        <div className="flex items-center text-sm">
          <Phone className="mr-2 h-4 w-4 text-gray-400" />
          {company.phone}
        </div>
        <div className="flex items-center text-sm">
          <Mail className="mr-2 h-4 w-4 text-gray-400" />
          {company.email}
        </div>
        <div className="text-sm">
          <span className="font-medium">Office Hours:</span>
          <br />
          {company.officeHours}
        </div>
      </CardContent>
    </Card>
  </div>
  )
}
