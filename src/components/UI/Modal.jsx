import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = "", onClose }) {
  const dialog = useRef();
  const modal = dialog.current;
  useEffect(() => {
    if (open) {
      modal.showModal();
    }
    return () => {
      dialog.current.close();
    };
  }, [open]);
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
