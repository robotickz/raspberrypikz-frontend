import React from "react";
import { Category, Product } from "@/src/common.types";
import {
  getCategoryBySlug,
  getProductsByCategory,
} from "@/src/helpers/database";
import ProductCard from "@/src/components/ProductCard";
import { unstable_noStore } from "next/cache";

interface Params {
  slug: string;
}

export default async function CategoryBySlug({ params }: { params: Params }) {
  unstable_noStore();
  const category: Category = await getCategoryBySlug(params.slug);
  const products: Product[] = await getProductsByCategory(category);

  return (
    <div className="w-full max-w-[1024px]">
      <h1 className="py-8 font-bold text-2xl text-gray-700">{category.name}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1024px]">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
