"use client";
import Image from "next/image";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { Cart, CartItem } from "@/src/common.types";
import HeaderCartButton from "@/src/components/HeaderCartButton";
import { useRouter } from "next/navigation";
import { FaRegTrashCan } from "react-icons/fa6";

const HeaderCartList = ({
  cart,
  callback,
}: {
  cart: Cart;
  callback: React.MouseEventHandler;
}) => {
  const router = useRouter();
  const [basket, setBasket] = useState(cart);

  const getTotalPrice = () => {
    let sum = 0;
    for (let item of cart.items) {
      sum += item.product.price * item.amount;
    }
    return sum;
  };

  const removeFromCart = (item: CartItem) => {
    const index = cart.items.indexOf(item);
    cart.items.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div>
      {cart.items.map((item, index) => (
        <div key={index} className="flex items-center gap-5 bg-gray-50 mt-4">
          <div className="w-1/4">
            <Image
              src={item.product.imageUrl}
              alt={item.product.name}
              width={72}
              height={72}
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="text-sm font-bold leading-6">
              {item.product.name}
            </div>
            <div className="text-sm font-bold">
              {item.amount}&nbsp;x&nbsp;{item.product.price.toLocaleString("kz")}
            </div>
          </div>
          <div
            className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 cursor-pointer h-fit"
            onClick={() => removeFromCart(item)}
          >
            <FaRegTrashCan fontSize={26} />
          </div>
        </div>
      ))}

      <div className="text-xl text-center py-5">
        <strong>Подытог:</strong> {getTotalPrice().toLocaleString("kz")} ₸
      </div>
      <HeaderCartButton
        text="Просмотр корзины"
        callback={(event) => {
          callback(event);
          router.push("/cart");
        }}
      />
      <HeaderCartButton
        text="Оформление заказа"
        callback={(event) => {
          callback(event);
          router.push("/checkout");
        }}
      />
    </div>
  );
};

export default HeaderCartList;
