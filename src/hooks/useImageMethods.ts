import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useState } from "react";

const useImageMethods = () => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined)

  const openGallery = async () => {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Base64, 
        source: CameraSource.Photos, 
        quality: 100,
        allowEditing: false,
        promptLabelHeader: "Selecciona una imagen o video",
      });
      setSelectedImage(image.base64String!); 
    } catch (error) {
      console.error("Error al seleccionar la imagen:", error);
    }
  };

  return { selectedImage, openGallery };
}

export default useImageMethods;