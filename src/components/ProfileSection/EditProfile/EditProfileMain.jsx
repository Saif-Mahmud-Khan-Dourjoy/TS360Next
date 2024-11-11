import React from "react";
import EditAccount from "./EditAccount";
import UpdatePassword from "./UpdatePassword";

export default function EditProfileMain() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="md:w-[70%] w-full md:pr-6 md:border-r">
          <EditAccount />
        </div>
        <div className="flex-1">
          <UpdatePassword />
        </div>
      </div>
    </>
  );
}
