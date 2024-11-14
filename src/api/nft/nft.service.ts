import { BaseResponse, NFT, OrderDirection, OrderOptions } from "../../types";
import { endpoints } from "../endpoints";
import { mapCreateNft, mapNft } from "./mapper";
import { NftDTO, NftItem } from "./types";

export const NftService = {
  async createNft(data: NFT): Promise<void> {
    try {
      const mappedData = mapCreateNft(data);
      const response = await fetch(
        endpoints.nft.createNft,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mappedData),
        }
      )
      if (!response.ok) {
        throw new Error("Error creating NFT");
      }
    } catch (error) {
      console.error(error);
    }
  },

  async getNfts(searchValue: string, orderBy: OrderOptions, order: OrderDirection): Promise<NftItem[] | void> {
    try {
      const response = await fetch(`${endpoints.nft.getNfts}?searchValue=${searchValue}&orderBy=${orderBy}&order=${order}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = await response.json() as BaseResponse<NftDTO[] | []>;
      return data.map((nft) => mapNft(nft));
    } catch (error) {
      console.error(error);
    }
  },

  async getNftsByUser() {

  },

  async getNft(id: string) {
    try {
      const response = await fetch(`${endpoints.nft.getNft}/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = await response.json() as BaseResponse<NftDTO>;
      return mapNft(data);  
    } catch (error) {
      console.error(error);
    }
  }
};