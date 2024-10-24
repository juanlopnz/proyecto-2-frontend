import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { add, arrowDown, arrowUp, personCircleOutline, trashBinOutline } from "ionicons/icons";
import { useState } from 'react';
import { nftListTemp } from './utils';
import NftCard from '../../components/NFT/NftCard';
import AnotherNFTModal from '../../components/NFT/AnotherNFTModal';
import { NFT } from '../../types';

const options = [
  { value: "name", label: "Nombre" },
  { value: "category", label: "Categoría" },
  { value: "price", label: "Precio" },
];

const Home: React.FC = () => {
  const router = useIonRouter();

  const [nftList, setNftList] = useState<NFT[]>(nftListTemp);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedOrderField, setSelectedOrderField] = useState("name");
  const [selectedOrderDirection, setSelectedOrderDirection] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<NFT>();

  const handleSearch = () => {
    console.log("Searching for: ", searchText);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton>
              <IonIcon icon={personCircleOutline} size='large' />
            </IonButton>
          </IonButtons>
          <IonTitle className="text-center">Marketplace</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='flex flex-col w-full justify-center items-center gap-2'>
          <IonSearchbar
            showClearButton='always'
            clearIcon={trashBinOutline}
            placeholder="Buscar por nombre o categoría"
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value!)}
            className='w-full'
          />
          <div className="flex flex-row w-full px-2 gap-2 items-center">
            <IonSelect
              interface='popover'
              label="Ordenar por:"
              labelPlacement='stacked'
              placeholder='Selecciona'
              fill='outline'
              onIonChange={(e) => setSelectedOrderField(e.detail.value)}
            >
              {options.map((option, index) => (
                <IonSelectOption key={index} value={option.value}>{option.label}</IonSelectOption>
              ))}
            </IonSelect>
            <IonIcon
              icon={selectedOrderDirection === "asc" ? arrowUp : arrowDown}
              onClick={() => setSelectedOrderDirection(selectedOrderDirection === "asc" ? "desc" : "asc")}
              size='large'
            />
          </div>
        </div>
        <div className='grid grid-cols-2 pt-4'>
          {nftList.map((nft, index) => (
            <div
              key={index}
              onClick={
                () => {
                  setSelectedNFT(nft);
                  setIsModalOpen(true);
                }
              }>
              <NftCard
                nft={nft}
              />
            </div>
          ))}
        </div>
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton
            onClick={
              () => router.push("/create-nft")
            }
          >
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
        <AnotherNFTModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedNFT={selectedNFT!}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
