export enum SaleType {
  fixed = "fixed",
  auction = "auction"
}

export type NFT = {
  id?: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  saleType: SaleType;
  isSold: boolean
  owner: string;
  tags: string[];
}

export type OrderDirection = "ASC" | "DESC";

export type OrderOptions = "name" | "price" | "category";

export type BaseResponse<T> = {
  status: boolean;
  data: T
}