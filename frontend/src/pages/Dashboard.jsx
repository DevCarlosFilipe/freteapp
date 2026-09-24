import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "../hooks/api";

function getGreeting(hour) {
    if (hour >= 18) {
        return "Boa noite";
    }

    if (hour >= 12) {
        return "Boa tarde";
    }

    return "Bom dia";
}

function Dashboard() {
    const navigate = useNavigate();
    const [logoutVersion, setLogoutVersion] = useState(0);

    const { data, loading, error } = useAPI({
        action: "auth.checkAuth",
        method: "post"
    });

    useEffect(() => {
        if (!loading && data?.data?.authenticated === false) {
            navigate("/");
        }
    }, [data, loading, navigate]);

    const handleLogoutSuccess = useCallback((response) => {
        if (response?.success) {
            navigate("/");
        }
    }, [navigate]);

    const {
        loading: logoutLoading,
        error: logoutError
    } = useAPI({
        action: "auth.logout",
        method: "post",
        requestVersion: logoutVersion,
        enabled: logoutVersion > 0,
        onSuccess: handleLogoutSuccess
    });

    const user = data?.data?.user;
    const greeting = getGreeting(new Date().getHours());

    if (!loading && data?.data?.authenticated === false) {
        return null;
    }

    return (
        <div className="container py-5">
            <div className="row g-4">
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                        <div>
                            <p className="text-uppercase text-secondary mb-1" style={{ letterSpacing: "0.12em", fontSize: "0.75rem" }}>
                                Painel
                            </p>
                            <h1 className="fw-bold mb-2">
                                {loading
                                    ? "Carregando seu painel..."
                                    : `${greeting}, ${user?.username || "viajante"}!`
                                }
                            </h1>
                            <p className="text-secondary mb-0">
                                {error
                                    ? "Não foi possível consultar sua sessão agora."
                                    : "Que bom ter você por aqui. Vamos fazer esse dia render?"
                                }
                            </p>
                        </div>

                        <button
                            type="button"
                            className="app-action-button app-action-button--outline"
                            onClick={() => setLogoutVersion((version) => version + 1)}
                            disabled={logoutLoading}
                        >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            {logoutLoading ? "Saindo..." : "Sair"}
                        </button>
                    </div>

                    {logoutError && (
                        <div className="alert alert-danger mb-0" role="alert">
                            Não foi possível sair agora. Tente novamente.
                        </div>
                    )}
                </div>

                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary small mb-2">Resumo</p>
                            <h3 className="fw-bold mb-0">Dados do usuário</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary small mb-2">Atividades</p>
                            <h3 className="fw-bold mb-0">Histórico</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary small mb-2">Status</p>
                            <h3 className="fw-bold mb-0">Informações</h3>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h4 className="fw-bold mb-3">Detalhes</h4>
                            <p className="text-secondary mb-0">
                                Aqui futuramente serão exibidos os dados específicos do usuário, métricas, entregas, configurações e demais informações relevantes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
