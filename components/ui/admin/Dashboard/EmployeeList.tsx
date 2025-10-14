import { Badge } from "../../badge";
import { Button } from "../../button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../dialog";



export default function EmployeeList({ filteredEmployees }: { filteredEmployees: any[] }) {
  return (
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
  </div>
  )
}