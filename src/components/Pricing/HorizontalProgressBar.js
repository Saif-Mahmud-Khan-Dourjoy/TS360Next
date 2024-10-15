"use client"
import { useState } from "react"

const StepProgressBar = ({ steps, currentStep, setCurrentStep }) => {
  const stepWidth = 100 / (steps.length - 1) // Calculate the width for each step dynamically
  const setStep = (index) => {
    if (currentStep > index) {
      setCurrentStep(index)
    }
  }
  return (
    <div className="flex flex-col items-center">
      {/* Step Bar */}
      <div className="relative w-full flex items-center">
        {steps.map((_, index) => (
          <div key={index} className="flex-1 relative">
            {index < steps.length - 1 && (
              <div
                className={`absolute top-1/2 h-1 transition-all duration-300 z-0 ${
                  index < currentStep ? "bg-[#3AB6FF]" : ""
                }`}
                style={{
                  left: "50%", // Start from the middle of the number
                  right: "-50%", // End at the middle of the next number
                }}
              />
            )}
            <div className="flex flex-col items-center">
              <div
                onClick={() => setStep(index)}
                className={`cursor-pointer w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  index <= currentStep
                    ? "bg-[#3AB6FF] text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Captions */}
      <div className="flex justify-between w-full mt-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`text-center text-xs sm:text-sm ${
              index == currentStep
                ? "text-black font-semibold"
                : "text-gray-300"
            }`}
            style={{ width: `${stepWidth}%` }}
          >
            <span>{step}</span>
          </div>
        ))}
      </div>

      {/* Buttons for testing */}
      {/* <div className="flex mt-4 space-x-2">
        <button
          className="px-4 py-2 bg-gray-300 rounded-md"
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
        >
          Prev
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() =>
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
          }
        >
          Next
        </button>
      </div> */}
    </div>
  )
}

export default StepProgressBar
