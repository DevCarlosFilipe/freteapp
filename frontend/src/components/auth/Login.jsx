import Input from "../layout/form/Input";
import Button from "../layout/form/Button";
import ActionLink from "../layout/form/ActionLink";

function Login({
    close,
    register,
    forgotPassword
}) {
    return (
        <div className="w-100" style={{ maxWidth: "440px" }}>
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
                <h2 className="fw-bold mb-1">Entrar</h2>
                <p className="text-secondary mb-0">Acesse sua conta para continuar</p>
            </div>

            <form>
                <Input
                    id="login-email"
                    label="E-mail"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                />

                <Input
                    id="login-password"
                    label="Senha"
                    type="password"
                    name="password"
                    placeholder="Senha"
                />

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="rememberMe" />
                        <label className="form-check-label small text-secondary" htmlFor="rememberMe">
                            Lembrar-me
                        </label>
                    </div>

                    <ActionLink onClick={forgotPassword} className="small text-decoration-none">
                        Esqueci minha senha
                    </ActionLink>
                </div>

                <div className="d-grid gap-2 mb-3">
                    <Button type="submit" variant="primary" size="lg" className="fw-semibold rounded-pill">
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Entrar
                    </Button>
                </div>

                <div className="text-center mt-4">
                    <span className="text-secondary small">Ainda não tem conta?</span>
                    <ActionLink onClick={register} className="ms-2 fw-semibold">
                        Criar conta
                    </ActionLink>
                </div>
            </form>
        </div>
    );
}

export default Login;