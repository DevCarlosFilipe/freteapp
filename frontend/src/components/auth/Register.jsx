import Input from "../ui/form/Input";
import Button from "../ui/form/Button";
import ActionLink from "../ui/form/ActionLink";
import Alert from "../ui/form/Alert";
import { useNavigate } from "react-router-dom";
import BoxIcon from "../ui/BoxIcon";

import Auth from "./Auth";

function Register({ login }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="text-center mb-4">
                <BoxIcon
                    icon="person-plus"
                    className="mx-auto mb-3 fs-3"
                    style={{ width: "64px", height: "64px" }}
                />
                <h2 className="fw-bold mb-1">Criar conta</h2>
                <p className="text-secondary mb-0">Cadastre-se e comece agora</p>
            </div>

            <Auth
                action="auth.register"
                method="post"
                onSuccess={() => navigate("/dashboard")}
            >
                {({ error, errorField }) => (
                    <>
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Input
                            id="register-name"
                            label="Nome de usuário"
                            type="text"
                            name="username"
                            placeholder="Nome de usuário"
                            error={errorField === "username" ? error : null}
                            required
                        />

                        <Input
                            id="register-email"
                            label="E-mail"
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            error={errorField === "email" ? error : null}
                            required
                        />

                        <Input
                            id="register-password"
                            label="Senha"
                            type="password"
                            name="password"
                            placeholder="Senha"
                            minLength={6}
                            error={errorField === "password" ? error : null}
                            required
                        />

                        <Input
                            id="register-confirm-password"
                            label="Confirmar senha"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar senha"
                            minLength={6}
                            error={errorField === "confirmPassword" ? error : null}
                            required
                        />

                        <div className="form-check mb-4">
                            <input
                                className={`form-check-input ${errorField === "acceptTerms" ? "is-invalid" : ""}`.trim()}
                                type="checkbox"
                                name="acceptTerms"
                                value="true"
                                id="acceptTerms"
                                required
                            />
                            <label className="form-check-label small text-secondary" htmlFor="acceptTerms">
                                Concordo com os termos e políticas de uso
                            </label>
                        </div>

                        <div className="d-grid gap-2 mb-3">
                            <Button type="submit" variant="primary" size="lg" className="fw-semibold rounded-pill">
                                <i className="bi bi-person-check me-2"></i>
                                Cadastrar
                            </Button>
                        </div>

                        <div className="text-center mt-4">
                            <span className="text-secondary small">Já possui uma conta?</span>
                            <ActionLink onClick={login} className="ms-2 fw-semibold">
                                Entrar
                            </ActionLink>
                        </div>
                    </>
                )}
            </Auth>
        </>
    );
}

export default Register;