import { endpoints } from "../endpoints";
import { BaseResponse, OrderDirection, OrderOptions } from "../types";
import { mapNftList } from "./mapper";
import { NftDTO, NftItem } from "./types";

export const NftService = {
  async createNft() {

  },

  async getNfts(searchValue: string, orderBy: OrderOptions, order: OrderDirection): Promise<NftItem[] | void> {
    try {
      const response = await fetch(`${endpoints.nft.getNfts}?searchValue=${searchValue}&orderBy=${orderBy}&order=${order}`);
      const { data } = await response.json() as BaseResponse<NftDTO[] | []>;
      return mapNftList(data);
    } catch (error) {
      console.error(error);	
    }
  },
  async getNftsByUser() {

  },
};