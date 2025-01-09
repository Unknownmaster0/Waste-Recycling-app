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
      className={`${backgroundColor} font-semibold lg:font-bold py-1 px-5 lg:py-2 lg:px-10 rounded-lg lg:rounded-xl text-[#f1f7fb]`}
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
}
