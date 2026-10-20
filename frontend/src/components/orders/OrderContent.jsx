import OrderSection from "./OrderSection";
import OrdersEmptyState from "./OrdersEmptyState";
import ordersColumns from "./OrdersTableColumns";


function OrderContent({ orders = [] }) {


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
                    label="Resultados do filtro selecionado."
                    columns={ordersColumns}
                    data={[]}
                />
            </div>
            
            <div className="tab-pane" id="ordersSearch" role="tabpanel" aria-labelledby="pills-in-progress-tab" tabIndex="0">
                <OrderSection
                    title="Pesquisa de pedidos"
                    icon="search"
                    label="Resultados encontrados na pesquisa."
                    columns={ordersColumns}
                    data={[]}
                />
            </div>
        </div>
    );
}

export default OrderContent;
