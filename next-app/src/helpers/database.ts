import { Cart, Category, DeliveryData, Product } from "@/src/common.types";
import initPocketBase from "./initPocketbase";
import { ListResult, RecordModel } from "pocketbase";

function _getProducts(dbProducts: ListResult<RecordModel>) {
  const products: Product[] = [];
  if (dbProducts.totalItems > 0) {
    dbProducts.items.forEach((product) => {
      const imageUrl = `${process.env.PB_IMAGE_URL}/api/files/${product.collectionId}/${product.id}/${product.image}`;
      const category: Category = {
        id: product.expand?.category.id,
        name: product.expand?.category.name,
        slug: product.expand?.category.slug,
      };
      products.push({
        id: product.id,
        imageUrl: imageUrl,
        category: category,
        name: product.name,
        description: product.description,
        price: product.price,
        amount: product.amount,
        metaDescription: product.metaDescription,
        keywords: product.keywords,
      } as Product);
    });
  }
  return products;
}

export default async function getAllProducts() {
  const pb = await initPocketBase();
  const dbProducts = await pb
    .collection("products")
    .getList(1, 50, { expand: "category", sort: "-amount" });
  return _getProducts(dbProducts);
}

export async function getProductsByCategory(category: Category) {
  const pb = await initPocketBase();
  const dbProducts = await pb.collection("products").getList(1, 50, {
    expand: "category",
    filter: `category = "${category.id}"`,
    sort: "-amount",
  });
  return _getProducts(dbProducts);
}

export async function getProduct(productId: string) {
  const pb = await initPocketBase();
  const dbProduct = await pb
    .collection("products")
    .getOne(productId, { expand: "category" });
  const imageUrl = `${process.env.PB_IMAGE_URL}/api/files/${dbProduct.collectionId}/${dbProduct.id}/${dbProduct.image}`;
  const category: Category = {
    id: dbProduct.expand?.category.id,
    name: dbProduct.expand?.category.name,
    slug: dbProduct.expand?.category.slug,
  };
  const product: Product = {
    id: dbProduct.id,
    imageUrl: imageUrl,
    category: category,
    name: dbProduct.name,
    description: dbProduct.description,
    price: dbProduct.price,
    amount: dbProduct.amount,
    metaDescription: dbProduct.metaDescription,
    keywords: dbProduct.keywords,
  };
  return product;
}

export async function createCarts(cart: Cart) {
  const pb = await initPocketBase();
  pb.autoCancellation(false);
  const cartsId: string[] = [];
  for (const item of cart.items) {
    const data = {
      product: item.product.id,
      amount: item.amount,
    };
    const record = await pb.collection("carts").create(data);
    cartsId.push(record.id);
  }
  return cartsId;
}

export async function createDelivery(data: DeliveryData) {
  const pb = await initPocketBase();
  return await pb.collection("deliveries").create(data);
}

export async function getLastOrderNumber() {
  const pb = await initPocketBase();
  const order = await pb
    .collection("orders")
    .getFirstListItem("1=1", { sort: "-created" });
  return order?.number;
}

export async function createOrder(cartsId: string[], deliveryId: string) {
  const pb = await initPocketBase();
  const lastOrderNumber = await getLastOrderNumber();
  const data = {
    status: "pending",
    cart: cartsId,
    paid: false,
    delivery: deliveryId,
    number: lastOrderNumber ? lastOrderNumber + 1 : 1,
  };
  return await pb.collection("orders").create(data);
}

export async function getCategories() {
  const pb = await initPocketBase();
  const dbCategories = await pb.collection("categories").getList(1, 50);
  const categories: Category[] = [];
  if (dbCategories.totalItems > 0) {
    dbCategories.items.forEach((dbCategory) => {
      categories.push({
        name: dbCategory.name,
        slug: dbCategory.slug,
      } as Category);
    });
  }
  return categories;
}

export async function getCategoryBySlug(slug: string) {
  const pb = await initPocketBase();
  const dbCategory = await pb
    .collection("categories")
    .getFirstListItem(`slug="${slug}"`);
  const category: Category = {
    id: dbCategory.id,
    name: dbCategory.name,
    slug: dbCategory.slug,
  };
  return category;
}
