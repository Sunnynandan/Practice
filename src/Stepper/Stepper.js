import React from "react";
import { TiTickOutline } from "react-icons/ti";

function Stepper({ count, description, completed }) {
  return (
    <div className="flex flex-row items-center">
      <div className="z-10 flex flex-col items-center gap-4">
        <div className={`z-1 flex flex-row justify-center items-center w-12 h-12 rounded-full  font-semibold transition-all duration-300 ease-in-out ${completed ? "bg-blue-400" : "bg-green-400"}`}>
          {completed ? count : <TiTickOutline />}
         
        </div>
        
        <p className="font-semibold">{description}</p>
      </div>
      <div className="h-2 bg-slate-500"></div>
    </div>
  );
}

export default Stepper;
