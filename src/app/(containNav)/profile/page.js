import ProfileRelated from "@/components/ProfileSection/ProfileRelated"
import ProfileProvider from "@/providers/ProfileProvider"
import React from "react"

export default function Profile() {
  return (
    <>
      <div className="lg:px-24 px-7 pt-44 overflow-hidden mb-10 ">
        <ProfileProvider>
          <ProfileRelated />
        </ProfileProvider>
      </div>
    </>
  )
}
