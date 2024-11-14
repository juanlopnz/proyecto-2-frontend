import { BaseResponse, NFT, OrderDirection, OrderOptions } from "../../types";
import { endpoints } from "../endpoints";
import { mapCreateNft, mapNft, mapUpdateNft } from "./mapper";
import { NftDTO, NftItem } from "./types";

export const nftService = {
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

  async updateNft(data: Partial<NFT>): Promise<void> {
    try {
      const mappedData = mapUpdateNft(data);
      const response = await fetch(
        endpoints.nft.updateNft,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mappedData),
        }
      )
      if (!response.ok) {
        throw new Error("Error updating NFT");
      }
    } catch (error) {
      console.error(error);
    }
  },

  async deleteNft(id: string): Promise<void> {
    try {
      const response = await fetch(
        `${endpoints.nft.deleteNft}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      if (!response.ok) {
        throw new Error("Error deleting NFT");
      }
    } catch (error) {
      console.error(error);
    }
  },

  async getNfts(creator: string, searchValue: string, orderBy: OrderOptions, order: OrderDirection): Promise<NftItem[] | void> {
    try {
      const response = await fetch(`${endpoints.nft.getNfts}?creator=${creator}&searchValue=${searchValue}&orderBy=${orderBy}&orderDirection=${order}`,
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

  async getNftsByUser(creator: string): Promise<NftItem[] | void> {
    try {
      const response = await fetch(`${endpoints.nft.getNftsByUser}/${creator}`,
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