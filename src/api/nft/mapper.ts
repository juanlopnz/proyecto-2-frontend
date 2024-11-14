import { NFT, SaleType } from "../../types";
import { NewNft, NftDTO, NftItem, UpdateNft } from "./types";

export const mapNft = (nft: NftDTO): NftItem => {
  return {
    id: nft.id,
    name: nft.name,
    description: nft.description || "No description",
    image: nft.image,
    price: nft.price,
    category: nft.category,
    tags: nft.tags,
    saleType: SaleType[nft.saleType],
    isSold: nft.isSold,
    isDeleted: nft.isDeleted,
    owner: nft.creator,
  }
}

export const mapCreateNft = (nft: NFT): NewNft => {
  return {
    creator: nft.owner,
    name: nft.name,
    description: nft.description || "",
    image: nft.image,
    price: nft.price,
    category: nft.category,
    tags: nft?.tags || [],
    saleType: nft.saleType,
  }
}

export const mapUpdateNft = (nft: Partial<NFT>): UpdateNft => {
  return {
    id: nft.id!,
    name: nft.name || "",
    description: nft.description || "",
    category: nft.category || "",
    tags: nft?.tags || [],
  }
}