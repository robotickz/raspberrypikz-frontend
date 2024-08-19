import { Category } from "@/src/common.types";
import CategoryButton from "@/src/components/CategoryButton";
import { getCategories } from "@/src/helpers/database";

export default async function Categories() {
  const categories: Category[] = await getCategories();

  return (
    <div>
      <h1 className="text-center text-2xl font-bold text-gray-700 pt-8">
        Категории
      </h1>
      <div className="max-w-[1024px] mt-8 flex flex-wrap gap-4">
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            name={category.name}
            slug={category.slug}
          />
        ))}
      </div>
    </div>
  );
}
