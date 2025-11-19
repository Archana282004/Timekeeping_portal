import { Badge } from "@/components/ui/badge"

interface EntryCradProps{
    entry:any;
    index:number;
}
const EntryCard = ({entry, index}: EntryCradProps) =>{
    return(
        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{entry.date}</p>
                    <p className="text-sm text-gray-600">
                      {entry.hours}h total {entry.overtime > 0 && `(${entry.overtime}h OT)`}
                    </p>
                  </div>
                  <Badge
                    variant={entry.status === "approved" ? "default" : "secondary"}
                    className={entry.status === "approved" ? "bg-green-100 text-green-800" : ""}
                  >
                    {entry.status}
                  </Badge>
                </div>
    )
}

export default EntryCard;