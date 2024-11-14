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
  IonSpinner,
  IonText,
  IonToolbar,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { addCircle, arrowBack, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { NFT, SaleType } from "../../types";
import { options } from "../../utils/constants";
import { nftService } from "../../api/nft/nft.service";

type Props = RouteComponentProps<{ id: string }>;

const EditNFT = ({ match }: Props) => {
  const router = useIonRouter();
  const [loading, setLoading] = useState(true);
  const [nft, setNft] = useState<Partial<NFT>>();
  const [toast] = useIonToast();
  const [tagInput, setTagInput] = useState<string>("");

  useEffect(() => {
    fetchNft();
  }, []);

  const fetchNft = async () => {
    setLoading(true);
    nftService.getNft(match.params.id)
      .then((data) => {
        if (data) {
          setNft(data);
        }
        return;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit = () => {
    nftService.updateNft(nft!)
      .then(() => {
        toast("Guardado", 500);
        return router.goBack();
      })
      .catch((error) => {
        toast("Error al guardar", 500);
        console.error(error);
      });
    return router.goBack();
  };

  const handleDelete = () => {
    nftService.deleteNft(match.params.id)
      .then(() => {
        toast("Eliminado", 500);
        return router.goBack();
      })
      .catch((error) => {
        toast("Error al eliminar", 500);
        console.error(error);
      });
    return router.goBack();
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
        {loading ? (
          <div className="flex w-full h-full items-center justify-center">
            <IonSpinner />
          </div>
        ) : (
          <div className="flex flex-col w-full justify-center items-center gap-2 p-4 overflow-auto">
            <div className="flex flex-col gap-2 items-center justify-center w-full aspect-square overflow-hidden rounded-md border border-[#5f5f5f] cursor-not-allowed">
              <img
                src={nft?.image}
                alt="selected"
                className="w-full object-cover"
              />
            </div>
            <div className="flex flex-col w-full py-3 gap-5">
              <IonInput
                class="text-sm w-full"
                fill="outline"
                label="Nombre"
                labelPlacement="floating"
                value={nft?.name}
                onInput={(e) =>
                  setNft({
                    ...nft,
                    name: (e.target as HTMLInputElement).value,
                  })
                }
              />
              <IonRadioGroup
                value={nft?.saleType}
                class="flex justify-around w-full items-center text-sm"
              >
                <IonRadio value={SaleType.fixed} color={"medium"}>
                  Venta
                </IonRadio>
                <IonRadio value={SaleType.auction} color={"medium"}>
                  Subasta
                </IonRadio>
              </IonRadioGroup>
              <IonInput
                type="number"
                class="text-sm w-full"
                fill="outline"
                label="Precio"
                labelPlacement="floating"
                value={nft?.price}
                onInput={(e) =>
                  setNft({
                    ...nft,
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
                selectedText={nft?.category}
                onIonChange={(e) =>
                  setNft({ ...nft, category: e.detail.value })
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
                  className={`text-2xl transition-all duration-500 ${tagInput ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                  color={tagInput ? "light" : "medium"}
                  onClick={() => {
                    if (!tagInput) return;
                    setNft({
                      ...nft,
                      tags: [...(nft?.tags || []), tagInput],
                    });
                    setTagInput("");
                  }}
                />
              </div>
              {(nft?.tags?.length || 0) > 0 && (
                <div className="flex flex-col w-full">
                  <IonList>
                    {nft?.tags?.map((tag, index) => (
                      <IonItem key={index}>
                        <div className="flex w-full items-center justify-between">
                          <IonText class="text-sm">{tag}</IonText>
                          <IonIcon
                            icon={trash}
                            onClick={() =>
                              setNft({
                                ...nft,
                                tags: nft?.tags?.filter((_, i) => i !== index),
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
            <div className="flex w-full items-center justify-around">
              <IonButton
                expand="block"
                onClick={handleDelete}
                className="text-sm capitalize"
                color={"danger"}
              >
                Eliminar
              </IonButton>
              <IonButton
                expand="block"
                onClick={handleEdit}
                className="text-sm capitalize"
                color={"dark"}
              >
                Guardar
              </IonButton>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default EditNFT;
