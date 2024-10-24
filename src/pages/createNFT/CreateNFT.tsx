import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import { arrowBack, personCircleOutline } from "ionicons/icons";
import { useState } from "react";
import useImageMethods from "../../hooks/useImageMethods";

const CreateNFT = () => {
  const router = useIonRouter();
  const { selectedImage, openGallery } = useImageMethods();

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
            <IonButton
              onClick={() => router.goBack()}
            >
              <IonIcon
                icon={arrowBack} size='large'
              />
            </IonButton>
          </IonButtons>
          <IonTitle className="text-center">Create NFT</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='flex flex-col w-full justify-center items-center gap-2 p-2'>
          <button
            className='bg-blue-800 text-white py-1 rounded-full w-full'
            onClick={openGallery}
          >
            Seleccionar Imagen
          </button>
          {selectedImage && (
            <img src={selectedImage} alt="selected" className="w-full h-60 object-cover rounded-lg" />
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}

export default CreateNFT;