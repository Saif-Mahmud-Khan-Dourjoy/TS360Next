import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function PurchaseHistory() {
  const [expandedRow, setExpandedRow] = useState(null);

  const orders = [
    {
      id: 2230,
      planName: "TS360 Professional",
      planType: "Monthly",
      purchaseDate: "03/09/2024",
      quantity: 4,
      amount: "$796",
      expirationDate: "03/10/2024",
      details: {
        subscriptionId: "TS-45J8KM907FG",
        transactionId: "KXDIH876J90MOS71H7",
        purchaseStatus: "Completed",
        invoiceLink: "#",
      },
    },
    {
      id: 2231,
      planName: "TS360 Professional",
      planType: "Monthly",
      purchaseDate: "03/10/2024",
      quantity: 4,
      amount: "$796",
      expirationDate: "03/11/2024",
      details: {
        subscriptionId: "TS-45J8KM907FG",
        transactionId: "KXDIH876J90MOS71H7",
        purchaseStatus: "Completed",
        invoiceLink: "#",
      },
    },
  ];

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <>
      <div className="text-[#2f2f2f] text-base font-extrabold mt-2 mb-6">
        PURCHASE HISTORY
      </div>
      <div className="w-full bg-white overflow-x-auto">
        {/* Header */}
        <div className="min-w-[800px] grid grid-cols-8 text-[#818181] text-sm">
          <div className="py-3 px-4 text-left font-bold">Order ID</div>
          <div className="py-3 px-4 text-left font-bold whitespace-nowrap">
            Plan Name
          </div>
          <div className="py-3 px-4 text-left font-bold whitespace-nowrap">
            Plan Type
          </div>
          <div className="py-3 px-4 text-left font-bold whitespace-nowrap mr-2">
            Purchase Date
          </div>
          <div className="py-3 px-4 text-center font-bold">Qty</div>
          <div className="py-3 px-4 text-left font-bold">Amount</div>
          <div className="py-3 px-4 text-left font-bold whitespace-nowrap">
            Expiration Date
          </div>
          <div className="py-3 px-4 text-center font-bold"></div>
        </div>
        {/* Body */}
        {orders.map((order) => (
          <div key={order.id} className="min-w-[800px]">
            <div className="grid grid-cols-8 border-t items-center text-[#818181]">
              <div className="py-3 px-4">{order.id}</div>
              <div className="py-3 px-4">{order.planName}</div>
              <div className="py-3 px-4">{order.planType}</div>
              <div className="py-3 px-4 whitespace-nowrap">
                {order.purchaseDate}
              </div>
              <div className="py-3 px-4 text-center">{order.quantity}</div>
              <div className="py-3 px-4">{order.amount}</div>
              <div className="py-3 px-4 whitespace-nowrap">
                {order.expirationDate}
              </div>
              <div className="py-3 px-4 text-right">
                <button onClick={() => toggleRow(order.id)}>
                  {expandedRow === order.id ? (
                    <FiChevronUp className="text-gray-500" />
                  ) : (
                    <FiChevronDown className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            {expandedRow === order.id && (
              <div className="grid grid-cols-8">
                <div
                  className={`col-span-8 overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedRow === order.id ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div
                    className={`text-[#818181] text-sm transform transition-transform duration-300 ease-in-out ${
                      expandedRow === order.id
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-4 opacity-0"
                    }`}
                  >
                    <div className="px-3 py-2 bg-blue-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold mb-1">Subscription ID:</p>
                          {order.details.subscriptionId}
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Transaction ID:</p>
                          {order.details.transactionId}
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Purchase Status:</p>
                          <p className="px-2 py-1 bg-[#D0FFC5] text-green-800 rounded text-center">
                            {order.details.purchaseStatus}
                          </p>
                        </div>
                        <div>
                          <a
                            href={order.details.invoiceLink}
                            className="text-blue-600 hover:underline"
                          >
                            Download Invoice
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
