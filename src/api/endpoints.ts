const URL_BASE = "http://localhost:3000"

export const endpoints = {
  nft: {
    createNft: `${URL_BASE}/nft`,
    getNfts: `${URL_BASE}/nft/getAll`,
    getNftsByUser: `${URL_BASE}/nft/getByUser`,
    getNft: `${URL_BASE}/nft`,
  },
  user: {
  }
}