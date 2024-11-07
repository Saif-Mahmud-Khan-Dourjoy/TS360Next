import React from "react"
import EditAccount from "./EditAccount"
import UpdatePassword from "./UpdatePassword"

export default function EditProfileMain() {
  return (
    <>
      <div className="flex justify-between gap-6">
        <div className="w-[70%] pr-6 border-r">
          <EditAccount />
        </div>
        <div className="flex-1">
          <UpdatePassword />
        </div>
      </div>
    </>
  )
}
