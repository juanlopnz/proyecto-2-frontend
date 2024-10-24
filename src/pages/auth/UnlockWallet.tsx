import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonRippleEffect,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/auth/AuthContext";
import { logoBitcoin, lockClosed } from "ionicons/icons";

const UnlockWallet = () => {
  const auth = useContext(authContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <IonPage>
      <IonContent>
        <div className="flex w-full flex-col h-full items-center justify-center p-12 gap-6">
          <div
            className={`flex flex-col w-full items-center justify-center gap-2 transition-all duration-700 ${
              loading ? "" : "-translate-y-32"
            }`}
          >
            <IonIcon icon={logoBitcoin} className="text-4xl"></IonIcon>
            <h1 className="text-xl font-bold">Bienvenido</h1>
          </div>
          <div></div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UnlockWallet;
