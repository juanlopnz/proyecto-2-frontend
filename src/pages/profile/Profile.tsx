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
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import NftList from "../../components/NFT/NftList";
import { useContext, useEffect, useState } from "react";
import { NftItem } from "../../api/nft/types";
import { nftService } from "../../api/nft/nft.service";
import { authContext } from "../../context/auth/AuthContext";

const Profile = () => {
  const router = useIonRouter();
  const [nftList, setNftList] = useState<NftItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { wallet } = useContext(authContext)!;

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

    nftService.getNftsByUser(walletAddress)
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
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex w-full items-center justify-center py-3">
            Mis tokens
          </div>
          <div className="w-full px-3">
            {isLoading ? (
              <div className="flex w-full items-center justify-center py-3">
                <IonSpinner name="crescent" />
              </div>
            ) : (
              <NftList
                items={nftList}
                onShowDetails={(nft) => router.push(`/edit-nft/${nft.id}`)}
              />
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
