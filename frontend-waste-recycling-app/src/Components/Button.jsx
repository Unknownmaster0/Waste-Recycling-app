export default function ButtonComponent({
  text,
  onClickHandler,
  type,
  isBtnActive = false,
}) {
  const backgroundColor =
    type === "check" && isBtnActive ? "bg-[#93d333]" : "bg-[#52656d]";
  return (
    <button
      className={`${backgroundColor} font-bold py-1 px-5 md:py-2 md:px-10 rounded-lg md:rounded-xl text-[#f1f7fb]`}
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
}
