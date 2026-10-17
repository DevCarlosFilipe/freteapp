import SearchInput from "../../components/ui/form/SearchInput";
import OrderFilters from "../../components/orders/OrderFilters";
import OrderContent from "../../components/orders/OrderContent";

function Orders() {
    return (
        <div className="container py-5">
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
                            <SearchInput placeholder="Buscar por número do pedido, cliente ou destino..." />
                        </div>
                    </div>
                    <OrderFilters />
                    <OrderContent />
                </div>
            </div>
        </div>
    )
}

export default Orders;