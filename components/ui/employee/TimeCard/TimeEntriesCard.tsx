import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../../card"
import { Button } from "../../button"
import { Plus, Minus } from "lucide-react"
import { Label } from "../../label"
import { Input } from "../../input"
import { Textarea } from "../../textarea"
import { Badge } from "../../badge"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "../../dialog"
import { useState } from "react"

export default function TimeEntriesCard({ timeEntries, addTimeEntry, updateTimeEntry, removeTimeEntry }: { timeEntries: any[], addTimeEntry: () => void, updateTimeEntry: (id: string, field: string, value: string | number) => void, removeTimeEntry: (id: string) => void }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)


  // {
  //   id: "1",
  //   employee: "John Doe",
  //   employeeId: "EMP001",
  //   department: "Engineering",
  //   weekEnding: "2024-01-15",
  //   totalHours: 42.5,
  //   regularHours: 40,
  //   overtime: 2.5,
  //   status: "pending",
  //   issues: ["Missing meal break on Tuesday", "Late clock-in on Wednesday"],
  //   dailyEntries: [
  //     { date: "2024-01-08", startTime: "09:00", endTime: "17:30", breakMinutes: 30, hours: 8.0, notes: "" },
  //     {
  //       date: "2024-01-09",
  //       startTime: "09:15",
  //       endTime: "17:45",
  //       breakMinutes: 30,
  //       hours: 8.0,
  //       notes: "Traffic delay",
  //     },
  //     {
  //       date: "2024-01-10",
  //       startTime: "09:00",
  //       endTime: "18:00",
  //       breakMinutes: 15,
  //       hours: 8.75,
  //       notes: "Project deadline",
  //     },
  //     { date: "2024-01-11", startTime: "09:00", endTime: "17:30", breakMinutes: 30, hours: 8.0, notes: "" },
  //     {
  //       date: "2024-01-12",
  //       startTime: "09:00",
  //       endTime: "19:00",
  //       breakMinutes: 60,
  //       hours: 9.0,
  //       notes: "Client meeting",
  //     },
  //   ],
  //   submittedAt: "2024-01-15T10:30:00Z",
  // },


  const [newEntry, setNewEntry] = useState({
    date: '',
    startTime: '',
    endTime: '',
    breakMinutes: 0,
    notes: ''
  })

  const calculateHours = (startTime: string, endTime: string, breakMinutes: number) => {
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    const breakTime = new Date(`1970-01-01T${breakMinutes}m`);
    return (end.getTime() - start.getTime() - breakTime.getTime()) / (1000 * 60 * 60);
  }

  const handleAddEntry = () => {
    if (newEntry.date && newEntry.startTime && newEntry.endTime) {
      addTimeEntry()
      setNewEntry({
        date: '',
        startTime: '',
        endTime: '',
        breakMinutes: 0,
        notes: ''
      })
      setIsAddModalOpen(false)
    }

  //  for add new entry to timeEntries
     //  id: "1",
  //   employee: "John Doe",
  //   employeeId: "EMP001",
  //   department: "Engineering",
  //   weekEnding: "2024-01-15",
  //   totalHours: 42.5,
  //   regularHours: 40,
  //   overtime: 2.5,
  //   status: "pending",
  //   issues: ["Missing meal break on Tuesday", "Late clock-in on Wednesday"],
  // dailyEntries: [
  //   { 
   //    id: "1",
  //     date: "2024-01-08",
  //     startTime: "09:00",
  //     endTime: "17:30",
  //     breakMinutes: 30,
  //     hours: 8.0,
  //     notes: ""
  //   }
  // ]
  // submittedAt: "2024-01-15T10:30:00Z",

  }

  const handleCancel = () => {
    setNewEntry({
      date: '',
      startTime: '',
      endTime: '',
      breakMinutes: 0,
      notes: ''
    })
    setIsAddModalOpen(false)
  }

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daily Time Entries</CardTitle>
              <CardDescription>Enter your start/end times and breaks for each day</CardDescription>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Day
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {timeEntries.map((entry, index) => (
            <div key={entry.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Day {index + 1}</h4>
                {timeEntries.length > 1 && (
                  <Button
                    onClick={() => removeTimeEntry(entry.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`date-${entry.id}`}>Date</Label>
                  <Input
                    id={`date-${entry.id}`}
                    type="date"
                    value={entry.date}
                    onChange={(e) => updateTimeEntry(entry.id, "date", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`start-${entry.id}`}>Start Time</Label>
                  <Input
                    id={`start-${entry.id}`}
                    type="time"
                    value={entry.startTime}
                    onChange={(e) => updateTimeEntry(entry.id, "startTime", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`end-${entry.id}`}>End Time</Label>
                  <Input
                    id={`end-${entry.id}`}
                    type="time"
                    value={entry.endTime}
                    onChange={(e) => updateTimeEntry(entry.id, "endTime", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`break-${entry.id}`}>Break (minutes)</Label>
                  <Input
                    id={`break-${entry.id}`}
                    type="number"
                    min="0"
                    value={entry.breakMinutes}
                    onChange={(e) => updateTimeEntry(entry.id, "breakMinutes", Number.parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`notes-${entry.id}`}>Notes (optional)</Label>
                <Textarea
                  id={`notes-${entry.id}`}
                  placeholder="Add any notes about this day..."
                  value={entry.notes}
                  onChange={(e) => updateTimeEntry(entry.id, "notes", e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded">
                <span>Daily Hours:</span>
                <span className="font-medium">
                  {calculateHours(entry.startTime, entry.endTime, entry.breakMinutes).toFixed(1)}h
                  {calculateHours(entry.startTime, entry.endTime, entry.breakMinutes) > 8 && (
                    <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-800">
                      OT: {(calculateHours(entry.startTime, entry.endTime, entry.breakMinutes) - 8).toFixed(1)}h
                    </Badge>
                  )}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add Day Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Day Entry</DialogTitle>
            <DialogDescription>
              Enter the details for your new time entry. All fields except notes are required.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-date">Date *</Label>
                <Input
                  id="new-date"
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-break">Break (minutes)</Label>
                <Input
                  id="new-break"
                  type="number"
                  min="0"
                  value={newEntry.breakMinutes}
                  onChange={(e) => setNewEntry({...newEntry, breakMinutes: Number.parseInt(e.target.value) || 0})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-start">Start Time *</Label>
                <Input
                  id="new-start"
                  type="time"
                  value={newEntry.startTime}
                  onChange={(e) => setNewEntry({...newEntry, startTime: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-end">End Time *</Label>
                <Input
                  id="new-end"
                  type="time"
                  value={newEntry.endTime}
                  onChange={(e) => setNewEntry({...newEntry, endTime: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-notes">Notes (optional)</Label>
              <Textarea
                id="new-notes"
                placeholder="Add any notes about this day..."
                value={newEntry.notes}
                onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
              />
            </div>

            {/* Preview of calculated hours */}
            {newEntry.startTime && newEntry.endTime && (
              <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded">
                <span>Daily Hours:</span>
                <span className="font-medium">
                  {calculateHours(newEntry.startTime, newEntry.endTime, newEntry.breakMinutes).toFixed(1)}h
                  {calculateHours(newEntry.startTime, newEntry.endTime, newEntry.breakMinutes) > 8 && (
                    <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-800">
                      OT: {(calculateHours(newEntry.startTime, newEntry.endTime, newEntry.breakMinutes) - 8).toFixed(1)}h
                    </Badge>
                  )}
                </span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddEntry}
              disabled={!newEntry.date || !newEntry.startTime || !newEntry.endTime}
            >
              Add Day Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
