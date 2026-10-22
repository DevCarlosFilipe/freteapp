import { useState } from "react";
import OrderFilters from "../../components/orders/OrderFilters";
import OrderContent from "../../components/orders/OrderContent";
import OrderSectionSkeleton from "../../components/orders/OrderSectionSkeleton";
import useOrders from "../../hooks/useOrders";
import OrderSearch from "../../components/orders/OrderSearch";

function Orders() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [activeTab, setActiveTab] = useState("ordersResume");
    const [searchTerm, setSearchTerm] = useState("");

    const { orders, loading, error, success, message } = useOrders();

    if (loading) {
        return (
            <div role="status" aria-label="Carregando pedidos">
                <span className="visually-hidden">Carregando seus pedidos...</span>
                <OrderSectionSkeleton />
                <OrderSectionSkeleton />
            </div>
        );
    }

    if (error || !success || !Array.isArray(orders)) {
        return (
            <div className="alert alert-danger" role="alert">
                {error || message || "Não foi possível carregar seus pedidos agora."}
            </div>
        );
    }

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setActiveTab(filter === "all" ? "ordersResume" : "ordersFilter");
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        setActiveTab(
            value.trim()
                ? "ordersSearch"
                : activeFilter === "all"
                    ? "ordersResume"
                    : "ordersFilter"
        );
    };

    return (
        <div className="container">
            <div className="row g-4">
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                        <div>
                            <p className="text-uppercase text-secondary mb-1" style={{ letterSpacing: "0.12em", fontSize: "0.75rem" }}>
                                Painel
                            </p>
                            <h1 className="fw-bold mb-0">Pedidos</h1>
                            <p className="text-secondary mb-0">
                                Acompanhe seus pedidos e entregas.
                            </p>
                        </div>
                        <div>
                            <OrderSearch value={searchTerm} onSearch={handleSearch} />
                        </div>
                    </div>
                    <OrderFilters activeFilter={activeFilter} onChange={handleFilterChange} />
                    <OrderContent
                        orders={orders}
                        activeFilter={activeFilter}
                        activeTab={activeTab}
                        searchTerm={searchTerm}
                    />
                </div>
            </div>
        </div>
    )
}

export default Orders;