import { useSearchParams, Link } from "react-router-dom";

import Auth from "../components/auth/Auth";
import Input from "../components/layout/form/Input";
import Button from "../components/layout/form/Button";
import Alert from "../components/layout/Alert";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") || "";

    return (
        <div className="container py-5" style={{ maxWidth: "480px" }}>
            <h1 className="fw-bold mb-4">Redefinir senha</h1>

            {!token && (
                <Alert variant="danger">
                    Link inválido. Solicite uma nova redefinição de senha.
                </Alert>
            )}

            {token && (
                <Auth action="auth.resetPassword">
                    {({ loading, error, errorField, success }) => (
                        <>
                            {error && (
                                <>
                                    <Alert variant="danger">{error}</Alert>

                                    <Link to="/" className="fw-semibold d-inline-block mb-3">
                                        Voltar e solicitar um novo link
                                    </Link>
                                </>
                            )}

                            {success ? (
                                <>
                                    <Alert variant="success">
                                        Senha redefinida com sucesso!
                                    </Alert>

                                    <Link to="/" className="fw-semibold">
                                        Voltar para o início e fazer login
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <input type="hidden" name="token" value={token} />

                                    <Input
                                        id="reset-password"
                                        label="Nova senha"
                                        type="password"
                                        name="password"
                                        placeholder="Nova senha"
                                        minLength={6}
                                        error={errorField === "password" ? error : null}
                                        required
                                    />

                                    <Input
                                        id="reset-confirm-password"
                                        label="Confirmar nova senha"
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirmar nova senha"
                                        minLength={6}
                                        error={errorField === "confirmPassword" ? error : null}
                                        required
                                    />

                                    <div className="d-grid gap-2 mt-3">
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            className="fw-semibold rounded-pill"
                                            disabled={loading}
                                        >
                                            {loading ? "Salvando..." : "Salvar nova senha"}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </Auth>
            )}
        </div>
    );
}

export default ResetPassword;