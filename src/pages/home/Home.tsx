import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  useIonRouter,
} from "@ionic/react";
import {
  add,
  arrowBack,
  arrowDown,
  arrowUp,
  close,
  personCircleSharp,
  search,
  trashBinOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import AnotherNFTModal from "../../components/NFT/AnotherNFTModal";
import { NFT, OrderDirection, OrderOptions } from "../../types";
import NftList from "../../components/NFT/NftList";
import { NftItem } from "../../api/nft/types";
import { NftService } from "../../api/nft/nft.service";

const options = [
  { value: "name", label: "Nombre" },
  { value: "category", label: "Categoría" },
  { value: "price", label: "Precio" },
];

let timeoutId: any;

const Home: React.FC = () => {
  const router = useIonRouter();

  const [nftList, setNftList] = useState<NftItem[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedOrderField, setSelectedOrderField] = useState<OrderOptions>("name");
  const [selectedOrderDirection, setSelectedOrderDirection] = useState<OrderDirection>("ASC");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<NFT>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNfts();
  }, [selectedOrderField, selectedOrderDirection, searchText]);

  const fetchNfts = async () => {
    setIsLoading(true);
    NftService.getNfts(searchText, selectedOrderField, selectedOrderDirection)
      .then((data) => {
        if (data) {
          setNftList(data);
        }
        return;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex w-full items-center justify-center pt-10">
            <div
              className={`flex items-center justify-between overflow-hidden transitions-all duration-500 ${searching ? "w-0" : "w-full px-6"
                }`}
            >
              <h1 className="text-center font-extralight">Marketplace</h1>
              <div className="flex items-center justify-center gap-2">
                <IonIcon
                  icon={personCircleSharp}
                  className="text-xl cursor-pointer"
                  onClick={() => router.push("/profile")}
                />
                <IonIcon
                  icon={search}
                  className="text-xl cursor-pointer"
                  onClick={() => {
                    setSearching(true);
                  }}
                />
              </div>
            </div>
            <div
              className={`flex items-center overflow-hidden transition-all duration-500 ${searching ? "w-full px-3" : "w-0"
                }`}
            >
              <IonIcon
                icon={arrowBack}
                className="text-xl cursor-pointer"
                onClick={() => {
                  setSearching(false);
                  setSearchText("");
                }}
              />
              <IonSearchbar
                showClearButton="always"
                clearIcon={close}
                placeholder="Buscar por nombre o categoría"
                value={searchText}
                onIonInput={(e) => {
                  if (timeoutId) {
                    clearTimeout(timeoutId);
                  }
                  timeoutId = setTimeout(() => {
                    setSearchText(e.detail.value!);
                  }, 300);
                }}
                className="w-full text-xs"
              />
            </div>
          </div>

          <div className="flex flex-row w-full px-3 gap-2 items-center">
            <IonSelect
              interface="popover"
              label="Ordenar por:"
              labelPlacement="floating"
              placeholder="Selecciona"
              className="font-extralight"
              onIonChange={(e) => {
                setSelectedOrderField(e.detail.value);
              }}
            >
              {options.map((option, index) => (
                <IonSelectOption key={index} value={option.value}>
                  {option.label}
                </IonSelectOption>
              ))}
            </IonSelect>
            <IonIcon
              icon={selectedOrderDirection === "ASC" ? arrowUp : arrowDown}
              onClick={() => {
                setSelectedOrderDirection(
                  selectedOrderDirection === "ASC" ? "DESC" : "ASC"
                )
              }}
              className="text-2xl cursor-pointer"
            />
          </div>
        </div>
        {isLoading ? (
          <div className="flex w-full h-full items-center justify-center">
            <IonSpinner />
          </div>
        ) : (
          <NftList items={nftList} onShowDetails={(nft) => router.push(`/details/${nft.id}`)} />
        )}
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton onClick={() => router.push("/create-nft?id=2")}>
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
