import { HDNodeWallet, Wallet } from "ethers";

export type AuthContextType = {
  wallet?: Wallet | HDNodeWallet;
  setWallet: (wallet: Wallet | HDNodeWallet) => void;
  walletFile?: string;
  setWalletFile: (walletFile: string) => void;
};