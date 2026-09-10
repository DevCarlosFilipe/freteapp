import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import styles from "./Auth.module.css";

function Auth({ children }) {

    const [view, setView] = useState(null);
    const [closing, setClosing] = useState(false);
    const touchStartRef = useRef(null);

    useEffect(() => {
        if (!view) {
            document.body.style.overflow = "";
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [view]);

    function open(viewName) {
        setClosing(false);
        setView(viewName);
    }

    function close() {

        setClosing(true);

        setTimeout(() => {
            setView(null);
            setClosing(false);
        }, 300);
    }

    function login() {
        open("login");
    }

    function register() {
        open("register");
    }

    function forgotPassword() {
        open("forgot");
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

    function renderContent() {

        if (typeof children === "function") {

            return children({
                login,
                register,
                forgotPassword,
                close
            });
        }

        return children;
    }

    function renderView() {

        switch (view) {

            case "login":
                return (
                    <Login
                        close={close}
                        register={register}
                        forgotPassword={forgotPassword}
                    />
                );

            case "register":
                return (
                    <Register
                        close={close}
                        login={login}
                    />
                );

            case "forgot":
                return (
                    <ForgotPassword
                        close={close}
                        login={login}
                    />
                );

            default:
                return null;
        }
    }

    return (
        <>
            {renderContent()}

            {view && createPortal(
                <div className={styles.overlay}>

                    <div
                        className={styles.shadow}
                        onClick={close}
                    />

                    <aside
                        className={`${styles.drawer} ${
                            closing ? styles.closing : ""
                        }`}
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

                            {renderView()}

                        </div>

                    </aside>

                </div>,
                document.body
            )}

        </>
    );
}

export default Auth;