import React, { useState } from "react"
import EditAccount from "./EditAccount"
import UpdatePassword from "./UpdatePassword"

export default function EditProfileMain() {
  const [isEditClicked, setIsEditClicked] = useState(false)

  const handleEditClick = () => {
    setIsEditClicked(true)
  }

  const handleCancelClick = () => {
    setIsEditClicked(false)
  }
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="md:w-[70%] w-full md:pr-6 md:border-r">
          <EditAccount
            isEditClicked={isEditClicked}
            handleEditClick={handleEditClick}
            handleCancelClick={handleCancelClick}
          />
        </div>
        <div className="flex-1">
          <UpdatePassword isEditClicked={isEditClicked} />
        </div>
      </div>
    </>
  )
}
