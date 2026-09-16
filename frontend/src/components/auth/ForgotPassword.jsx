import Input from "../layout/form/Input";
import Button from "../layout/form/Button";
import ActionLink from "../layout/form/ActionLink";

function ForgotPassword({ login }) {
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
                    <i className="bi bi-shield-lock fs-3"></i>
                </div>
                <h2 className="fw-bold mb-1">Recuperar senha</h2>
                <p className="text-secondary mb-0">Informe seu e-mail para receber o link de redefinição</p>
            </div>

            <form>
                <Input
                    id="forgot-email"
                    label="E-mail"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                />

                <div className="d-grid gap-2 mb-3">
                    <Button type="submit" variant="primary" size="lg" className="fw-semibold rounded-pill">
                        <i className="bi bi-send me-2"></i>
                        Enviar link
                    </Button>
                </div>

                <div className="text-center mt-4">
                    <span className="text-secondary small">Lembrou a senha?</span>
                    <ActionLink onClick={login} className="ms-2 fw-semibold">
                        Voltar para login
                    </ActionLink>
                </div>
            </form>
        </>
    );
}

export default ForgotPassword;
