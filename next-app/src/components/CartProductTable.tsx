"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { Cart, CartItem } from "@/src/common.types";
import ProductAmountInput from "./ProductAmountInput";
import { FaRegTrashCan } from "react-icons/fa6";

const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: { matches: any }) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    if (media.addEventListener) {
      media.addEventListener("change", updateTarget);
    } else {
      // compatibility for browser that don't have addEventListener
      media.addListener(updateTarget);
    }
    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }
    if (media.removeEventListener) {
      return () => media.removeEventListener("change", updateTarget);
    } else {
      // compatibility for browser that dont have removeEventListener
      return () => media.removeListener(updateTarget);
    }
  }, [updateTarget, width]);

  return targetReached;
};

const CartProductTable = ({ cart }: { cart: Cart }) => {

  const removeFromCart = (item: CartItem) => {
    const index = cart.items.indexOf(item);
    cart.items.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  };

  const isBreakpoint = useMediaQuery(768);

  return (
    <>
      {isBreakpoint ? (
        <div className="w-full border-b border-x text-gray-500">
          {cart.items.map((item) => (
            <div key={item.id} className="grid grid-cols-1">
              <div className="border-t flex flex-row-reverse bg-gray-50">
                <div
                  className="justify-self-end w-fit"
                  onClick={() => removeFromCart(item)}
                >
                  <FaRegTrashCan fontSize={26} />
                </div>
              </div>
              <div className="border-t flex flex-col items-center">
                <div className="w-fit m-2">
                  <Image
                    src={item.product.imageUrl}
                    alt="Product Image"
                    width={72}
                    height={72}
                    className="w-auto"
                  />
                </div>
              </div>
              <div className="border-t flex justify-between p-3">
                <div className="text-sm font-bold">Товар:</div>
                <div className="text-sm">{item.product.name}</div>
              </div>
              <div className="border-t flex justify-between p-3">
                <div className="text-sm font-bold">Цена:</div>
                <div className="text-sm">{item.product.price.toLocaleString("kz")} ₸</div>
              </div>
              <div className="border-t flex justify-between p-3">
                <div className="text-sm font-bold">Количество:</div>
                <div className="text-sm">{item.amount}</div>
              </div>
              <div className="border-t flex justify-between p-3">
                <div className="text-sm font-bold">Подытог:</div>
                <div className="text-sm">
                  {(item.product.price * item.amount).toLocaleString("kz")} ₸
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className="table-auto w-full border mt-6">
          <thead className="text-left text-sm text-gray-500 border-b bg-gray-50">
            <tr>
              <th></th>
              <th></th>
              <th className="py-3">Товар</th>
              <th>Цена</th>
              <th>Количество</th>
              <th>Подытог</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-6">
                  <div onClick={() => removeFromCart(item)} className="cursor-pointer">
                  <FaRegTrashCan fontSize={26} />
                  </div>
                </td>
                <td className="py-2">
                  <Image
                    src={item.product.imageUrl}
                    alt="Product Image"
                    width={72}
                    height={72}
                    className="w-auto"
                  />
                </td>
                <td>{item.product.name}</td>
                <td>{item.product.price.toLocaleString("kz")} ₸</td>
                <td><ProductAmountInput product={item.product} /></td>
                <td>{(item.product.price * item.amount).toLocaleString("kz")} ₸</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CartProductTable;
