import { useAppSelector } from "@/store/hooks";
import { Skeleton } from "../../../../skeleton";
import EmployeeListCard from "./employee-list-card";



const EmployeeList = ({ filteredEmployees }: { filteredEmployees: any[] }) => {
  const loading = useAppSelector((state) => state.admin.user)
  return (
    (
      loading ?
        (
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                {/* Left Section */}
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <Skeleton className="h-4 w-40 mb-2" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="h-5 w-20 rounded-md" />
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-5 w-20 rounded-md" />
                  <Skeleton className="h-8 w-24 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        )
        :
        (
          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <EmployeeListCard
                employee={employee}
              />
            ))}
          </div >
        )
    )
  )
}

export default EmployeeList;