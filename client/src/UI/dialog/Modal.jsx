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

  function handleClose() {
    onClose();
  }

  return createPortal(
    <dialog
      className={styles["dialog"]}
      ref={dialog}
      onClose={handleClose}
      
    >
      {modalOpen && (
        <button
          onClick={handleClose}
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
