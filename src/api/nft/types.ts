export enum SailType {
  auction="Subasta",
  fixed="Precio fijo"
}

export type NftDTO = {
  id: string;
  name: string;
  description: string | null;
  image: string;
  price: number;
  category: string;
  tags: string[];
  sailType: keyof typeof SailType;
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
  sailType: SailType;
  isSold: boolean;
  isDeleted: boolean;
}