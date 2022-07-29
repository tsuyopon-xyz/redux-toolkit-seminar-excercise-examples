// 参考にしたコード: https://github.com/microcmsio/react-hooks-use-modal/blob/master/src/index.tsx
import { useState, useCallback } from 'react';
import { ConfirmModal } from './index';

type OnOKHandlerType = Function | undefined;

export const useConfirmModal = () => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [onOKHandler, setOnOKHandler] = useState<OnOKHandlerType>();

  const open = useCallback(
    (callback: OnOKHandlerType) => {
      setIsOpen(true);
      setOnOKHandler(() => {
        return callback;
      });
    },
    [setIsOpen, setOnOKHandler]
  );
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const ConfirmModalWrapper = useCallback(() => {
    return (
      <ConfirmModal
        isOpen={isOpen}
        message={message}
        onClickOK={() => {
          if (onOKHandler) onOKHandler();
          close();
        }}
        onClickCancel={() => {
          close();
        }}
      />
    );
  }, [isOpen, onOKHandler, message]);

  return { isOpen, open, close, setMessage, ConfirmModalWrapper };
};
