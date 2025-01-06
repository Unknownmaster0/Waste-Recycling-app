import { useState } from "react";

export default function OptionsRendrer({
  options,
  setBtn,
  setOption,
  correctOption,
}) {
  const [SelectedOption, setSelectedOption] = useState(null);
  function onclickHandler(idx) {
    setBtn(true);
    setOption(`${idx}`);
    setSelectedOption(idx);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {options.map((option, index) => (
        <OptionCard
          option={option}
          idx={index}
          key={index}
          onclickHandler={onclickHandler}
          correctOption={correctOption}
          isSelected={SelectedOption === index}
        />
      ))}
    </div>
  );
}

function OptionCard({ option, idx, onclickHandler, correctOption, isSelected }) {
  return (
    <button
      className={`bg-[#131f24] w-[80%] md:w-[90%] h-10 md:h-16 rounded-xl flex justify-center items-center mt-4 md:mt-2 border-t-2 border-l-2 border-r-2 border-b-4 ${
        isSelected ? "border-blue-800" : "border-gray-600"
      }
      ${correctOption === idx ? "bg-green-800" : null}
      `}
      onClick={() => onclickHandler(idx)}
    >
      <div className="text-xl sm:text-2xl font-semibold text-fuchsia-100 text-wrap">
        {option}
      </div>
    </button>
  );
}
