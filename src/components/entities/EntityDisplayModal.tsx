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
  Text,
} from "@chakra-ui/react";

import Entity from "../../data/Entity";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  entity: Entity;
}

const EntityDisplayModal = ({ isOpen, onClose, entity }: Props) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{entity.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={entity.tokenPicS3Url!} />
          <Text>{entity.description}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EntityDisplayModal;
