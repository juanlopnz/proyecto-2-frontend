import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput } from "@ionic/react";
import Modal from "../Base/Modal";
import { useState } from "react";
import { NFT } from "../../types";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  selectedNFT: NFT;
}

const AnotherNFTModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedNFT
}: Props) => {
  const [currentBid, setCurrentBid] = useState(0);
  const [newBid, setNewBid] = useState(0);

  const handlePlaceBid = () => {
    setCurrentBid(newBid);
    setNewBid(0);
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
      <IonCard className="shadow-lg rounded-lg">
        <img
          alt="NFT image"
          src={"https://ionicframework.com/docs/img/demos/card-media.png"}
          className="w-full h-60 object-cover"
        />
        <IonCardHeader>
          <IonCardSubtitle>{selectedNFT?.owner}</IonCardSubtitle>
          <IonCardTitle>{selectedNFT?.name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent className="p-4">
          <p className="text-gray-500">Categoría: {selectedNFT?.category}</p>
          <p className="text-gray-500">Tipo de venta: {selectedNFT?.saleType}</p>
          <p className="text-lg font-semibold">Precio: ${selectedNFT?.price}</p>

          {selectedNFT?.saleType === "Subasta" && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-lg font-semibold text-gray-700">Oferta actual: ${currentBid}</p>
              <IonInput
                type="number"
                placeholder="Ingresa tu oferta"
                value={newBid}
                onIonChange={(e) => setNewBid(Number(e.detail.value!))}
                className="my-4 border-2 border-gray-300 rounded-lg p-2"
              />
              <button onClick={handlePlaceBid} disabled={newBid <= currentBid}>
                Pujar
              </button>
            </div>
          )}
        </IonCardContent>
      </IonCard>
    </Modal>
  )
}

export default AnotherNFTModal;