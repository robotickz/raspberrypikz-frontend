import React from "react";
import Image from "next/image";
import Link from "next/link";
import ToCartButton from "@/src/components/ToCartButton";
import { Product } from "@/src/common.types";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="border border-red-600 p-4 w-full min-w-min">
      <Link href={"/products/" + product.id}>
        <div className="flex flex-col h-full">
          <div className="relative w-[108px] md:w-[190px] aspect-[4/3] object-cover">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 208px) 100vw"
            />
          </div>
          <div className="text-sm line-clamp-5 text-gray-400 py-2">
            {product.category.name}
          </div>
          <div className="font-bold text-sm pb-2">{product.name}</div>
          <div className="flex flex-col flex-grow"></div>
          <div className="font-bold text-sm pb-4">
            {product.price.toLocaleString("kz")} ₸
          </div>
          <ToCartButton id={product.id} product={product} amount={1} />
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
