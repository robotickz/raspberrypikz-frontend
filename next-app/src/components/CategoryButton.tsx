import Link from "next/link";

const CategoryButton = ({ name, slug }: { name: string; slug: string }) => {
    return (
      <Link href={`/products/category/${slug}`}>
        <div className="bg-gradient-to-r from-[#d14637] to-[#e74c3c] shadow-md text-white text-sm font-bold rounded-full w-fit py-3 px-5 mb-4">
          {name} -&gt;
        </div>
      </Link>
    );
  };

  export default CategoryButton;