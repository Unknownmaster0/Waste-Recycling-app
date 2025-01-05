import { useState } from "react";

export default function OptionsRendrer({ options, setBtn, setOption }) {
  return (
    <div className="flex flex-col justify-center items-center">
      {options.map((option, index) => (
        <OptionCard
          option={option}
          idx={index}
          key={index}
          setBtn={setBtn}
          setOption={setOption}
        />
      ))}
    </div>
  );
}

function OptionCard({ option, idx, onclickHandler, setBtn, setOption }) {
  const [changeColor, setChangeColor] = useState(false);
  function onclickHandler() {
    setChangeColor(true);
    setBtn(true);
    setOption(idx);
  }
  return (
    <button
      className={`bg-[#131f24] w-[80%] md:w-[90%] h-10 md:h-16 rounded-xl flex justify-center items-center mt-4 md:mt-2 border-t-2 border-l-2 border-r-2 border-b-4 ${
        changeColor ? "border-blue-800" : "border-gray-600"
      }`}
      onClick={onclickHandler}
    >
      <div className="text-xl sm:text-2xl font-semibold text-fuchsia-100 text-wrap">
        {option}
      </div>
    </button>
  );
}
