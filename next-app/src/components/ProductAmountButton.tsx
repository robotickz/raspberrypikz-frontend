"use client";

import { Product } from "@/src/common.types";
import React, { ChangeEvent, useState } from "react";
import ToCartButton from "./ToCartButton";
import ProductAmountInput from "./ProductAmountInput";

interface Props {
  product: Product;
}

const ProductAmountButton = ({ product }: Props) => {
  const [amount, setAmount] = useState(1);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(event.target.value);
    setAmount(newAmount);
  };

  return (
    <>
      <ProductAmountInput
        product={product}
        handleChange={handleInputChange}
      />
      <ToCartButton id={product.id} product={product} amount={amount} />
    </>
  );
};

export default ProductAmountButton;
