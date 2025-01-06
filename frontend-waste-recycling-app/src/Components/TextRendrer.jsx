export default function TextRendrer({ text, textStyle }) {
  return (
    <div
      className={`font-medium sm:font-semibold text-2xl sm:text-3xl md:text-4xl`}
    >
      <div className={`${textStyle}`}>{text}</div>
    </div>
  );
}
