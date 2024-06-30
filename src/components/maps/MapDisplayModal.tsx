import { useEffect, useState } from "react";
import { Dimensions, getImageSize } from "react-image-size";

import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import Map from "../../data/map/Map";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  map: Map;
}

const MapDisplayModal = ({ isOpen, onClose, map }: Props) => {
  useEffect(() => {
    fetchImageSize();
  }, []);

  const [mapDimensions, setMapDimensions] = useState<Dimensions>();

  const fetchImageSize = () => {
    if (map != null) {
      getImageSize(map.mapPicS3Url!)
        .then((dimensions) => {
          setMapDimensions(dimensions);
        })
        .catch((error) => {
          console.log("Error fetching image dimensions: ", error);
        });
    }
  };

  const modalHeader = (): string => {
    return (
      map.name +
      " (Size " +
      mapDimensions?.width +
      "x" +
      mapDimensions?.height +
      " pixels)"
    );
  };

  const mapMinHeight = (): number | undefined => {
    return mapDimensions?.height;
  };

  const mapMinWidth = (): number | undefined => {
    return mapDimensions?.width;
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent minH={mapMinHeight()} minW={mapMinWidth()}>
        <ModalHeader>{modalHeader()} </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            src={map.mapPicS3Url!}
            width={mapDimensions?.width}
            height={mapDimensions?.height}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MapDisplayModal;
