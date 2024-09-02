"use client";
import React, { useEffect, useState } from "react";
import { Cart } from "@/src/common.types";
import HeaderCartList from "@/src/components/HeaderCartList";
import { IoBagHandleOutline } from "react-icons/io5";

const HeaderCart = () => {
  const initCart: Cart = { items: [] };
  const [cart, setCart] = useState(initCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getCartFromStorage = () => {
      let value: Cart = JSON.parse(
        localStorage.getItem("cart") || '{"items":[]}',
      );
      setCart(value);
    };
    getCartFromStorage();
    window.addEventListener("storage", getCartFromStorage);
    return () => {
      window.removeEventListener("storage", getCartFromStorage);
    };
  }, []);

  const handleClick = () => {
    const emptyCart: Cart = { items: [] };
    localStorage.setItem("cart", JSON.stringify(emptyCart));
    window.dispatchEvent(new Event("storage"));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const getCartSum = () => {
    let sum = 0;
    for (let item of cart.items) {
      sum += item.product.price * item.amount;
    }
    return sum;
  };

  const getCartItemsAmount = () => {
    let amount = 0;
    for (let item of cart.items) {
      amount += item.amount;
    }
    return amount;
  };

  const disableClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  return (
    <div>
      <div
        className="border border-gray-100 px-6 py-2 text-sm font-bold cursor-pointer flex"
        onClick={handleOpen}
      >
        {getCartSum().toLocaleString("kz")} ₸
        <div className="text-[14px] font-normal pl-2">
          {getCartItemsAmount()}
        </div>
        &nbsp;
        <IoBagHandleOutline fontSize={18} />
      </div>
      <div
        className={`absolute z-10 m-0 top-0 left-0 bg-black/50 w-screen h-screen animate-in fade-in duration-300 ${isOpen ? "" : "hidden"}`}
        onClick={handleClose}
      >
        <div
          className={`absolute m-0 top-0 right-0 bg-white h-screen w-full md:w-[450px] p-2 z-40 duration-500 ease-in-out transition-all transform  ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={disableClick}
        >
          <div className="m-5 flex flex-col text-black">
            <div className="w-8 h-8 self-end mb-8" onClick={handleClose}>
              <div className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 cursor-pointer">
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            {cart.items.length ? (
              <HeaderCartList cart={cart} callback={handleClose} />
            ) : (
              <div>Корзина пуста.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCart;
