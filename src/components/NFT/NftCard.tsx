import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import { NFT } from "../../types";

type Props = {
  nft: NFT;
}

const NftCard = ({
  nft
}: Props) => {
  return (
    <IonCard>
      <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
      <IonCardHeader>
        <IonCardSubtitle>{nft.owner}</IonCardSubtitle>
        <IonCardTitle>{nft.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{nft.category}</p>
        <p>{nft.saleType}</p>
        <p>{nft.price}</p>
      </IonCardContent>
    </IonCard>
  );
}

export default NftCard;