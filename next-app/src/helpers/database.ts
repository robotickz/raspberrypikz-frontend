import { Cart, Category, DeliveryData, Product } from "@/src/common.types";

// API URL - замените на ваш реальный URL API
// Для работы в Next.js создайте файл .env.local с переменной NEXT_PUBLIC_API_URL
const API_URL = 'http://localhost:8000/api'; // Измените на ваш реальный URL API

function _getProducts(dbProducts: any[]) {
  const products: Product[] = [];
  if (dbProducts.length > 0) {
    dbProducts.forEach((product) => {
      const imageUrl = product.images[0].url;
      const category: Category = {
        id: product.category.id,
        name: product.category.name,
        slug: product.category.slug,
      };
      products.push({
        id: product.id,
        imageUrl: imageUrl,
        category: category,
        name: product.name,
        description: product.description.replace(/(\r\n|\n|\r|\t)/gm, ""),
        price: product.price,
        amount: product.amount,
        metaDescription: product.meta_description,
        keywords: product.keywords,
      } as Product);
    });
  }
  products.sort((a: Product, b: Product) => b.amount - a.amount);
  return products;
}

export default async function getAllProducts() {
  const response = await fetch(`${API_URL}/products`);
  return _getProducts(await response.json());
}

export async function getProductsByCategory(category: Category) {
  const response = await fetch(
    `${API_URL}/products/by_category/${category.id}`,
  );
  return _getProducts(await response.json());
}

export async function getProduct(productId: string) {
  const response = await fetch(
    `${API_URL}/products/${productId}`,
  );
  const dbProduct = await response.json();
  const imageUrl = dbProduct.images[0].url;
  const category: Category = {
    id: dbProduct.category.id,
    name: dbProduct.category.name,
    slug: dbProduct.category.slug,
  };
  const product: Product = {
    id: dbProduct.id,
    imageUrl: imageUrl,
    category: category,
    name: dbProduct.name,
    description: dbProduct.description,
    price: dbProduct.price,
    amount: dbProduct.amount,
    metaDescription: dbProduct.meta_description,
    keywords: dbProduct.keywords,
  };
  return product;
}

async function makePostRequest(url: string, data: any) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function createCarts(cart: Cart) {
  const cartsId: string[] = [];
  for (const item of cart.items) {
    const data = {
      product: parseInt(item.product.id),
      amount: item.amount,
    };
    const newCart = await makePostRequest(
      `${API_URL}/carts/`,
      data,
    );
    if (newCart !== null) {
      cartsId.push(newCart.id);
    }
  }
  return cartsId;
}

export async function createDelivery(dData: DeliveryData) {
  const data = {
    first_name: dData.firstName,
    last_name: dData.lastName,
    organization: dData.organization,
    address: dData.address,
    locality: dData.locality,
    region: dData.region,
    zip_code: dData.zipCode,
    phone: dData.phone,
    email: dData.email,
    is_organization: dData.isOrganization,
  };
  return await makePostRequest(
    `${API_URL}/deliveries/`,
    data,
  );
}

export async function createOrder(cartsId: string[], deliveryId: string) {
  const data = {
    carts: cartsId,
    delivery: deliveryId,
  };
  return await makePostRequest(`${API_URL}/orders/`, data);
}

export async function getCategories() {
  const response = await fetch(`${API_URL}/categories`);
  const dbCategories = await response.json();
  const categories: Category[] = [];
  if (dbCategories.length > 0) {
    dbCategories.forEach((dbCategory: any) => {
      categories.push({
        id: dbCategory.id,
        name: dbCategory.name,
        slug: dbCategory.slug,
      } as Category);
    });
  }
  return categories;
}

export async function getCategoryBySlug(slug: string) {
  const response = await fetch(
    `${API_URL}/categories/by_slug/${slug}`,
  );
  const dbCategory = await response.json();
  const category: Category = {
    id: dbCategory.id,
    name: dbCategory.name,
    slug: dbCategory.slug,
  };
  return category;
}
