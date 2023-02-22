import React, { useState, useContext } from 'react';

type SetModalType = React.Dispatch<React.SetStateAction<string[]>>;

export const ModalContext = React.createContext<Array<string>>([]);
export const SetModalContext = React.createContext<SetModalType>(() => []);

export const useModalContext = () => {
  const modals = useContext(ModalContext);
  const setModals = useContext(SetModalContext);

  return { modals, setModals };
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modals, setModals] = useState<Array<string>>([]);

  return (
    <ModalContext.Provider value={modals}>
      <SetModalContext.Provider value={setModals}>
        {children}
      </SetModalContext.Provider>
    </ModalContext.Provider>
  );
};
