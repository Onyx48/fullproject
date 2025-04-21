import React from "react";
import { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-[450px] flex flex-col items-center">
      {label && (
        <label
          className="inline-block mb-1 pl-1 text-basee font-medium text-gray-900"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus;outline-none focus:ring-1 focus-ring-gray-400 fous:ring-offset-1 disabled:cursor-not-allowed disabled-opacity-50 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
