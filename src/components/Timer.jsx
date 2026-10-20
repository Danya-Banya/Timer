import { useState, useEffect } from "react";
export default function Timer() {
  const [decreaseTime, setDecreaseTime] = useState("");
  const [timeInterval, setTimeInterval] = useState(100);
  const [launched, setLaunched] = useState(false);
  const handleDecreaseTime = (decreaseTime) => {
    if (Number.isFinite(decreaseTime) && decreaseTime > 0)
      setTimeInterval((prev) => Math.max(0, prev - decreaseTime));
    setDecreaseTime("");
  };
  const handleReset = () => {
    setTimeInterval(100);
    setLaunched(false);
  };
  const handleToggle = () => {
    if (timeInterval <= 0) return;
    setLaunched((prev) => !prev);
  };
  useEffect(() => {
    if (!launched) return;
    const timer = setInterval(() => {
      setTimeInterval((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [launched]);
  useEffect(() => {
    if (timeInterval === 0) {
      setLaunched(false);
    }
  }, [timeInterval]);
  return (
    <div className="bg-black text-white font-mono flex flex-col h-[100vh] pt-[50px]">
      <h2 className="timer__title text-3xl text-center">Timer</h2>
      <h1 className="timer__interval text-4xl text-center">
        {timeInterval} seconds
      </h1>
      <div className="flex flex-col justify-center items-center">
        <div className="timer__control flex flex-col mt-10">
          <label htmlFor="decreaseTime">Списать время таймера</label>
          <input
            type="number"
            name=""
            id="decreaseTime"
            value={decreaseTime}
            min={1}
            onChange={(event) => setDecreaseTime(Number(event.target.value))}
            placeholder="Введите списываемое время таймера"
            className="bg-white border-2 text-black w-[250px] mt-2 pl-1"
          />
          <button
            className="border-2 px-10 w-[250px] cursor-pointer mt-1 disabled:cursor-not-allowed"
            onClick={() => handleDecreaseTime(decreaseTime)}
            disabled={timeInterval <= 0}
          >
            Списать
          </button>
        </div>
        <button
          className="border-2 px-10 w-[250px] cursor-pointer mt-10 disabled:cursor-not-allowed"
          onClick={() => {
            handleToggle();
          }}
          disabled={timeInterval <= 0}
        >
          {launched ? "Остановить" : "Запустить"}
        </button>
        <button
          className="border-2 px-10 w-[250px] cursor-pointer mt-2"
          onClick={() => handleReset()}
        >
          Сбросить
        </button>
      </div>
    </div>
  );
}
