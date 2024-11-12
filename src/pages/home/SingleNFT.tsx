import { IonBackButton, IonButtons, IonCardContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { NftItem } from "../../api/nft/types";
import { NftService } from "../../api/nft/nft.service";
import { SaleType } from "../../types";

interface Props extends RouteComponentProps<{ id: string }> { }

const SingleNFT: React.FC<Props> = ({ match }) => {
  const [currentBid, setCurrentBid] = useState(0);
  const [newBid, setNewBid] = useState(0);
  const [selectedNFT, setSelectedNFT] = useState<NftItem>();

  useEffect(() => {
    fetchNft();
  }, [match.params.id]);

  const fetchNft = async () => {
    NftService.getNft(match.params.id)
      .then((data) => {
        setSelectedNFT(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handlePlaceBid = () => {
    setCurrentBid(newBid);
  };

  return (
    <IonPage>
      <img
        alt="NFT image"
        src="https://ionicframework.com/docs/img/demos/card-media.png"
        className="w-full h-60 object-cover"
      />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{selectedNFT?.name || "NFT Detalle"}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonCardContent className="p-4">
        <h2 className="text-2xl font-bold">{selectedNFT?.name || "Propietario Desconocido"}</h2>
        <p className="text-gray-500 mb-2">Categoría: {selectedNFT?.category || "N/A"}</p>
        <p className="text-gray-500 mb-4">Tipo de venta: {selectedNFT?.saleType || "N/A"}</p>
        <p className="text-lg font-semibold mb-4">Precio: ${selectedNFT?.price?.toLocaleString() || "N/A"}</p>

        {selectedNFT?.saleType === SaleType.fixed && (
          <div className="flex flex-col gap-2 p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold text-gray-700">
              Oferta actual: ${currentBid.toLocaleString()}
            </p>
            <input
              type="number"
              placeholder="Ingresa tu oferta"
              value={newBid}
              onChange={(e) => setNewBid(Number(e.target.value))}
              className="bg-white text-gray-700 border-2 p-2 rounded-lg"
              min={currentBid + 1}
            />
            <button
              className={`py-2 px-4 rounded-lg ${newBid > currentBid ? 'bg-blue-800 text-white' : 'bg-gray-400 text-gray-200'}`}
              onClick={handlePlaceBid}
              disabled={newBid <= currentBid}
            >
              Pujar
            </button>
          </div>
        )}
      </IonCardContent>
    </IonPage>
  );
};

export default SingleNFT;
