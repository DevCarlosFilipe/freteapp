import { useCallback, useState } from "react"
import Auth from "../components/auth/Auth"
import useAPI from "../hooks/useAPI"
import styles from "../styles/Testes.module.css"

import Input from "../components/layout/form/Input"
import Button from "../components/layout/form/Button"
import Alert from "../components/layout/Alert"

function Testes() {
    const [authCheckVersion, setAuthCheckVersion] = useState(0)
    const [logoutVersion, setLogoutVersion] = useState(0)
    const refreshAuthCheck = useCallback((response) => {
        if (response?.success) {
            setAuthCheckVersion((version) => version + 1)
        }
    }, [])

    const { data, loading, error } = useAPI({
        action: "auth.checkAuth",
        method: "post",
        requestVersion: authCheckVersion
    })

    const {
        data: logoutData,
        loading: logoutLoading,
        error: logoutError
    } = useAPI({
        action: "auth.logout",
        method: "post",
        requestVersion: logoutVersion,
        enabled: logoutVersion > 0,
        onSuccess: refreshAuthCheck
    })

    return (
        <div className={styles.container}>
            <h1>Testes formulário Auth</h1>

            {loading && <p>Consultando autenticação...</p>}
            {error && <div className="alert alert-danger">Erro: {error}</div>}
            
            <Auth
                action="auth.login"
                onSuccess={refreshAuthCheck}
            >
                <Input
                    id="login-identifier"
                    label="E-mail, usuário ou telefone"
                    type="text"
                    name="email"
                    placeholder="E-mail, usuário ou telefone"
                />
                <Input
                    id="login-password"
                    label="Senha"
                    type="password"
                    name="password"
                    placeholder="Senha"
                />
                <Button type="submit" variant="primary" size="lg" className="fw-semibold rounded-pill">
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Entrar
                </Button>
            </Auth>

            <Button
                type="button"
                variant="danger"
                size="lg"
                className="fw-semibold mt-3"
                onClick={() => setLogoutVersion((version) => version + 1)}
                disabled={logoutLoading}
            >
                <i className="bi bi-box-arrow-right me-2"></i>
                {logoutLoading ? "Saindo..." : "Fazer logout"}
            </Button>

            {logoutError && (
                <Alert variant="danger" className="mt-3">
                    Erro ao fazer logout: {logoutError}
                </Alert>
            )}

            {logoutData?.success && (
                <Alert variant="success" className="mt-3">
                    {logoutData.message}
                </Alert>
            )}

            <h3>Dados da API</h3>
            <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export default Testes