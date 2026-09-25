import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAPI from "../../hooks/useAPI";
import Drawer from "../ui/Drawer";

import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

/**
 * Modo gatilho do Auth: um <Auth> sem `action` vira um disparador
 * plantável em qualquer botão do site, que abre login/registro
 * dentro de um Drawer sem quem o chamou precisar saber como.
 *
 * <AuthTrigger>
 *     {({ login, register }) => <button onClick={login}>Entrar</button>}
 * </AuthTrigger>
 */
function AuthTrigger({ children }) {
    const navigate = useNavigate();

    const [view, setView] = useState(null);
    const [checkVersion, setCheckVersion] = useState(0);

    const authCheck = useAPI({
        action: "auth.checkAuth",
        method: "post",
        requestVersion: checkVersion,
        enabled: checkVersion > 0
    });

    useEffect(() => {
        if (checkVersion === 0 || authCheck.loading || !authCheck.data) {
            return;
        }

        if (authCheck.data.data?.authenticated) {
            navigate("/dashboard");
            return;
        }

        open("login");
    }, [authCheck.data, authCheck.loading, checkVersion, navigate]);

    function open(viewName) {
        setView(viewName);
    }

    function close() {
        setView(null);
    }

    function login() {
        setCheckVersion((version) => version + 1);
    }

    function register() {
        open("register");
    }

    function forgotPassword() {
        open("forgot");
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
            {typeof children === "function"
                ? children({ login, register, forgotPassword, close })
                : children
            }

            <Drawer open={Boolean(view)} onClose={close}>
                {renderView()}
            </Drawer>
        </>
    );
}

export default AuthTrigger;