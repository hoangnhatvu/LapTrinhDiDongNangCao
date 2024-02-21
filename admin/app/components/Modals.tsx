import { useState } from "react";

import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
} from "@roketid/windmill-react-ui";
import Layout from "app/containers/Layout";

interface IModal {
  children: React.ReactNode;
  isModalOpen: boolean;
  onCloseModal: () => void;
  onSubmit: () => void;
}

function Modals({ children, isModalOpen, onCloseModal, onSubmit }: IModal) {
  return (
    <Modal isOpen={isModalOpen} onClose={onCloseModal}>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <div className="hidden sm:block">
          <Button layout="outline" onClick={onCloseModal}>
            Hủy
          </Button>
        </div>
        <div className="hidden sm:block" onClick={onSubmit}>
          <Button>Chấp nhận</Button>
        </div>
        <div className="block w-full sm:hidden">
          <Button block size="large" layout="outline" onClick={onCloseModal}>
            Hủy
          </Button>
        </div>
        <div className="block w-full sm:hidden">
          <Button block size="large" onClick={onSubmit}>
            Chấp nhận
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default Modals;
