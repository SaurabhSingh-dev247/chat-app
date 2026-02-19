import styles from "./Modal.module.css";
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

function Modal({ open, children, onClose }) {
  const modalOpen = useSelector((state) => state.ui.modalOpen);
  const dialog = useRef();

  useEffect(() => {
    const dialogElement = dialog.current;

    if (!dialogElement) {
      return;
    }

    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  

  return createPortal(
    <dialog
      className={styles["dialog"]}
      ref={dialog}
      onClose={onClose}
      
    >
      {modalOpen && (
        <button
          onClick={onClose}
          className={styles["close-btn-class"]}
          aria-label="Close modal"
        >
          ✕
        </button>
      )}
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
