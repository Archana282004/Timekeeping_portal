import { Card, CardContent } from "../../../card";
import { Users } from "lucide-react";

const NoEmployees = ({ filteredEmployees }: { filteredEmployees: any[] }) =>{
  return (
    <>
      {filteredEmployees.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No employees found matching your criteria.</p>
              </div>
            </CardContent>
          </Card>
        )}
    </>
  )
}

export default NoEmployees;