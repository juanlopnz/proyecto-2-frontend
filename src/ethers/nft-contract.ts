import { ethers } from "ethers";
import CustomNFT from "./abis/customNft.json";

type RawNFT = {
  tokenURI: string;
  tokenUID: string;
  owner: string;
  price: number;
};

export class NftContractManager {
  private static instance: NftContractManager;
  private readonly customNFTContract?: ethers.Contract;

  constructor(wallet: ethers.Wallet | ethers.HDNodeWallet) {
    const signer = wallet.connect(
      ethers.getDefaultProvider(
        "https://sepolia.infura.io/v3/4018cd49de57446c90c58a06588018b7"
      )
    );
    signer.provider?.getBalance(wallet.address).then(console.log);
    this.customNFTContract = new ethers.Contract(
      "0x3D1B6345277BF7923944777663505A54C57265d9",
      CustomNFT.abi,
      signer
    );
  }

  public static getInstance(wallet: ethers.Wallet | ethers.HDNodeWallet) {
    if (!NftContractManager.instance) {
      NftContractManager.instance = new NftContractManager(wallet);
    }
    return NftContractManager.instance;
  }

  public async get(id: string): Promise<RawNFT> {
    return await this.customNFTContract?.getToken(id);
  }

  public async buy(id: string, value: number) {
    const txn = await this.customNFTContract?.buy(id, { value });
    console.log(txn);
    return txn;
  }
}
