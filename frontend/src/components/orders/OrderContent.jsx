import OrderSection from "./OrderSection";
import OrdersEmptyState from "./OrdersEmptyState";
import OrderSectionSkeleton from "./OrderSectionSkeleton";

import { ordersColumns } from "./OrdersTableColumns";
import useAPI from "../../hooks/useAPI";


function OrderContent() {
    const { data, loading, error } = useAPI({
        action: "orders.list",
        method: "post"
    });

    if (loading) {
        return (
            <div role="status" aria-label="Carregando pedidos">
                <span className="visually-hidden">Carregando seus pedidos...</span>
                <OrderSectionSkeleton />
                <OrderSectionSkeleton />
            </div>
        );
    }

    if (error || !data?.success || !Array.isArray(data?.data?.orders)) {
        return (
            <div className="alert alert-danger" role="alert">
                {error || data?.message || "Não foi possível carregar seus pedidos agora."}
            </div>
        );
    }

    const orders = data.data.orders;

    if (orders.length === 0) {
        return <OrdersEmptyState />;
    }

    const activeOrders = orders.filter((order) => !order.isHistory);
    const finalizedOrders = orders.filter((order) => order.isHistory);

    return (
        <div className="tab-content" id="orderContent">
            <div className="tab-pane show active" id="ordersResume" role="tabpanel" aria-labelledby="pills-resume-tab" tabIndex="0">
                <OrderSection
                    title="Pedidos em andamento"
                    icon="clock"
                    label="Pedidos que estão sendo analisados, em rota ou próximos da entrega."
                    columns={ordersColumns}
                    data={activeOrders}
                />
                <OrderSection
                    title="Pedidos finalizados"
                    icon="check2"
                    label="Pedidos entregues, cancelados ou com outro status final."
                    columns={ordersColumns}
                    data={finalizedOrders}
                />
            </div>
            <div className="tab-pane" id="ordersFilter" role="tabpanel" aria-labelledby="pills-in-progress-tab" tabIndex="0">
                <OrderSection
                    title="Filtro de pedidos"
                    icon="filter"
                    label="Aqui você pode filtrar seus pedidos."
                    columns={ordersColumns}
                    data={[]}
                />
            </div>
        </div>
    );
}

export default OrderContent;
