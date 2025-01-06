export default function ProgressBar({ width }) {
  return (
    <div className="w-[80%] sm:w-[70%] h-3 md:h-4 rounded-full border-sky-100 bg-[#52656d]">
      <div
        className={`h-full bg-green-400 rounded-full`}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}
