import { NftDTO, NftItem, SailType } from "./types";

export const mapNftList = (nftList: NftDTO[]): NftItem[] | [] => {
  return nftList.map((nft) => ({
    id: nft.id,
    name: nft.name,
    description: nft.description || "No description",
    image: nft.image,
    price: nft.price,
    category: nft.category,
    tags: nft.tags,
    sailType: SailType[nft.sailType],
    isSold: nft.isSold,
    isDeleted: nft.isDeleted,
  }))
}