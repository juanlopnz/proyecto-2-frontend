import { SaleType } from "../../types";

export type NftDTO = {
  id: string;
  name: string;
  description: string | null;
  image: string;
  price: number;
  category: string;
  tags: string[];
  saleType: keyof typeof SaleType;
  isSold: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type NftItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  tags: string[];
  saleType: SaleType;
  isSold: boolean;
  isDeleted: boolean;
}

export type NewNft = {
  creator: string;
  name: string;
  description: string | null;
  image: string;
  price: number;
  category: string;
  tags: string[];
  saleType: keyof typeof SaleType;
}