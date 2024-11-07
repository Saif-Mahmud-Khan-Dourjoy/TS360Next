"use client"
import React, { useState } from "react"
import EditProfileMain from "./EditProfile/EditProfileMain"
import Common from "./Common"

export default function ProfileRelated() {
  const [selectedTab, setSelectedTab] = useState("PROFILE")
  return (
    <>
      <div className="flex justify-between gap-x-20">
        <div className="">
          <Common selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
        <div className="flex-1">
          <EditProfileMain />
        </div>
      </div>
    </>
  )
}
