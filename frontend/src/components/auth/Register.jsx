import Input from "../layout/form/Input";
import Button from "../layout/form/Button";
import ActionLink from "../layout/form/ActionLink";
import CheckBox from "../layout/form/CheckBox";

function Register({ close, login }) {
    return (
        <>
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
                    <i className="bi bi-person-plus fs-3"></i>
                </div>
                <h2 className="fw-bold mb-1">Criar conta</h2>
                <p className="text-secondary mb-0">Cadastre-se e comece agora</p>
            </div>

            <form>
                <Input
                    id="register-name"
                    label="Nome completo"
                    type="text"
                    name="name"
                    placeholder="Nome completo"
                />

                <Input
                    id="register-email"
                    label="E-mail"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                />

                <Input
                    id="register-phone"
                    label="Telefone"
                    type="tel"
                    name="phone"
                    placeholder="Telefone"
                />

                <Input
                    id="register-password"
                    label="Senha"
                    type="password"
                    name="password"
                    placeholder="Senha"
                />

                <Input
                    id="register-confirm-password"
                    label="Confirmar senha"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar senha"
                />

                <CheckBox
                    id="acceptTerms"
                    label="Concordo com os termos e políticas de uso"
                    className="mb-4"
                />

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
            </form>
        </>
    );
}

export default Register;
