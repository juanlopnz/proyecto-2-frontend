import { IonBackButton, IonButtons, IonCardContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { NFT } from "../../types";
import { nftListTemp } from "./utils";

interface Props extends RouteComponentProps<{
  id: string;
}> {}

const SingleNFT = ({
  match
}: Props) => {
  const [currentBid, setCurrentBid] = useState(0);
  const [newBid, setNewBid] = useState(0);
  const [selectedNFT, setSelectedNFT] = useState<NFT>();

  useEffect(() => {
    console.log("Selected NFT ID: ", match.params.id);
    setSelectedNFT(nftListTemp.find((nft) => nft.id === match.params.id));
  }, [match.params.id]);

  const handlePlaceBid = () => {
    setCurrentBid(newBid);
    setNewBid(0);
  }

  return (
    <IonPage>
      <img
        alt="NFT image"
        src={"https://ionicframework.com/docs/img/demos/card-media.png"}
        className="w-full h-60 object-cover"
      />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>{selectedNFT?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonCardContent className="p-4">
        <h2>{selectedNFT?.owner}</h2>
        <p className="text-gray-500">Categoría: {selectedNFT?.category}</p>
        <p className="text-gray-500">Tipo de venta: {selectedNFT?.saleType}</p>
        <p className="text-lg font-semibold">Precio: ${selectedNFT?.price}</p>

        {selectedNFT?.saleType === "Subasta" && (
          <div className="flex flex-col gap-2 p-2 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold text-gray-700">Oferta actual: ${currentBid}</p>
            <input
              type="number"
              placeholder="Ingresa tu oferta"
              value={newBid}
              onChange={(e) => setNewBid(Number(e.target.value!))}
              className="bg-white text-gray-700 border-2 p-1"
            />
            <button
              className="bg-blue-800 text-white py-2 px-4 rounded-lg"
              onClick={handlePlaceBid}
              disabled={newBid <= currentBid}
            >
              Pujar
            </button>
          </div>
        )}
      </IonCardContent>
    </IonPage>
  )
}

export default SingleNFT;