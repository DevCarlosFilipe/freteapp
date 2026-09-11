function Dashboard() {
    return (
        <div className="container py-5">
            <div className="row g-4">
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                        <div>
                            <p className="text-uppercase text-secondary mb-1" style={{ letterSpacing: "0.12em", fontSize: "0.75rem" }}>
                                Painel
                            </p>
                            <h1 className="fw-bold mb-0">Dashboard</h1>
                        </div>
                    </div>
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
