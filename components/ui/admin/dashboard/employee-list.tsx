import { useAppSelector } from "@/store/hooks";
import { Badge } from "../../badge";
import { Button } from "../../button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../dialog";
import { Skeleton } from "../../skeleton";



export default function EmployeeList({ filteredEmployees }: { filteredEmployees: any[] }) {
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
                      <Skeleton className="h-4 w-40 mb-2" /> {/* Employee name */}
                      <Skeleton className="h-3 w-32" /> {/* Position */}
                    </div>
                    <Skeleton className="h-5 w-20 rounded-md" /> {/* Department badge */}
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-5 w-20 rounded-md" /> {/* Status badge */}
                  <Skeleton className="h-8 w-24 rounded-md" /> {/* View Details button */}
                </div>
              </div>
            ))}
          </div>
        )
        :
        (
          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-gray-600">{employee.position}</p>
                    </div>
                    <Badge variant="outline">{employee.department}</Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {employee.status}
                  </Badge>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{employee.name}</DialogTitle>
                        <DialogDescription>Employee details</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-2">
                        <p className="text-sm"><span className="text-gray-600">Position:</span> {employee.position}</p>
                        <p className="text-sm"><span className="text-gray-600">Department:</span> {employee.department}</p>
                        <p className="text-sm"><span className="text-gray-600">Status:</span> {employee.status}</p>
                        {employee.id && (
                          <p className="text-sm text-gray-500">ID: {employee.id}</p>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div >
        )
    )
  )
}