import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { nftListTemp } from "../home/utils";
import NftList from "../../components/NFT/NftList";

const Profile = () => {
  const router = useIonRouter();
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
            <NftList
              items={nftListTemp.slice(2)}
              onShowDetails={(nft) => router.push(`/edit-nft/${nft.id}`)}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
