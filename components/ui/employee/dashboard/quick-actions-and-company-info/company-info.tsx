import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Mail, Phone } from "lucide-react";

interface CompanyInfoProps {
    user: any
}
const CompanyInfo = ({ user }: CompanyInfoProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Building className="mr-2 h-5 w-5" />
                    Company Information
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div>
                    <h4 className="font-medium">{user.company_name}</h4>
                    <p className="text-sm text-gray-600">{user.company_address}</p>
                </div>
                <div className="flex items-center text-sm">
                    <Phone className="mr-2 h-4 w-4 text-gray-400" />
                    {user.company_phone}
                </div>
                <div className="flex items-center text-sm">
                    <Mail className="mr-2 h-4 w-4 text-gray-400" />
                    {user.company_email}
                </div>
                <div className="text-sm">
                    <span className="font-medium">Office Hours:</span>
                    <br />
                    {user.company_office_hours}
                </div>
            </CardContent>
        </Card>
    )
}

export default CompanyInfo;