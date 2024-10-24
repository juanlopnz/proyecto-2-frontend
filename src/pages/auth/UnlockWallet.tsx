import {
  IonContent,
  IonIcon,
  IonInput,
  IonPage,
  IonText
} from "@ionic/react";
import { HDNodeWallet, Wallet } from "ethers";
import { logoBitcoin } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/auth/AuthContext";

const UnlockWallet = () => {
  const auth = useContext(authContext);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const handleContinue = async () => {
    let wallet: Wallet | HDNodeWallet;
    if (auth?.walletFile) {
      wallet = await Wallet.fromEncryptedJson(auth.walletFile, password);
      auth?.setWallet(wallet);
    }
    wallet = Wallet.createRandom();
    const encryptedWallet = await wallet.encrypt(password);
    auth?.setWallet(wallet);
    auth?.setWalletFile(encryptedWallet);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <IonPage>
      <IonContent>
        <div className="flex w-full flex-col h-full items-center justify-center p-7 gap-2">
          <div
            className={`flex flex-col w-full items-center justify-center gap-2 transition-all duration-700 ${
              loading ? "translate-y-24" : ""
            }`}
          >
            <IonIcon icon={logoBitcoin} className="text-4xl"></IonIcon>
            <h1 className="text-xl font-bold">Bienvenido</h1>
            <div
              className={`flex flex-col w-full items-center transition-all duration-700 py-3 gap-5 ${
                loading ? "opacity-0" : "opacity-100"
              }`}
            >
              {auth?.walletFile ? (
                <IonText class="text-center text-xs">
                  Por favor, ingrese su contraseña para desbloquear su billetera
                </IonText>
              ) : (
                <IonText class="text-center text-xs">
                  Para continuar, crea tu wallet simplemente asignando una
                  contraseña!
                </IonText>
              )}
              <div>
                <IonInput
                  type="password"
                  placeholder="Contraseña"
                  color={"dark"}
                  class="text-center"
                  onInput={(e) =>
                    setPassword((e.target as HTMLInputElement).value)
                  }
                />
              </div>
              <button
                className={`transition-all duration-100 bg-[#2f2f2f] py-2 px-4 rounded-md font-light text-sm active:scale-95 active:bg-[#292929] ${
                  password ? "opacity-100" : "opacity-0"
                }`}
                onClick={handleContinue}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UnlockWallet;
