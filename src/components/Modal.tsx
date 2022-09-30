import React from "react";

import styles from './Modal.module.css';

interface Props {
  children: React.ReactNode
}

const Modal = ({children}: Props) => {
  
  const closeModal = (e: React.MouseEvent): void => {
    const modal = document.querySelector('#modal');
    modal!.classList.add('hide');
  };

  return (
    <div>
      <div id="modal" className="hide">
        <div className={styles.fade} onClick={closeModal}></div>
        <div className={styles.modal}>
          <h2>Modal text</h2>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal;