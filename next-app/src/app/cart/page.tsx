"use client";
import React, { useEffect, useState } from "react";
import { Cart } from "@/src/common.types";
import { useRouter } from "next/navigation";
import CartProductTable from "@/src/components/CartProductTable";

const CartPage = () => {
  const router = useRouter();
  const initCart: Cart = { items: [] };
  const [cart, setCart] = useState(initCart);

  useEffect(() => {
    const getCartFromStorage = () => {
      let value: Cart = JSON.parse(
        localStorage.getItem("cart") || '{"items":[]}'
      );
      setCart(value);
    };
    getCartFromStorage();
    window.addEventListener("storage", getCartFromStorage);
    return () => {
      window.removeEventListener("storage", getCartFromStorage);
    };
  }, []);

  const getTotalPrice = () => {
    let sum = 0;
    for (let item of cart.items) {
      sum += item.product.price * item.amount;
    }
    return sum;
  };

  return (
    <div className="flex flex-col items-start max-w-[1024px] w-full">
      <div className="text-3xl font-bold mt-12">Корзина</div>
      {cart.items.length ? (
        <>
          <CartProductTable cart={cart} />
          <div className="border w-full md:w-1/2 mt-8 self-end">
            <div className="text-2xl font-bold p-4 bg-gray-50 border-b">
              Сумма заказов
            </div>
            <div className="grid grid-cols-2 p-6 text-gray-500">
              <div className="font-bold">Итого:</div>
              <div>
                {getTotalPrice().toLocaleString("kz")}{" "}
                ₸
              </div>
            </div>
            <div
              className="bg-[#e74c3c] text-center text-white py-3 px-2 w-full cursor-pointer"
              onClick={() => {
                router.push("/checkout");
              }}
            >
              Оформить заказ
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="pt-4">Корзина пуста.</div>
          <div
            className="rounded font-bold text-sm text-nowrap bg-[#e74c3c] text-white py-2 px-10 mt-4 w-fit cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            Вернуться в магазин
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
