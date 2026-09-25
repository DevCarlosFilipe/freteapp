import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./Drawer.module.css";

/**
 * Casco visual genérico de gaveta lateral: portal, overlay,
 * swipe-to-close e trava de scroll do body.
 *
 * Não sabe nada sobre o que é renderizado dentro — pode virar
 * o drawer de auth, de carrinho, de filtros, etc.
 */
function Drawer({ open, onClose, children }) {
    const [closing, setClosing] = useState(false);
    const touchStartRef = useRef(null);

    useEffect(() => {
        if (!open) {
            document.body.style.overflow = "";
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    function close() {
        setClosing(true);

        setTimeout(() => {
            setClosing(false);
            onClose();
        }, 300);
    }

    function handleTouchStart(event) {
        if (event.touches.length !== 1) {
            return;
        }

        const touch = event.touches[0];

        touchStartRef.current = {
            x: touch.clientX,
            y: touch.clientY
        };
    }

    function handleTouchEnd(event) {
        if (!touchStartRef.current || !event.changedTouches.length) {
            return;
        }

        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - touchStartRef.current.x;
        const deltaY = touch.clientY - touchStartRef.current.y;

        if (deltaX > 90 && Math.abs(deltaX) > Math.abs(deltaY)) {
            close();
        }

        touchStartRef.current = null;
    }

    if (!open) {
        return null;
    }

    return createPortal(
        <div className={styles.overlay}>
            <div
                className={styles.shadow}
                onClick={close}
            />

            <aside
                className={`${styles.drawer} ${closing ? styles.closing : ""}`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <button
                    className={styles.closeButton}
                    onClick={close}
                    aria-label="Fechar"
                >
                    ←
                </button>

                <div className={styles.content}>
                    {children}
                </div>
            </aside>
        </div>,

        document.body
    );
}

export default Drawer;