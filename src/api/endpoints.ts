// const URL_BASE = "http://localhost:3000"
const URL_BASE = "https://proyecto-2-backend.onrender.com"

export const endpoints = {
  nft: {
    createNft: `${URL_BASE}/nft`,
    updateNft: `${URL_BASE}/nft`,
    deleteNft: `${URL_BASE}/nft`,
    getNfts: `${URL_BASE}/nft/getAll`,
    getNftsByUser: `${URL_BASE}/nft/getByUser`,
    getNft: `${URL_BASE}/nft`,
  },
}