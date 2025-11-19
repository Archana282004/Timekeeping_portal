"use client"

import { Navigation } from "@/components/navigation"
import AnalyticsDashboard from "./analytics-dashboard"
import DepartmentHoursDistribution from "./department-hours-distribution"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useEffect } from "react"
import { departmentsdata, weekhourdata } from "@/store/actions/admin-action"
import PageHeader from "../../pageheader"

const Reports = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(weekhourdata()),
      dispatch(departmentsdata())
  }, [])
  const weeklyHoursData = useAppSelector((state) => state.admin.weeklyHoursData);
  const departmentHoursData = useAppSelector((state) => state.admin.departmentHoursData);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="admin" />

      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Reports & Analytics"
          description="Generate and view comprehensive reports on employee timekeeping"
        />


        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Hours Chart */}
          <AnalyticsDashboard weeklyHoursData={weeklyHoursData} />

          {/* Department Hours Distribution */}
          <DepartmentHoursDistribution departmentHoursData={departmentHoursData} />
        </div>


      </div>
    </div>
  )
}

export default Reports;