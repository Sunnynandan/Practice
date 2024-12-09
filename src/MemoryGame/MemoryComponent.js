import React, { useEffect, useRef, useState } from "react";

function MemoryComponent() {
  const [gridNo, setGridNo] = useState(0);
  const [open, setOpen] = useState([]);
  const [timer, setTimer] = useState(10);
  const [validSize, InvalidSize] = useState(false);
  const [isGameStared, setGameStared] = useState(false);
  const blue = "#3b82f6";
  const gray = "#d1d5db";
  const green = "#4ade80";
  let count = 0;

  useEffect(() => {}, []);

  const showGridvalue = () => {
    setOpen((prev) => {
      const list = [...prev];
      list.map(
        (data, index) => ((data.isOpen = true), (data.gridColor = green))
      );
      return list;
    });
  };
  const hideGridValue = () => {
    setOpen((prev) => {
      const list = [...prev];
      list.map(
        (data, index) => ((data.isOpen = false), (data.gridColor = gray))
      );
      return list;
    });
  };

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
    if (value > 10 || value <= 1) return;
    if (value % 2 !== 0) {
      InvalidSize(true);
    } else {
      InvalidSize(false);
    }
    let gridValueList = [...shuffleArray(value)];
    let gridLength = Array.from({ length: value * value }, (_, index) => ({
      indexValue: index,
      isOpen: false,
      gridValue: gridValueList[index],
      gridColor: gray,
    }));
    setOpen(gridLength);
    setGridNo(value);
  };

  const openGrid = (index) => {
    if (isGameStared) return;
    setOpen((open) => {
      const updatedOpen = [...open];
      updatedOpen[index] = {
        ...updatedOpen[index],
        isOpen: true,
        gridColor: blue,
      };
      return updatedOpen;
    });
  };

  const timeCounter = () => {
    return new Promise((resolve) => {
      for (let i = 0; i <= 10; i++) {
        setTimeout(() => {
          setTimer(10 - i);
          if (i === 10) {
            resolve();
          }
        }, i * 1000);
      }
    });
  };

  const startGame = async () => {
    showGridvalue();
    setGameStared(true);
    await timeCounter();
    setGameStared(false);
    hideGridValue();
  };

  return (
    <div className="flex flex-col items-center justify-center h-dvh w-dvw bg-gray-50">
      <h1 className="font-bold text-4xl mb-1">Memory Game</h1>
      <h1 className="text-red-800 font-semibold text-xl">{`${timer} Seconds Left`}</h1>
      <div className="flex flex-row gap-4 justify-center items-center mt-1 mb-4">
        <label className="text-xl font-semibold">Grid Size</label>
        <input
          type="number"
          disabled={isGameStared}
          className="border p-2 rounded mt-1"
          onChange={(e) => gridValue(e.target.value)}
        />
        <button
          disabled={isGameStared}
          className="bg-green-400 px-3 py-2 rounded-md hover:bg-green-500  text-white"
          onClick={() => startGame()}
        >
          Start Game
        </button>
        <button
          className="bg-green-400 px-3 py-2 rounded-md hover:bg-green-500  text-white"
          onClick={() => setGridNo(0)}
        >
          Reset Game
        </button>
      </div>
      {validSize && <span className="text-red-700"> Invalid grid size</span>}
      {!validSize && (
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
                backgroundColor: open[index].gridColor,
              }}
              onClick={() => openGrid(index)}
            >
              {open[index].isOpen ? open[index].gridValue : ""}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MemoryComponent;
