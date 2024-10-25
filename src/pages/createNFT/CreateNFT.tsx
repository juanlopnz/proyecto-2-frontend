import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToast,
  IonToolbar,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { arrowBack, imageOutline, addCircle, trash } from "ionicons/icons";
import { Fragment, useContext, useState } from "react";
import useImageMethods from "../../hooks/useImageMethods";
import { NFT, SaleType } from "../../types";
import { authContext } from "../../context/auth/AuthContext";

const CreateNFT = () => {
  const auth = useContext(authContext);
  const router = useIonRouter();
  const [toast] = useIonToast();
  const { selectedImage, openGallery } = useImageMethods();
  const [tagInput, setTagInput] = useState<string>("");

  const [nftData, setNftData] = useState<NFT>({
    name: "",
    category: "",
    price: 0,
    image: "",
    saleType: SaleType.Fixed,
    isSold: false,
    owner: auth?.wallet?.address || "",
    tags: [],
  });

  const options: { label: string; value: string }[] = [
    "Arte",
    "Música",
    "Fotografía",
    "Videojuegos",
    "Deportes",
    "Coleccionable",
    "Otros",
  ].map((category) => ({ label: category, value: category }));

  const handleCreateNFT = () => {
    const nft = { ...nftData, image: selectedImage };
    if (
      Object.values(nft).some(
        (value) => typeof value !== Boolean.name.toLowerCase() && !value
      )
    ) {
      toast("Por favor, rellene todos los campos", 500);
      return;
    }
    toast("NFT creado con éxito", 500);
    return router.push("/home");
  };

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
        <div className="flex flex-col w-full justify-center items-center gap-2 p-4 overflow-auto">
          <div className="flex flex-col gap-2 items-center justify-center w-full aspect-square overflow-hidden rounded-md border border-[#5f5f5f]">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="selected"
                className="w-full object-cover"
              />
            ) : (
              <div
                className="flex flex-col w-full h-full gap-2 items-center justify-center cursor-pointer"
                onClick={openGallery}
              >
                <IonIcon icon={imageOutline} size="large" color="medium" />
                <IonText class="text-center text-xs" color={"medium"}>
                  Agregar imagen
                </IonText>
              </div>
            )}
          </div>
          <div className="flex flex-col w-full py-3 gap-5">
            <IonInput
              class="text-sm w-full"
              fill="outline"
              label="Nombre"
              labelPlacement="floating"
              onInput={(e) =>
                setNftData({
                  ...nftData,
                  name: (e.target as HTMLInputElement).value,
                })
              }
            />
            <IonRadioGroup
              value={nftData.saleType}
              class="flex justify-around w-full items-center text-sm"
            >
              <IonRadio value={SaleType.Fixed} color={"medium"}>
                Venta
              </IonRadio>
              <IonRadio value={SaleType.Auction} color={"medium"}>
                Subasta
              </IonRadio>
            </IonRadioGroup>
            <IonInput
              type="number"
              class="text-sm w-full"
              fill="outline"
              label="Precio"
              labelPlacement="floating"
              onInput={(e) =>
                setNftData({
                  ...nftData,
                  price: Number((e.target as HTMLInputElement).value),
                })
              }
            />
            <IonSelect
              interface="popover"
              label="Categoría"
              labelPlacement="floating"
              fill="outline"
              class="text-sm w-full"
              onIonChange={(e) =>
                setNftData({ ...nftData, category: e.detail.value })
              }
            >
              {options.map((option, index) => (
                <IonSelectOption key={index} value={option.value}>
                  {option.label}
                </IonSelectOption>
              ))}
            </IonSelect>
            <div className="flex w-full items-center justify-stretch gap-2">
              <IonInput
                class="text-sm w-full"
                fill="outline"
                label="Etiquetas"
                labelPlacement="floating"
                value={tagInput}
                onInput={(e) =>
                  setTagInput((e.target as HTMLInputElement).value)
                }
              />
              <IonIcon
                icon={addCircle}
                className="text-2xl cursor-pointer transition-all duration-500"
                color={tagInput ? "light" : "medium"}
                onClick={() => {
                  setNftData({
                    ...nftData,
                    tags: [...nftData.tags, tagInput],
                  });
                  setTagInput("");
                }}
              />
            </div>
            {nftData.tags.length > 0 && (
              <div className="flex flex-col w-full">
                <IonList>
                  {nftData.tags.map((tag, index) => (
                    <IonItem key={index}>
                      <div className="flex w-full items-center justify-between">
                        <IonText class="text-sm">{tag}</IonText>
                        <IonIcon
                          icon={trash}
                          onClick={() =>
                            setNftData({
                              ...nftData,
                              tags: nftData.tags.filter((_, i) => i !== index),
                            })
                          }
                        />
                      </div>
                    </IonItem>
                  ))}
                </IonList>
              </div>
            )}
          </div>
          <IonButton
            expand="block"
            onClick={handleCreateNFT}
            className="text-sm capitalize"
            color={"dark"}
          >
            Crear NFT
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreateNFT;
