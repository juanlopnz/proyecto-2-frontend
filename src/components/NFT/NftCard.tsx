import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import { NFT } from "../../types";

type Props = {
  nft: NFT;
};

const NftCard = ({ nft }: Props) => {
  return (
    <IonCard className="w-full h-full">
      <img
        alt="Silhouette of mountains"
        src="https://ionicframework.com/docs/img/demos/card-media.png"
      />
      <IonCardHeader>
        <IonCardSubtitle class="text-xs">{nft.owner}</IonCardSubtitle>
        <IonCardTitle class="text-base">{nft.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="flex flex-col">
          <IonText className="text-[11px]">{nft.category}</IonText>
          <IonText className="text-[11px]">{nft.saleType}</IonText>
          <IonText className="text-[11px]">ETH {nft.price.toLocaleString("es-CO")}</IonText>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default NftCard;
