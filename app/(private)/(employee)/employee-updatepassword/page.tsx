"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SimpleReactValidator from "simple-react-validator"
import { useAppDispatch } from "@/store/hooks"
import { updateUserPassword } from "@/store/actions/userAction"
import { Navigation } from "@/components/navigation"

interface UpdatePasswordTabProps {
  userId: string
}

const UpdatePasswordTab = ({ userId }: UpdatePasswordTabProps) => {
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" })
  const simpleValidator = useRef(new SimpleReactValidator())
  const [, forceUpdate] = useState<number>()
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    simpleValidator.current.showMessages()
    const isValid = simpleValidator.current.allValid()

    if (isValid) {
      dispatch(updateUserPassword({ userId, ...passwordData }))
      setPasswordData({ oldPassword: "", newPassword: "" })
    }

    forceUpdate(Date.now())
    simpleValidator.current.hideMessages()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation userType="employee" />

      <div className="flex flex-1 justify-center items-center bg-gray-50">
        <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Update Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="oldPassword">Old Password</Label>
              <Input
                id="oldPassword"
                type="password"
                value={passwordData.oldPassword}
                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
              />
              <span className="text-red-500 text-sm">
                {simpleValidator.current.message("oldPassword", passwordData.oldPassword, "required")}
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
              <span className="text-red-500 text-sm">
                {simpleValidator.current.message("newPassword", passwordData.newPassword, "required")}
              </span>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" className="w-full">Update Password</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdatePasswordTab
