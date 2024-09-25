import { AllFeature } from "@/API/User/Pricing"
import React from "react"
import { FaCheck } from "react-icons/fa"
import { FaX } from "react-icons/fa6"

export default async function ComparePlan() {
  const features = await AllFeature()
  const tableData = features?.[0]

  const sortedHeader = [
    "Feature",
    "Free",
    "Standard",
    "Professional",
    "Enterprise",
  ]

  const { header, data } = tableData

  // Filter sortedHeader to include only headers present in the actual data
  const sortedColumns = sortedHeader.filter((col) => header.includes(col))

  // Add remaining columns from the header that were not in sortedHeader
  const remainingColumns = header.filter((col) => !sortedHeader.includes(col))

  // Combine the two arrays: sorted first, then remaining
  const finalColumns = [...sortedColumns, ...remainingColumns]
  return (
    <div className="mt-20">
      <div className="text-[40px] text-[#2F2F2F] font-bold text-center w-full">
        Compare plans
      </div>
      <div className="text-[32px] text-[#2F2F2F] font-bold mt-4">Overview</div>
      <div className="mt-8 flex justify-center">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto ">
            <colgroup>
              <col style={{ width: "25%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <thead>
              <tr className="bg-[#3A9ED9] ">
                {finalColumns.map((col) => (
                  <th
                    key={col}
                    className="text-white font-medium text-xl text-left px-2 py-4"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={`plan-feature-row-${index}`}
                  className={`even:bg-[#F6F6F6]`}
                >
                  {finalColumns.map((col) => (
                    <td
                      key={col}
                      className={`border-b border-gray-300 px-2 py-10 text-[#818181] text-lg  `}
                    >
                      {row[col] == "true" && <FaCheck color="#3AB6FF" />}
                      {row[col] == "false" && <FaX color="red" />}
                      {row[col] != "true" && row[col] != "false" && row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
