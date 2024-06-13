import {
  Box,
  Button,
  Grid,
  GridItem,
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
    <Modal size="2xl" onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{entity.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateRows="2" templateColumns="3" gap={2}>
            <GridItem rowSpan={2} colSpan={1}>
              <Image src={entity.tokenPicS3Url!} />
            </GridItem>
            <GridItem colSpan={3}>
              <Text>{entity.description}</Text>
            </GridItem>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EntityDisplayModal;
