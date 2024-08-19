import ProductCard from "@/src/components/ProductCard";
import { Product } from "@/src/common.types";
import getAllProducts from "@/src/helpers/database";
import { Metadata } from "next";
import { unstable_noStore } from "next/cache";

export const metadata: Metadata = {
  title: "Товары - Raspberry Pi - одноплатные компьютеры",
  description: "Товары",
};

export default async function Products() {
  unstable_noStore();
  const products: Product[] = await getAllProducts();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1024px]">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}
