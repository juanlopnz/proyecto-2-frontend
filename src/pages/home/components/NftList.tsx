import React, { useState } from "react";
import { NFT } from "../../../types";
import NftCard from "./NftCard";

type Props = {
  items: NFT[];
};

const NftList = ({ items }: Props) => {
  const [selected, setSelected] = useState<number | undefined>();

  return (
    <div className="grid grid-cols-2 w-full overflow-auto p-2 gap-2">
      {items.map((item, index) => (
        <NftCard
          key={index}
          nft={item}
          onClick={() => setSelected(index)}
          showDetails={index === selected}
        />
      ))}
    </div>
  );
};

export default NftList;
