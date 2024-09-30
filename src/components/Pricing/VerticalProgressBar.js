"use client"
// app/components/VerticalProgressBar.js
import { useState } from "react"

const VerticalProgressBar = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const handleStepChange = (step) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col justify-between h-64 relative">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 flex justify-center items-center rounded-full border-2 transition-all ${
                  index <= currentStep
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300"
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-12 w-1 transition-all ${
                    index < currentStep ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
            <div
              className={`${
                index <= currentStep ? "text-blue-500" : "text-gray-500"
              }`}
            >
              {step}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          onClick={() => handleStepChange(currentStep - 1)}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => handleStepChange(currentStep + 1)}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default VerticalProgressBar
