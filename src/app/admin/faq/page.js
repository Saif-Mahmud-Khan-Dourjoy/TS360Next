import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import FaqList from "../../../components/Admin/FAQ/FaqList";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <div className="w-fit">
        <Link href="/admin/faq/manage-faq" className="w-fit cursor-pointer">
          <div className="w-fit px-5  py-2  bg-[#3AB6FF] rounded-lg">
            <div className="flex items-center gap-3 text-base text-white font-medium">
              <CiCirclePlus size={25} /> Add a new FAQ
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-6 mb-5">
        <FaqList />
      </div>
    </div>
  );
}
