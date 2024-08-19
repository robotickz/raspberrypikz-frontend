import React from "react";
import { Collapse } from "react-collapse";

const CheckoutInput = ({
  id,
  label,
  required = false,
  placeholder = "",
  visible = true,
}: {
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  visible?: boolean;
}) => {
  return (
    <Collapse isOpened={visible}>
      <div className="w-full flex flex-col text-[#7a7a7a] pb-3">
        <label
          htmlFor={id}
          className={
            required
              ? "font-bold text-sm py-1 required"
              : "font-bold text-sm py-1"
          }
        >
          {label}
        </label>
        <input
          type="text"
          name={id}
          id={id}
          className={
            required
              ? "border p-3 focus:outline-none focus:border-dotted focus:border-black placeholder-shown:border-gray-200 valid:border-green-400 [&:not(placeholder-shown)]:border-red-400"
              : "border p-3 focus:outline-none focus:border-dotted focus:border-black [&[value]:not([value=''])]:border-green-400"
          }
          required={required}
          placeholder={placeholder}
          pattern="\S+.*"
        />
      </div>
    </Collapse>
  );
};

export default CheckoutInput;
