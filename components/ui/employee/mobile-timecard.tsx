"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Square, Coffee, AlertTriangle } from "lucide-react"

export function MobileTimecard() {
  const [isClocked, setIsClocked] = useState(true)
  const [onBreak, setOnBreak] = useState(false)
  const [currentTime, setCurrentTime] = useState("14:32:15")
  const [todayHours, setTodayHours] = useState(5.5)

  const handleClockToggle = () => {
    setIsClocked(!isClocked)
    if (onBreak) setOnBreak(false)
  }

  const handleBreakToggle = () => {
    if (isClocked) {
      setOnBreak(!onBreak)
    }
  }

  return (
    <div className="space-y-4">
      {/* Live Clock Display */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="text-4xl font-mono font-bold mb-2">{currentTime}</div>
            <div className="text-blue-100">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Current Status</h3>
              <div className="flex items-center space-x-2 mt-1">
                <div
                  className={`w-3 h-3 rounded-full ${
                    onBreak ? "bg-orange-500" : isClocked ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                <span className="text-sm">{onBreak ? "On Break" : isClocked ? "Clocked In" : "Clocked Out"}</span>
              </div>
            </div>
            <Badge variant={isClocked ? "default" : "secondary"}>{todayHours.toFixed(1)}h today</Badge>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleClockToggle}
              className={`h-16 ${isClocked ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
            >
              {isClocked ? (
                <>
                  <Square className="mr-2 h-5 w-5" />
                  Clock Out
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Clock In
                </>
              )}
            </Button>

            <Button
              onClick={handleBreakToggle}
              disabled={!isClocked}
              variant={onBreak ? "destructive" : "outline"}
              className="h-16"
            >
              {onBreak ? (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  End Break
                </>
              ) : (
                <>
                  <Coffee className="mr-2 h-5 w-5" />
                  Start Break
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Today's Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Today's Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Clock In Time:</span>
            <span className="font-medium">9:00 AM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Hours Worked:</span>
            <span className="font-medium">{todayHours}h</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Breaks Taken:</span>
            <span className="font-medium">2 (45 min)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Remaining Break:</span>
            <span className="font-medium text-green-600">15 min</span>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Alert */}
      {todayHours > 5 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-orange-800">Break Reminder</p>
                <p className="text-xs text-orange-700 mt-1">
                  You've worked {todayHours} hours. California law requires a 30-minute meal break.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
