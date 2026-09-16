import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createPortal } from "react-dom";
import useApi from "../../hooks/api";

import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

import styles from "./Auth.module.css";

function Auth({ children, action, onSuccess }) {

    const navigate = useNavigate();

    /*
     * ============================================================
     * MODO FORMULÁRIO
     * ============================================================
     *
     * Quando action existe, o próprio Auth funciona como <form>.
     *
     * Exemplo:
     *
     * <Auth action="auth.login">
     *     <Input name="identifier" />
     *     <Input name="password" />
     *     <Button type="submit">Entrar</Button>
     * </Auth>
     *
     */

    const formRef = useRef(null);

    const [formData, setFormData] = useState(null);
    const [requestData, setRequestData] = useState(null);

    const [view, setView] = useState(null);
    const [closing, setClosing] = useState(false);
    const [loginCheckVersion, setLoginCheckVersion] = useState(0);

    const touchStartRef = useRef(null);

    const api = useApi(
        action && requestData
            ? {
                ...requestData,
                action,
                method: "post",
                enabled: true
            }
            : { enabled: false }
    );

    const loading = Boolean(action && requestData && api.loading);
    const response = action && requestData ? api.data : null;
    const error = api.error || (
        response && response.success === false
            ? response.message
            : null
    );
    const errorField = response?.data?.field || null;
    const success = Boolean(response?.success);

    const authCheck = useApi({
        action: "auth.checkAuth",
        method: "post",
        requestVersion: loginCheckVersion,
        enabled: !action && loginCheckVersion > 0
    });

    useEffect(() => {
        if (action || loginCheckVersion === 0 || authCheck.loading || !authCheck.data) {
            return;
        }

        if (authCheck.data.data?.authenticated) {
            navigate("/dashboard");
            return;
        }

        open("login");
    }, [action, authCheck.data, authCheck.loading, loginCheckVersion, navigate]);

    useEffect(() => {
        if (response?.success && onSuccess) {
            onSuccess(response);
        }
    }, [onSuccess, response]);

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

    function handleSubmit(event) {

        event.preventDefault();

        if (!formRef.current) {
            return;
        }

        const form = new FormData(formRef.current);

        const data = {};

        for (const [name, value] of form.entries()) {
            data[name] = value;
        }

        setFormData(data);
        setRequestData(data);
    }

    if (action) {
        return (
            <form
                ref={formRef}
                onSubmit={handleSubmit}
            >
                {typeof children === "function"
                    ? children({
                        data: formData,
                        loading,
                        error,
                        errorField,
                        success
                    })
                    : children
                }
            </form>
        );
    }


    /*
     * ============================================================
     * MODO AUTH / DRAWER
     * ============================================================
     */

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

        setLoginCheckVersion((version) => version + 1);

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

        if (
            !touchStartRef.current ||
            !event.changedTouches.length
        ) {
            return;
        }

        const touch = event.changedTouches[0];

        const deltaX =
            touch.clientX -
            touchStartRef.current.x;

        const deltaY =
            touch.clientY -
            touchStartRef.current.y;

        if (
            deltaX > 90 &&
            Math.abs(deltaX) > Math.abs(deltaY)
        ) {
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