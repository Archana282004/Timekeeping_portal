"use client"

import Cookies from "js-cookie"
import QuickActions from "./quick-actions"
import CompanyInfo from "./company-info"


const QuickActionsAndCompanyInfo = ({ company }: { company: any })=> {

    const CookieData = Cookies.get('user');
    const user = JSON.parse(CookieData)
    debugger
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <QuickActions />

            {/* Company Information */}
            <CompanyInfo
                user={user}
            />
        </div>
    )
}

export default QuickActionsAndCompanyInfo;