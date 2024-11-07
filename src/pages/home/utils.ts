import { NFT, SaleType } from "../../types";

export const nftListTemp: NFT[] = [
  {
    id: "1",
    name: "Golden Dragon",
    category: "Art",
    price: 1500,
    image: "https://picsum.photos/900/1200?dummy=1",
    saleType: SaleType.Fixed,
    isSold: false,
    owner: "Alice",
    tags: ["dragon", "gold"]
  },
  {
    id: "2",
    name: "Crypto Kitty #002",
    category: "Collectible",
    price: 500,
    image: "https://picsum.photos/900/1200?dummy=2",
    saleType: SaleType.Fixed,
    isSold: true,
    owner: "Bob",
    tags: ["cat", "crypto"]
  },
  {
    id: "3",
    name: "Virtual Land Plot",
    category: "Real Estate",
    price: 3000,
    image: "https://picsum.photos/900/1200?dummy=3",
    saleType: SaleType.Auction,
    isSold: false,
    owner: "Carol",
    tags: ["land", "metaverse"]
  },
  {
    id: "4",
    name: "Pixel Ape",
    category: "Art",
    price: 2000,
    image: "https://picsum.photos/900/1200?dummy=4",
    saleType: SaleType.Fixed,
    isSold: true,
    owner: "Dave",
    tags: ["ape", "pixel"]
  },
  {
    id: "5",
    name: "Metaverse Villa",
    category: "Real Estate",
    price: 8000,
    image: "https://picsum.photos/900/1200?dummy=5",
    saleType: SaleType.Auction,
    isSold: false,
    owner: "Eve",
    tags: ["villa", "metaverse"]
  }
];
