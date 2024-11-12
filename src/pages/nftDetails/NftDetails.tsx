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
import { arrowBack } from "ionicons/icons";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { NFT } from "../../types";

type Props = RouteComponentProps<{ id: string }>;

const NftDetails = ({ match }: Props) => {
  const [nft, setNft] = useState<NFT>();
  const router = useIonRouter();
  const [toast] = useIonToast();

  const data = [
    {
      label: "Propiedad de",
      value: nft?.owner,
    },
    {
      label: "Categoría",
      value: nft?.category,
    },
    {
      label: "Estado",
      value: nft?.isSold ? "Vendido" : "Disponible",
    },
    {
      label: "Tags",
      value: nft?.tags.join(", "),
    },
  ];

  const buy = () => {
    toast("Comprado", 500);
    return router.goBack();
  }

  useEffect(() => {
  }, []);

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
        {!nft ? (
          <div className="flex w-full h-full items-center justify-center">
            <IonSpinner />
          </div>
        ) : (
          <div className="flex flex-col w-full gap-2 px-3 py-6">
            <div className="items-center justify-center w-full aspect-square overflow-hidden rounded-md">
              <img
                src={nft?.image}
                alt="selected"
                className="w-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <p className="text-2xl text-center font-thin">{nft.name}</p>
              <p className="text-lg text-center font-thin">
                ETH {nft.price.toLocaleString("es-CO")}
              </p>
            </div>
            <p className="text-center py-2">Datos generales</p>
            <div className="flex flex-col w-full">
              {data.flatMap((item) => {
                return [
                  <p className="text-sm py-1 border-b">{item.label}</p>,
                  <p className="text-sm font-thin py-2">{item.value}</p>,
                ];
              })}
            </div>
            <IonButton
              expand="block"
              onClick={buy}
              className="text-sm capitalize"
              color={"dark"}
            >
              Comprar
            </IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default NftDetails;
