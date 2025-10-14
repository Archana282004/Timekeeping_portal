import { Card, CardContent } from "../../card"

export default function NoTimeCard({ filteredTimecards }: { filteredTimecards: any[] }) {
  return (
    <>
       {filteredTimecards.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-gray-500">No timecards found matching your criteria.</p>
              </div>
            </CardContent>
          </Card>
        )}
    </>
  )
}