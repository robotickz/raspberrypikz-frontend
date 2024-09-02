"use client";

import { Cart, CartItem, Product } from "@/src/common.types";
import React, { Dispatch, useState } from "react";

interface Props {
  product: Product;
  handleChange?: Dispatch<React.SetStateAction<number>>;
}

const ProductAmountInput = ({ product, handleChange }: Props) => {
  const cart = JSON.parse(localStorage.getItem("cart") || '{"items":[]}');
  const [amount, setAmount] = useState(1);
  let index = cart.items.findIndex((item: CartItem) => item.id === product.id);

  const saveToLocalStorage = (newAmount: number) => {
    let _cart: Cart = JSON.parse(
      localStorage.getItem("cart") || '{"items":[]}',
    );
    _cart.items[index].amount = newAmount;
    localStorage.setItem("cart", JSON.stringify(_cart));
    window.dispatchEvent(new Event("storage"));
  };

  const increaseAmount = () => {
    if (amount < product.amount) {
      const newAmount = amount + 1;
      setAmount(newAmount);
      handleChange ? handleChange(newAmount) : saveToLocalStorage(newAmount);
    }
  };

  const decreaseAmount = () => {
    if (amount > 1) {
      const newAmount = amount - 1;
      setAmount(newAmount);
      handleChange ? handleChange(newAmount) : saveToLocalStorage(newAmount);
    }
  };

  return (
    <div className="flex justify-center items-center gap-1 rounded-3xl">
      <div
        className="text-3xl text-red-700 cursor-pointer bg-amber-200 px-3 rounded-3xl select-none"
        onClick={() => decreaseAmount()}
      >
        -
      </div>
      <div className="text-xl px-4">{amount}</div>
      <div
        className="text-3xl text-green-700 cursor-pointer bg-amber-200 px-2.5 rounded-3xl select-none"
        onClick={() => increaseAmount()}
      >
        +
      </div>
    </div>
  );
};

export default ProductAmountInput;
