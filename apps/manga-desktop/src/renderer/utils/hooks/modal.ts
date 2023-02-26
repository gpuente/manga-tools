import { useModalContext } from '@utils/providers/ModalProvider';

export enum ModalKey {
  Settings = 'Settings',
}

export const useModal = (modal: ModalKey) => {
  const { modals, setModals } = useModalContext();

  const open = modals.some((_modal) => _modal === modal);

  const toggleModal = () => {
    if (open) {
      setModals(modals.filter((_modal) => _modal !== modal));
    } else {
      setModals([...modals, modal]);
    }
  };

  const openModal = () => {
    if (!open) {
      setModals([...modals, modal]);
    }
  };

  const closeModal = () => {
    if (open) {
      setModals(modals.filter((_modal) => _modal !== modal));
    }
  };

  return {
    open,
    openModal,
    closeModal,
    toggleModal,
  };
};
