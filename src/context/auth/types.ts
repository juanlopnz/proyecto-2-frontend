import { Wallet } from "ethers";

export type AuthContextType = {
  wallet?: Wallet;
  setWallet: (wallet: Wallet) => void;
  walletFile?: string;
  setWalletFile: (walletFile: string) => void;
};