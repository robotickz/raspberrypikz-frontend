"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Cart, Product } from "@/src/common.types";

const ToCartButton = ({
  id,
  product,
  amount,
}: {
  id: string;
  product: Product;
  amount: number;
}) => {
  const router = useRouter();
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const getCartFromStorage = () => {
      let cart: Cart = JSON.parse(
        localStorage.getItem("cart") || '{"items":[]}'
      );
      let index = cart.items.findIndex((item) => item.id === id);
      setInCart(index >= 0);
    };
    getCartFromStorage();
    window.addEventListener("storage", getCartFromStorage);
    return () => {
      window.removeEventListener("storage", getCartFromStorage);
    };
  }, [id]);

  const saveToLocalStorage = () => {
    let cart: Cart = JSON.parse(localStorage.getItem("cart") || '{"items":[]}');
    cart.items.push({
      id: id,
      product: product,
      amount: amount,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  };

  return product.amount > 0 ? (
    <div
      className="rounded font-bold text-sm text-nowrap text-center bg-[#e74c3c] text-white py-3 px-2 w-full cursor-pointer"
      onClick={(event) => {
        if (!inCart) {
          setInCart(true);
          saveToLocalStorage();
        } else {
          router.push("/cart");
        }
        event.preventDefault();
      }}
    >
      {inCart ? "Открыть в корзине" : "В корзину"}
    </div>
  ) : (
    <div className="rounded font-bold text-sm text-nowrap text-center bg-blue-700 text-white py-3 px-2 w-full cursor-pointer">
      Нет в наличии
    </div>
  );
};

export default ToCartButton;
