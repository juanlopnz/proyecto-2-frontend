import Modal from "../Base/Modal";
import NftCard from "./NftCard";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  selectedNFT: NFT | undefined;
}

const AnotherNFTModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedNFT
}: Props) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
      <NftCard
        nft={selectedNFT!}
      />
    </Modal>
  )
}

export default AnotherNFTModal;