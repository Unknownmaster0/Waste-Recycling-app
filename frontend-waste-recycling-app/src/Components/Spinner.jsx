export default function Spinner() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div
        className="inline-block h-8 w-8 md:h-32 md:w-32 lg:h-52 lg:w-52 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
