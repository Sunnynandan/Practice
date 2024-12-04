import React, { useState } from "react";

function MemoryComponent() {
  const [gridNo, setGridNo] = useState(0);
  const [open, setOpen] = useState([]);
  
  const gridValue = (value) => {
    if(value > 10 || value <= 0) return; 
    setGridNo(value);
    let gridLength = Array.from({ length: value * value }, (_, index) => ({
        indexValue: index,
        isOpen: false,
        gridValue : 0
    }));
    setOpen(gridLength);
  };

  const openGrid = (index) => {
    setOpen((open) => {
        const updatedOpen = [...open]; // Create a copy of the current open array
        updatedOpen[index] = {
            ...updatedOpen[index], // Copy the current object at 'index'
            isOpen: true // Toggle the isOpen property
        };
        return updatedOpen;
    });
  };

  const randomNumber = () => {
    return Math.floor(Math.random() * gridNo) + 1;
  };

  return (
    <div className="flex flex-col items-center justify-center h-dvh w-dvw bg-gray-50">
      <h1 className="font-bold text-4xl mb-4">Memory Game</h1>
      <label>Grid Size</label>
      <input
        type="number"
        className="border p-2 rounded mt-2 mb-4"
        onChange={(e) => gridValue(e.target.value)}
      />

      <div
        className="grid w-[400px] h-[400px] gap-2"
        style={{
          gridTemplateColumns: `repeat(${gridNo}, 1fr)`,
          gridTemplateRows: `repeat(${gridNo}, 1fr)`,
        }}
      >
        {[...Array(gridNo * gridNo)].map((_, index) => (
          <div
            key={index}
            className="rounded-lg flex justify-center items-center text-[20px] border-none hover:cursor-pointer transition-all duration-100 ease-in-out"
            style={{
                backgroundColor: open[index] && open[index].isOpen ? '#4ade80' : '#d1d5db'
            }}
            onClick={() => openGrid(index)}
          >
            {/* {randomNumber()} */}
          </div>
        ))}
      </div>
      <button className="bg-green-400 px-3 py-2 rounded-md hover:bg-green-500 mt-4 text-white">Reset Game</button>
    </div>
  );
}

export default MemoryComponent;
