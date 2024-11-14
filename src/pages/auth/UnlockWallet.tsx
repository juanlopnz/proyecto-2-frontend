import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { HDNodeWallet, Wallet } from "ethers";
import { close, logoBitcoin } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/auth/AuthContext";

const UnlockWallet = () => {
  const auth = useContext(authContext);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [mnemonic, setMnemonic] = useState("");
  const [openImportModal, setOpenImportModal] = useState(false);

  const handleContinue = async () => {
    let wallet: Wallet | HDNodeWallet;
    if (auth?.walletFile) {
      wallet = await Wallet.fromEncryptedJson(auth.walletFile, password);
      auth?.setWallet(wallet);
      return;
    }
    wallet = Wallet.createRandom();
    const encryptedWallet = await wallet.encrypt(password);
    console.log(encryptedWallet);
    auth?.setWallet(wallet);
    auth?.setWalletFile(encryptedWallet);
  };

  const handleImport = async () => {
    const wallet = Wallet.fromPhrase(mnemonic);
    auth?.setWallet(wallet);
    const encryptedWallet = await wallet.encrypt(password);
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
              {!auth?.walletFile && (
                <button
                  className="text-xs text-gray-300 underline underline-offset-2"
                  onClick={() => setOpenImportModal(true)}
                >
                  o importa una existente
                </button>
              )}
              <IonModal isOpen={openImportModal}>
                <IonHeader>
                  <IonToolbar>
                    <IonTitle class="text-sm font-light">
                      Importar wallet
                    </IonTitle>
                    <IonButtons slot="end">
                      <IonButton onClick={() => setOpenImportModal(false)}>
                        <IonIcon icon={close}></IonIcon>
                      </IonButton>
                    </IonButtons>
                  </IonToolbar>
                </IonHeader>
                <IonContent>
                  <div className="flex flex-col w-full items-center justify-center p-4 gap-4">
                    <p className="text-sm font-light text-center">
                      Para importar tu wallet, simplemente pega tu frase de
                      seguridad en el recuadro inferior y asigna una contraseña
                    </p>
                    <IonInput
                      type="text"
                      placeholder="Frase de seguridad"
                      color={"dark"}
                      class="text-center"
                      onInput={(e) =>
                        setMnemonic((e.target as HTMLInputElement).value)
                      }
                    />
                    <IonInput
                      type="password"
                      placeholder="Contraseña"
                      color={"dark"}
                      class="text-center"
                      onInput={(e) =>
                        setPassword((e.target as HTMLInputElement).value)
                      }
                    />
                    <button
                      className={`transition-all duration-100 bg-[#2f2f2f] py-2 px-4 rounded-md font-light text-sm active:scale-95 active:bg-[#292929]`}
                      onClick={handleImport}
                    >
                      Continuar
                    </button>
                  </div>
                </IonContent>
              </IonModal>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UnlockWallet;
