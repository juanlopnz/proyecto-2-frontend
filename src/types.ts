export enum SaleType {
  Fixed = "Fijo",
  Auction = "Subasta"
}

export type NFT = {
  name: string;
  category: string;
  price: number;
  image: string;
  saleType: SaleType;
  isSold: boolean
  owner: string;
}