import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import styles from "./Auth.module.css";

function Auth({ children }) {

    const [view, setView] = useState(null);
    const [closing, setClosing] = useState(false);

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

            {view && (
                <div className={styles.overlay}>

                    <div
                        className={styles.shadow}
                        onClick={close}
                    />

                    <aside
                        className={`${styles.drawer} ${
                            closing ? styles.closing : ""
                        }`}
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

                </div>
            )}

        </>
    );
}

export default Auth;