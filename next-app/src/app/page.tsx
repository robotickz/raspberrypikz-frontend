import ProductCard from "@/src/components/ProductCard";
import { Category, Product } from "@/src/common.types";
import getAllProducts, { getCategories } from "@/src/helpers/database";
import CategoryButton from "@/src/components/CategoryButton";
import { unstable_noStore } from "next/cache";

const ProductsByCategoryBlock = ({
  index,
  category,
  products,
}: {
  index: number;
  category: Category;
  products: Product[];
}) => {
  products = products.slice(0, 4);
  return (
    <div
      className={`flex flex-col max-w-[1024px] items-end ${index > 0 ? "mt-8" : ""}`}
    >
      <CategoryButton name={category.name} slug={category.slug} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1024px]">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default async function Home() {
  unstable_noStore();
  const products: Product[] = await getAllProducts();
  const categories: Category[] = await getCategories();

  return (
    <main>
      <div className="flex flex-col max-w-[1024px]">
        {categories.map((category, index) => {
          const productsByCategory: Product[] = products.filter(
            (product) => product.category.slug === category.slug,
          );
          if (productsByCategory.length > 0) {
            return (
              <ProductsByCategoryBlock
                key={index}
                index={index}
                category={category}
                products={productsByCategory}
              />
            );
          }
          return <div key={index}></div>;
        })}
      </div>
    </main>
  );
}
