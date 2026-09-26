import { useSearchParams, Link } from "react-router-dom";

import useAPI from "../hooks/useAPI";

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") || "";

    const { data, loading, error } = useAPI({
        action: "auth.verifyEmail",
        method: "post",
        token,
        enabled: Boolean(token)
    });

    const success = data?.success;

    return (
        <div className="container py-5 text-center" style={{ maxWidth: "480px" }}>
            <h1 className="fw-bold mb-4">Verificação de e-mail</h1>

            {!token && (
                <p className="text-danger">Link inválido.</p>
            )}

            {token && loading && (
                <p>Verificando...</p>
            )}

            {token && !loading && (
                <>
                    <p className={success ? "text-success" : "text-danger"}>
                        {error || data?.message}
                    </p>

                    {!success && (
                        <p className="text-secondary small">
                            Se o link expirou ou já foi usado, faça login e use o botão
                            "Reenviar e-mail" no seu painel para receber um novo.
                        </p>
                    )}
                </>
            )}

            <Link to="/dashboard" className="fw-semibold d-inline-block mt-3">
                Ir para o painel
            </Link>
        </div>
    );
}

export default VerifyEmail;