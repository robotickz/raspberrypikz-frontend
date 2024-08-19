"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderCart from "@/src/components/HeaderCart";
import HeaderDropdown from "./HeaderDropdown";

export interface MenuItem {
  title: string;
  route?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: "Все товары",
    route: "/products",
  },
  {
    title: "Справка",
    children: [
      {
        title: "Политика конфиденциальности",
        route: "/privacy_policy",
      },
      {
        title: "Публичный договор-оферта интернет–магазина",
        route: "/contract_offer",
      },
    ],
  },
  {
    title: "Контакты",
    route: "/about",
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-[#e74c3c] text-white flex justify-center w-full min-h-20 p-6">
      <div className="max-w-[1024px] w-full flex flex-col items-center gap-4 md:hidden">
        <div className="max-w-[1024px] w-full flex justify-between items-center">
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-lg md:text-2xl font-bold text-nowrap"
            >
              <Image
                src="/logo_60x60.png"
                alt="Logo"
                width="34"
                height="34"
                className="inline"
              />
              &nbsp;Raspberry Pi KZ
            </Link>
          </div>
        </div>
        <HeaderCart />
        <div className="self-center text-center">
          {menuItems.map((item, index) => {
            return item.hasOwnProperty("children") ? (
              <HeaderDropdown item={item} key={index} />
            ) : (
              <Link
                className="hover:text-gray-600 text-lg md:text-xl"
                href={item?.route || ""}
                key={index}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="max-w-[1024px] w-full hidden justify-between items-center md:flex">
        <div className="flex gap-6">
          <Link href="/" className="text-2xl font-bold text-nowrap">
            <Image
              src="/logo_60x60.png"
              alt="Logo"
              width="34"
              height="34"
              className="inline"
            />
            &nbsp;Raspberry Pi KZ
          </Link>
          {menuItems.map((item, index) => {
            return item.hasOwnProperty("children") ? (
              <HeaderDropdown item={item} key={index} />
            ) : (
              <Link
                className="hover:text-gray-600"
                href={item?.route || ""}
                key={index}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
        <HeaderCart />
      </div>
    </header>
  );
};

export default Header;
