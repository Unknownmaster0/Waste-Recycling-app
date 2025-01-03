export default function ProgressBar({ width }) {
  return (
    <div className="">
      <div className="w-1/2 h-6 rounded-full border-sky-100 bg-yellow-400">
        <div
          className={`h-full bg-pink-500 rounded-full`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
}
