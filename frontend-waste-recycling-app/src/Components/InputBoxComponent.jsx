export const InputComponent = function ({
  label,
  placeholder,
  onChange,
  value,
  isDisabled = false,
}) {
  return (
    <div className="my-1 sm:my-2">
      <div className="font-medium text-black text-base sm:text-lg my-1">
        {label}
      </div>
      <input
        onChange={onChange}
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={isDisabled}
        className="py-1 px-2 sm:py-2 sm:px-4 border-2 rounded-md bg-white text-black border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
      />
    </div>
  );
};
