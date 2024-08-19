"use client";
import React, { useState } from "react";
import { MenuItem } from "./Header";
import Link from "next/link";

interface Props {
  item: MenuItem;
}

const HeaderDropdown = (props: Props) => {
  const { item } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuItems = item?.children ? item.children : [];

  const toggle = () => {
    setIsOpen((old) => !old);
  };

  const transClass = isOpen ? "flex" : "hidden";
  return (
    <>
      <div className="relative">
        <button
          className="hover:text-gray-400 text-lg md:text-base"
          onClick={toggle}
        >
          {item.title}
        </button>
        <div
          className={`absolute top-8 -start-12 md:-start-36 z-30 w-fit flex flex-col py-1 bg-zinc-400 rounded-md ${transClass}`}
        >
          {menuItems.map((item) => (
            <Link
              key={item.route}
              className="hover:bg-zinc-300 hover:text-zinc-500 px-4 py-1 text-md md:text-base"
              href={item?.route || ""}
              onClick={toggle}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      {isOpen ? (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/40"
          onClick={toggle}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
};

export default HeaderDropdown;
