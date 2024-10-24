import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBack, personCircleOutline } from "ionicons/icons";
import { useState } from "react";

const CreateNFT = () => {
  const [nftData, setNftData] = useState<NFT>({
    name: "",
    category: "",
    price: 0,
    image: "",
    saleType: "",
    isSold: false,
    owner: ""
  })
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon
                icon={arrowBack} size='large'
              />
            </IonButton>
          </IonButtons>
          <IonTitle className="text-center">Create NFT</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='flex flex-col w-full justify-center items-center gap-2'>
          <IonButton
            expand='block'
            fill='outline'
            color='primary'
            className='w-full'
          />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default CreateNFT;