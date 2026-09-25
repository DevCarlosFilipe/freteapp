import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Auth from "./Auth";

import Input from "../layout/form/Input";
import Button from "../layout/form/Button";
import ActionLink from "../layout/form/ActionLink";
import CheckBox from "../layout/form/CheckBox";
import Alert from "../layout/Alert";


function Login({
    register,
    forgotPassword
}) {
    const navigate = useNavigate();

    return (

        <Auth action="auth.login">

            {({
                loading,
                error,
                errorField,
                success
            }) => (

                <>

                    {success && <LoginRedirect navigate={navigate} />}

                    <div className="text-center mb-4">

                        <div
                            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                            style={{
                                width: "64px",
                                height: "64px",
                                backgroundColor: "var(--color-light-theme)",
                                color: "var(--color-theme)"
                            }}
                        >
                            <i className="bi bi-person-lock fs-3"></i>
                        </div>

                        <h2 className="fw-bold mb-1">
                            Entrar
                        </h2>

                        <p className="text-secondary mb-0">
                            Acesse sua conta para continuar
                        </p>

                    </div>



                    {error && (
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert variant="success">
                            Login realizado com sucesso!
                        </Alert>
                    )}

                    <Input
                        id="login-identifier"
                        label="E-mail, usuário ou telefone"
                        type="text"
                        name="email"
                        placeholder="E-mail, usuário ou telefone"
                        error={errorField === "email" ? error : null}
                    />


                    <Input
                        id="login-password"
                        label="Senha"
                        type="password"
                        name="password"
                        placeholder="Senha"
                        error={errorField === "password" ? error : null}
                    />


                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <CheckBox
                            id="rememberMe"
                            name="rememberMe"
                            value="true"
                            label="Lembrar-me"
                        />

                        <ActionLink
                            onClick={forgotPassword}
                            className="small text-decoration-none"
                        >
                            Esqueci minha senha
                        </ActionLink>

                    </div>

                    <div className="d-grid gap-2 mb-3">

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="fw-semibold rounded-pill"
                            disabled={loading}
                        >
                            <i className="bi bi-box-arrow-in-right me-2"></i>

                            {loading
                                ? "Entrando..."
                                : "Entrar"
                            }

                        </Button>

                    </div>


                    <div className="text-center mt-4">

                        <span className="text-secondary small">
                            Ainda não tem conta?
                        </span>

                        <ActionLink
                            onClick={register}
                            className="ms-2 fw-semibold"
                        >
                            Criar conta
                        </ActionLink>

                    </div>

                </>

            )}

        </Auth>

    );

}

function LoginRedirect({ navigate }) {
    useEffect(() => {
        navigate("/dashboard");
    }, [navigate]);

    return null;
}

export default Login;