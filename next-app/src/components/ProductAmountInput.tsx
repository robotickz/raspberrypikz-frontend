"use client";

import { Cart, CartItem, Product } from "@/src/common.types";
import React, { ChangeEvent, ChangeEventHandler } from "react";

interface Props {
  product: Product;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
}

const ProductAmountInput = ({ product, handleChange }: Props) => {
  const cart = JSON.parse(localStorage.getItem("cart") || '{"items":[]}');
  let amount = 1;
  let index = cart.items.findIndex((item: CartItem) => item.id === product.id);
  if (index >= 0) amount = cart.items[index].amount;

  const saveToLocalStorage = (newAmount: number) => {
    let _cart: Cart = JSON.parse(
      localStorage.getItem("cart") || '{"items":[]}'
    );
    _cart.items[index].amount = newAmount;
    localStorage.setItem("cart", JSON.stringify(_cart));
    window.dispatchEvent(new Event("storage"));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(event.target.value);
    saveToLocalStorage(newAmount);
  };

  return (
    <>
      <input
        className="border w-fit p-2 focus:outline-none"
        type="number"
        disabled={product.amount < 1}
        min={1}
        max={product.amount}
        defaultValue={amount}
        onChange={handleChange ? handleChange : handleInputChange}
        onKeyDown={(event) => event.preventDefault()}
      />
    </>
  );
};

export default ProductAmountInput;
