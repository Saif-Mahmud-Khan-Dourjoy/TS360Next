"use client";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import CheckOwnershipModal from "./CheckOwnershipModal";

export default function UpdatePassword() {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <CheckOwnershipModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}

      <div class="text-[#2f2f2f] text-base font-extrabold mb-6">
        UPDATE PASSWORD
      </div>
      <button
        class="w-[200px] h-[50px] bg-[#3ab6ff] rounded-[5px] shadow flex justify-center items-center cursor-pointer hover:bg-[#239ade]"
        onClick={() => setModalOpen(true)}
      >
        <div class=" text-white text-sm font-semibold flex items-center gap-2">
          <FaRegEdit size={20} />
          Set New Password
        </div>
      </button>
    </>
  );
}
