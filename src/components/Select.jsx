import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return;
  <div className="w-full">
    {label && (
      <label htmlFor={id} classNmae="inline-block mb-1 pl-1">
        {label}
      </label>
    )}
    {
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-3 rounded-lg bg-white text-black outline-non focus:bg-gray-50 duration-200 border border-gray w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} vlaue={option}>
            {option}
          </option>
        ))}
      </select>
    }
  </div>;
}

export default React.forwardRef(Select);
