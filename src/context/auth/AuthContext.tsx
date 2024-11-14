import { HDNodeWallet, Wallet } from "ethers";
import { createContext, useEffect, useState } from "react";
import { AuthContextType } from "./types";
import { Preferences } from "@capacitor/preferences";

export const authContext = createContext<AuthContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [wallet, setWallet] = useState<Wallet | HDNodeWallet>();
  const [walletFile, setWalletFile] = useState<string | undefined>(
    // localStorage.getItem("wallet") || undefined
  );

  useEffect(() => {
    const loadWalletFile = async () => {
      const { value } = await Preferences.get({ key: "wallet" })
      setWalletFile(value || undefined);
    }
    loadWalletFile();
  }, [])

  return (
    <authContext.Provider
      value={{
        wallet,
        setWallet,
        walletFile,
        setWalletFile: async (file: string) => {
          // localStorage.setItem("wallet", file);
          try {
            await Preferences.set({ key: "wallet", value: file });
            setWalletFile(file);
          } catch (error) {
            console.error(error);   
          }
        },
      }}
    >
      {children}
    </authContext.Provider>
  );
};