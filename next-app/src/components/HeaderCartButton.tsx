"use client";
import React from "react";

const HeaderCartButton = ({
  text,
  callback,
}: {
  text: string;
  callback: React.MouseEventHandler;
}) => {
  return (
    <div
      className="bg-[#e74c3c] text-center text-white py-3 px-2 mt-3 w-full cursor-pointer"
      onClick={callback}
    >
      {text}
    </div>
  );
};

export default HeaderCartButton;
