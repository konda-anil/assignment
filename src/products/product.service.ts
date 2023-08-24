import axios from "axios";
import { IProduct, ProductsResponsePayload } from "./product.types";

export const ProduceService = {
  async getProducts(limit: number, skip: number, searchTerm?: string): Promise<ProductsResponsePayload> {
    let url = 'https://dummyjson.com/products';
    if(searchTerm) {
      url = `${url}/search?q=${searchTerm}`
    }
    return axios
      .get(url, {params: {limit, skip}})
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
}

export default ProduceService;