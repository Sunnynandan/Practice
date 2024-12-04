import React from 'react'
import { useEffect, useRef, useState } from "react";
import Stepper from "./Stepper";

function StepperApp() {
    const stepInfo = [
        {
          title: "Customer Info",
          description: "Provide your contact Details",
        },
        {
          title: "Shipping Info",
          description: "Enter your shipping address",
        },
        {
          title: "Payment",
          description: "Completed payment for your order",
        },
        {
          title: "Delivered",
          description: "Your order has been delivered",
        },
      ];
      const [step, nextStep] = useState(0);
      const [description, setDescription] = useState(stepInfo.at(0).description);
      const stepperRef = useRef(null)
    
      useEffect(()=>{
          
      },[])
    
      const calculateWidth = () => {
        return ((step) / (stepInfo.length) * 100);
      }
    
      const proceed = () => {
        nextStep((step) => step + 1);
        setDescription(stepInfo.at(step).description);
      };
  return (
    <div><h1 className="text-center font-bold text-3xl mb-20 mt-20">CheckOut</h1>
    <div className=" relative z-10 flex flex-row justify-between items-center w-[800px] mx-auto mb-20">
      {stepInfo.map((data, index) => (
        <Stepper
          ref={stepperRef}
          count={index + 1}
          description={data.title}
          completed={step < index + 1}
        />
      ))}
      <div className="left-0 top-[25%] absolute w-full h-2 bg-gray-400">
        <div className="h-full bg-green-400 transition-all duration-300 ease-in-out" style={{width : `${calculateWidth()}%`}}></div>
      </div>
    </div>
    <h1 className=" flex justify-center font-semibold mb-8 text-2xl font-mono">
      {description}
    </h1>
    {/* Wrap the button in a flex container to center it */}
    <div className="flex justify-center">
      <button
        type="button"
        className={`px-4 py-2 rounded-xl bg-blue-300 font-semibold ${
          step < 4 ? "bg-blue-500" : "bg-green-500"
        }`}
        onClick={proceed}
        disabled={step >= 4}
      >
        {step >= 4 ? "Finshed" : "Next"}
      </button>
    </div></div>
  )
}

export default StepperApp