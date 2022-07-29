import { FC } from 'react';
import styles from './index.module.css';

type Props = {
  // React18からchildrenを使う場合は明示する必要がある（以前はFCの中にchildrenが含まれていたため明示する必要はなかった）
  // https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-typescript-definitions
  children: React.ReactNode;
  isOpen: boolean;
};

export const BaseModal: FC<Props> = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>{children}</div>
    </div>
  );
};
