import Image from "next/image";
import React from "react";
import parse, { HTMLReactParserOptions, domToReact } from "html-react-parser";
import { Product } from "@/src/common.types";
import ProductAmountButton from "@/src/components/ProductAmountButton";
import { getProduct } from "@/src/helpers/database";
import Link from "next/link";
import { unstable_noStore } from "next/cache";
import { FaRaspberryPi } from "react-icons/fa6";
import type { Metadata } from "next";

interface Params {
  productId: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<Metadata> => {
  const product: Product = await getProduct(params.productId);
  const openGraphImage = { images: [product.imageUrl] };
  return {
    title: product.name,
    description: product.metaDescription,
    keywords: product.keywords,
    openGraph: {
      ...openGraphImage,
    },
  };
};

const RpiDivider = () => {
  return (
    <div className="flex gap-2 mt-10 text-gray-500">
      <div className="border-t border-gray-500 mt-4 mb-6 w-full"></div>
      <FaRaspberryPi fontSize={30} />
      <div className="border-t border-gray-500 mt-4 mb-6 w-full"></div>
    </div>
  );
};

export default async function ProductDetail({ params }: { params: Params }) {
  unstable_noStore();
  const product: Product = await getProduct(params.productId);
  const options: HTMLReactParserOptions = {
    replace(domNode: any) {
      if (!domNode.attribs) {
        return;
      }

      if (domNode.name === "ul") {
        return (
          <ul className="pl-12 list-disc">
            {domToReact(domNode.children, options)}
          </ul>
        );
      }
    },
  };

  return (
    <div className="max-w-[1024px] py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="">
          <Image
            src={product.imageUrl}
            alt="Raspberry Pi 5 Model B (8GB)"
            width="520"
            height="520"
          />
        </div>
        <div className="">
          <div className="text-sm text-gray-500">
            <Link href={"/"}>Главная</Link> /{" "}
            <Link href={`/products/category/${product.category.slug}`}>
              {product.category.name}
            </Link>{" "}
            / {product.name}
          </div>
          <div className="font-bold text-2xl pt-4">{product.name}</div>
          <div className="font-bold text-gray-600 text-2xl pt-4">
            {product.price.toLocaleString("kz")} ₸
          </div>
          <div className="font-bold text-gray-600 text-sm pt-4">
            Доступность:&nbsp;
            {product.amount > 0 ? (
              <span className="font-normal text-green-800">В наличии</span>
            ) : (
              <span className="font-normal text-red-800">Нет в наличии</span>
            )}
          </div>
          <div className="pt-4 inline-flex gap-4">
            <ProductAmountButton product={product} />
          </div>
        </div>
      </div>
      <RpiDivider />
      <div className="text-sm/6">{parse(product.description, options)}</div>
      <RpiDivider />
      {/* <div className="font-bold text-2xl text-red-900 text-center mt-8">
       Вам могут пригодиться
      </div> */}
    </div>
  );
}
