export type IProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[] ;
  actions: string;
}

export type ProductsResponsePayload = {
  products: IProduct[],
  total: number;
  skip: number;
  limit: number;
}