import React, { useEffect, useState } from "react";

function MemoryComponent() {
  const [gridNo, setGridNo] = useState(0);
  const [open, setOpen] = useState([]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {}, []);

  const shuffleArray = (size) => {
    if (size > 100 || size < 0) return;
    const numbers = Array.from(
      { length: (size * size) / 2 },
      (_, i) => i + 1
    ).flatMap((num) => [num, num]);

    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  };

  const gridValue = (value) => {
    if (value > 10 || value <= 0) return;
    setGridNo(value);
    let gridValueList = [...shuffleArray(value)];
    let gridLength = Array.from({ length: value * value }, (_, index) => ({
      indexValue: index,
      isOpen: false,
      gridValue: gridValueList[index],
    }));
    setOpen(gridLength);
  };

  const openGrid = (index) => {
    setOpen((open) => {
      const updatedOpen = [...open]; // Create a copy of the current open array
      updatedOpen[index] = {
        ...updatedOpen[index], // Copy the current object at 'index'
        isOpen: true, // Toggle the isOpen property
      };
      return updatedOpen;
    });
  };

  const startGame = () => {
    for (let i = 0; i <= 10; i++) {
      setTimeout(() => {
        setTimer(i);
      }, i * 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-dvh w-dvw bg-gray-50">
      <h1 className="font-bold text-4xl mb-1">Memory Game</h1>
      <h1 className="text-red-800 font-semibold">{`${timer} Seconds Left`}</h1>
      <label>Grid Size</label>
      <input
        type="number"
        className="border p-2 rounded mt-1 mb-2"
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
            className="text-white font-semibold text-4xl rounded-lg flex justify-center items-center text-[20px] border-none hover:cursor-pointer transition-all duration-100 ease-in-out"
            style={{
              backgroundColor: open[index].isOpen ? "#3b82f6" : "#d1d5db",
            }}
            onClick={() => openGrid(index)}
          >
            {open[index].isOpen ? open[index].gridValue : ""}
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        <button
          className="bg-green-400 px-3 py-2 rounded-md hover:bg-green-500 mt-4 text-white"
          onClick={() => startGame()}
        >
          Start Game
        </button>
        <button
          className="bg-green-400 px-3 py-2 rounded-md hover:bg-green-500 mt-4 text-white"
          onClick={() => setGridNo(0)}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default MemoryComponent;
