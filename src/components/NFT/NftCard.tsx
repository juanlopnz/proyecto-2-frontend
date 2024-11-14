import { NftItem } from "../../api/nft/types";
import { NFT } from "../../types";

type Props = {
  nft: NftItem;
  onClick: () => void;
  showDetails: boolean;
  onShowDetails?: (nft: NftItem) => void;
};

const NftCard = ({ nft, onClick, showDetails, onShowDetails }: Props) => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full aspect-[9/12] rounded-md overflow-hidden relative"
      onClick={() => (showDetails ? onShowDetails?.(nft) : onClick())}
    >
      <img
        alt="Silhouette of mountains"
        src={nft.image}
        className={`object-cover w-full h-full z-10 transitions-all duration-500 ${
          showDetails ? "scale-125" : ""
        }`}
      />
      <div
        className={`flex flex-col justify-end w-full h-full z-20 backdrop-brightness-75 absolute top-0 left-0 transitions-all duration-500 select-none p-2 gap-1 ${
          showDetails ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="font-extralight text-xl self-center py-5">Ver más</div>
        <div>{nft.name}</div>
        <div className="font-extralight text-xs">
          WEI {nft.price.toLocaleString("es-CO")}
        </div>
      </div>
    </div>
  );
};

export default NftCard;
