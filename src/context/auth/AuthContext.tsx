import { createContext, useEffect, useState } from "react";
import { AuthContextType } from "./types";
import { HDNodeWallet, Wallet } from "ethers";

export const authContext = createContext<AuthContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [wallet, setWallet] = useState<Wallet | HDNodeWallet>();
  const [walletFile, setWalletFile] = useState<string | undefined>(
    localStorage.getItem("wallet") || undefined
  );

  return (
    <authContext.Provider
      value={{
        wallet,
        setWallet,
        walletFile,
        setWalletFile,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
