const URL_BASE = "http://localhost:3000"

export const endpoints = {
  nft: {
    getNfts: `${URL_BASE}/nft/getAll`,
    getNftsByUser: `${URL_BASE}/nft/getByUser`,
  },
  user: {
  }
}