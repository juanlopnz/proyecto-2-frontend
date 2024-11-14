import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSpinner,
  IonToolbar,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { arrowBack, copyOutline } from "ionicons/icons";
import NftList from "../../components/NFT/NftList";
import { useContext, useEffect, useState } from "react";
import { NftItem } from "../../api/nft/types";
import { nftService } from "../../api/nft/nft.service";
import { authContext } from "../../context/auth/AuthContext";
import { Clipboard } from "@capacitor/clipboard";

const Profile = () => {
  const router = useIonRouter();
  const { wallet } = useContext(authContext)!;
  const [toast] = useIonToast();
  const [nftList, setNftList] = useState<NftItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const walletData = [
    {
      label: "Dirección",
      value: wallet?.address,
    },
    {
      label: "Clave privada",
      value: wallet?.privateKey,
    }
  ];

  useEffect(() => {
    fetchNfts();
  }, []);

  const fetchNfts = async () => {
    setIsLoading(true);

    const walletAddress = wallet?.address;

    if (!walletAddress) {
      setIsLoading(false);
      return;
    }

    nftService
      .getNftsByUser(walletAddress)
      .then((data) => {
        if (data) {
          setNftList(data);
        }
        return;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => router.goBack()}>
              <IonIcon icon={arrowBack} size="sm" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="flex flex-col w-full items-center justify-center">
          <div className="flex w-full items-center justify-center py-3">
            Mi wallet
          </div>
          <div className="flex flex-col w-11/12">
            {walletData.flatMap((item, index) => {
              return [
                <div className="flex items-center w-full text-sm py-1 border-b gap-2" key={`${index}-1`}>
                  <p>
                    {item.label}
                  </p>
                  <IonIcon icon={copyOutline} size="small" onClick={() => {
                    navigator.clipboard.writeText(item.value || "");
                    Clipboard.write({string: item.value || ""});
                    toast("Copiado al portapapeles", 500);
                  }} />
                </div>,
                <p className="text-sm font-thin py-2" key={`${index}-2`}>
                  {item.value}
                </p>,
              ];
            })}
          </div>
          <div className="flex flex-col w-full justify-center items-center">
            <div className="flex w-full items-center justify-center py-3">
              Mis tokens
            </div>
            <div className="w-full px-3">
              {isLoading ? (
                <div className="flex w-full items-center justify-center py-3">
                  <IonSpinner name="crescent" />
                </div>
              ) : nftList.length === 0 ? (
                <div className="flex w-full items-center justify-center py-3 text-gray-600">
                  No hay tokens
                </div>
              ) : (
                <NftList
                  items={nftList}
                  onShowDetails={(nft) => router.push(`/edit-nft/${nft.id}`)}
                />
              )}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
