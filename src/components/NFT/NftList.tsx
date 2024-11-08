import React, { useState } from "react";
import NftCard from "./NftCard";
import { NFT } from "../../types";

type Props = {
  items: NFT[];
  onShowDetails?: (nft: NFT) => void;
};

const NftList = ({ items, onShowDetails }: Props) => {
  const [selected, setSelected] = useState<number | undefined>();

  return (
    <div className="grid grid-cols-2 w-full overflow-auto p-2 gap-2">
      {items.map((item, index) => (
        <NftCard
          key={index}
          nft={item}
          onClick={() => setSelected(index)}
          showDetails={index === selected}
          onShowDetails={onShowDetails}
        />
      ))}
    </div>
  );
};

export default NftList;
