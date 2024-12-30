import { getPurchaseHistory } from "@/API/User/PaymentMethod/PurchaseHistory"
import { showErrorAlert } from "@/components/Alerts/Alert"
import ComponentLoader from "@/components/Custom/ComponentLoader"
import moment from "moment"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import jsPDF from "jspdf"
import Logo from "../../../../public/logo.png"

export default function PurchaseHistory() {
  const [expandedRow, setExpandedRow] = useState(null)
  const [loading, setLoading] = useState(false)
  const [purchaseHistory, setPurchaseHistory] = useState([])

  const { data: session } = useSession()

  useEffect(() => {
    setLoading(true)
    getPurchaseHistory(session?.user?.id, session?.accessToken).then((res) => {
      setLoading(false)
      if (res?.[0]) {
        setPurchaseHistory(res?.[0])
      } else {
        // showErrorAlert(res?.[1], "center", 2000)
        setPurchaseHistory([]);
      }
    })
  }, [])

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  const handleDownloadPDF = (order) => {
    const pdf = new jsPDF("p", "mm", "a4") // Portrait, millimeters, A4 size

    // Set up colors and fonts
    pdf.setFont("helvetica", "normal")

    // Header
    pdf.setFillColor(240, 248, 255) // Light blue background
    pdf.rect(0, 0, 210, 20, "F") // Full width header

    // "TEST" in Green
    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(14)
    pdf.setTextColor(0, 200, 0) // Green color
    pdf.text("TEST", 20, 12)

    // "SPRINT" in Blue (Immediately after "TEST")
    pdf.setTextColor(0, 120, 212) // Blue color
    pdf.text("SPRINT", pdf.getTextWidth("TEST") + 20, 12) // No space

    // "360" in Black (Immediately after "SPRINT")
    pdf.setTextColor(0, 0, 0) // Black color
    pdf.text("360", pdf.getTextWidth("TESTSPRINT") + 20, 12) // No space

    pdf.addImage(`${window.location.origin}/logo.png`, "PNG", 10, 6, 10, 10)
    // Company Location
    // pdf.setFontSize(10)
    // pdf.text("California, USA", 200, 12, { align: "right" })

    pdf.setTextColor(72, 102, 129) // Black color
    pdf.setFontSize(10)
    pdf.text("California, USA", 200, 12, { align: "right" })

    // Invoice Details
    pdf.setTextColor(129, 129, 129)
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(12)
    pdf.text("Invoice ID:", 10, 30)
    pdf.setFont("helvetica", "bold")
    pdf.setTextColor(0, 0, 0)
    const invoiceId = order?.pgInvoiceId ? order?.pgInvoiceId : "n/a"
    pdf.text(`${invoiceId}`, 10, 40)

    pdf.setFont("helvetica", "normal")
    pdf.setTextColor(129, 129, 129)
    pdf.text("Issue Date:", 154, 30)
    pdf.setTextColor(0, 0, 0)
    pdf.text(`${moment(order?.purchaseDate).format("DD/MM/YY")}`, 180, 30)
    pdf.setTextColor(129, 129, 129)
    pdf.text("Expiration Date:", 145, 40)
    pdf.setTextColor(0, 0, 0)
    pdf.text(`${moment(order?.expirationDate).format("DD/MM/YY")}`, 180, 40)

    // Draw Line
    pdf.line(10, 47, 200, 47)

    // Billing Details
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(10)
    pdf.setTextColor(129, 129, 129)
    pdf.text("Bill to", 10, 55)
    pdf.text("Bill from", 110, 55)
    pdf.setFontSize(11)
    pdf.setFont("helvetica", "bold")

    pdf.setTextColor(0, 0, 0)
    pdf.text(
      `${order?.userInfo?.firstName} ${order?.userInfo?.lastName}`,
      10,
      63
    )
    pdf.setFont("helvetica", "normal")
    pdf.setTextColor(129, 129, 129)
    const address = `${
      order?.billingAddress?.line1 ? `${order?.billingAddress?.line1},` : ""
    }${order?.billingAddress?.line2 ? `${order?.billingAddress?.line2},` : ""}${
      order?.billingAddress?.city ?? ""
    },${order?.billingAddress?.state ?? ""},`
    pdf.text(`${address}`, 10, 70)
    pdf.text(`${order?.billingAddress?.country ?? ""}`, 10, 76)
    pdf.setFontSize(10)
    pdf.text(`${order?.userInfo?.username}`, 10, 85)
    pdf.setFontSize(11)
    pdf.setTextColor(0, 0, 0)
    pdf.setFont("helvetica", "bold")
    pdf.text("TestSprint360 Inc.", 110, 63)
    pdf.setTextColor(129, 129, 129)
    pdf.setFont("helvetica", "normal")
    pdf.text("504 Emory St, San Jose, CA,", 110, 70)
    pdf.text(" 95110 US", 110, 76)

    // Draw Line
    pdf.line(10, 90, 200, 90)
    pdf.setFontSize(12)
    // Table Header
    pdf.setFillColor(50, 50, 50) // Dark grey background for table header
    pdf.rect(10, 95, 190, 10, "F") // Header background

    pdf.setFont("helvetica", "bold")
    pdf.setTextColor(255, 255, 255) // White text
    pdf.text("Item", 15, 102)
    pdf.text("Unit Price", 100, 102)
    pdf.text("Qty.", 140, 102)
    pdf.text("Amount", 170, 102)

    // Reset text color
    pdf.setTextColor(0, 0, 0)

    // Table Row
    pdf.setFont("helvetica", "normal")
    pdf.text(`${order?.planName}`, 15, 112)
    pdf.text(`$${order?.unitPrice}`, 100, 112)
    pdf.text(`${order?.quantity}`, 140, 112)
    pdf.text(`$${order?.amount}`, 170, 112)

    // Draw Line
    pdf.line(10, 120, 200, 120)

    // Totals
    pdf.setTextColor(129, 129, 129)
    pdf.text("Subtotal:", 150, 130)

    pdf.setTextColor(0, 0, 0)
    pdf.text(`$${order?.amount}`, 190, 130, { align: "right" })
    pdf.setFont("helvetica", "normal")
    pdf.setTextColor(129, 129, 129)
    pdf.text("Tax:", 150, 140)

    pdf.setTextColor(0, 0, 0)
    pdf.text(`$${order?.totalTaxes}`, 190, 140, { align: "right" })

    pdf.setDrawColor(200, 200, 200) // Light gray color for divider
    pdf.setLineWidth(0.1) // Thin line
    pdf.line(145, 143, 195, 143)

    pdf.setFontSize(14)
    pdf.setFont("helvetica", "normal")
    pdf.setTextColor(129, 129, 129)
    pdf.text("Total:", 150, 150)
    pdf.setFont("helvetica", "bold")
    pdf.setTextColor(0, 0, 0)
    const total = order?.amount + order?.totalTaxes
    pdf.text(`$${total}`, 190, 150, { align: "right" })

    // Add the text "Your purchase is subject to our"
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(10)
    pdf.setTextColor(0, 0, 0) // Black color
    pdf.text("Your purchase is subject to our", 10, 170)

    // Calculate the X-coordinate for "Terms & Conditions"
    const purchaseTextWidth = pdf.getTextWidth(
      "Your purchase is subject to our"
    )

    // Add "Terms & Conditions" in blue and underlined
    // pdf.setTextColor(0, 120, 212) // Blue color
    // pdf.text("Terms & Conditions", 10 + purchaseTextWidth + 2, 170) // Adjust X-coordinate to reduce gap
    // const termsTextWidth = pdf.getTextWidth("Terms & Conditions")

    // // Draw underline for "Terms & Conditions"
    // pdf.setDrawColor(0, 120, 212) // Blue color for the underline
    // pdf.setLineWidth(0.1)
    // pdf.line(
    //   10 + purchaseTextWidth + 2,
    //   171,
    //   10 + purchaseTextWidth + 2 + termsTextWidth,
    //   171
    // )

    pdf.setTextColor(0, 120, 212) // Blue color

    // Add "Terms & Conditions" text
    pdf.text("Terms & Conditions", 10 + purchaseTextWidth + 2, 170) // Adjust X-coordinate to reduce gap

    // Get the width of the "Terms & Conditions" text
    const termsTextWidth = pdf.getTextWidth("Terms & Conditions")

    // Draw underline for "Terms & Conditions"
    pdf.setDrawColor(0, 120, 212) // Blue color for the underline
    pdf.setLineWidth(0.1)
    pdf.line(
      10 + purchaseTextWidth + 2, // X-coordinate start
      171, // Y-coordinate
      10 + purchaseTextWidth + 2 + termsTextWidth, // X-coordinate end
      171 // Y-coordinate
    )

    // Add a clickable link for "Terms & Conditions"
    pdf.link(
      10 + purchaseTextWidth + 2, // X-coordinate of the link
      170 - 3, // Y-coordinate of the link (adjusted to match text position)
      termsTextWidth, // Width of the link area
      5, // Height of the link area
      { url: "https://testsprint360.com/terms-policy" } // URL for the link
    )

    // Footer Section
    pdf.setTextColor(0, 0, 0)
    pdf.setDrawColor(0, 0, 0)
    pdf.line(10, 280, 200, 280) // Divider line above footer

    // Centered Footer Text
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(10)
    pdf.text(
      "Issued by: TestSprint360 Inc., San Jose, California, USA. VAT ID TS5556786521",
      105, // X-coordinate: middle of the page (A4 width is 210mm, so 210/2 = 105)
      290, // Y-coordinate
      { align: "center" }
    )

    // Save PDF
    pdf.save("invoice.pdf")
  }

  return (
    <>
      {loading && <ComponentLoader />}
      <div className="text-[#2f2f2f] text-base font-extrabold mt-2 mb-6">
        PURCHASE HISTORY
      </div>
      {purchaseHistory?.length > 0 ? (
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
          {purchaseHistory.map((order) => (
            <div key={order.id} className="min-w-[800px]">
              <div
                className={`grid grid-cols-8 border-t items-center text-[#818181] text-sm ${
                  expandedRow === order.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="py-3 px-4">
                  {order?.orderId ? order?.orderId : "n/a"}
                </div>
                <div className="py-3 px-4">{order?.planName}</div>
                <div className="py-3 px-4">{order?.planType}</div>
                <div className="py-3 px-4 whitespace-nowrap">
                  {moment(order?.purchaseDate).format("DD/MM/YY")}
                </div>
                <div className="py-3 px-4 text-center">{order?.quantity}</div>
                <div className="py-3 px-4">${order?.amount}</div>
                <div className="py-3 px-4 whitespace-nowrap">
                  {moment(order.expirationDate).format("DD/MM/YY")}
                </div>
                <div className="py-3 px-4 text-right">
                  <button onClick={() => toggleRow(order?.id)}>
                    {expandedRow === order.id ? (
                      <FiChevronUp className="text-gray-500" />
                    ) : (
                      <FiChevronDown className="text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              {expandedRow === order?.id && (
                <div className="grid grid-cols-8">
                  <div
                    className={`col-span-8 overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedRow === order?.id ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <div
                      className={`text-[#818181] text-sm transform transition-transform duration-300 ease-in-out ${
                        expandedRow === order?.id
                          ? "translate-y-0 opacity-100"
                          : "-translate-y-4 opacity-0"
                      }`}
                    >
                      <div className="px-3 py-2 bg-blue-50">
                        <div className="flex items-center justify-between w-[90%] xl:w-[85%]">
                          <div>
                            <p className="font-semibold mb-1">
                              Subscription ID:
                            </p>
                            {order?.pgSubscriptionId}
                          </div>
                          <div>
                            <p className="font-semibold mb-1">
                              Transaction ID:
                            </p>
                            {order?.transactionId
                              ? order?.transactionId
                              : "n/a"}
                          </div>
                          <div>
                            <p className="font-semibold mb-1">
                              Purchase Status:
                            </p>
                            <p className="px-2 py-1 bg-[#D0FFC5] text-green-800 rounded text-center">
                              {order?.purchaseStatus}
                            </p>
                          </div>
                          <div>
                            <button
                              onClick={() => handleDownloadPDF(order)}
                              className="text-[#3AB6FF] underline"
                            >
                              Download Invoice
                            </button>
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
      ) : (
        <div className="w-full flex justify-center items-center">
          <div className="text-red-500 sm:font-semibold sm:text-lg">
            You have no purchase history
          </div>
        </div>
      )}
    </>
  )
}
