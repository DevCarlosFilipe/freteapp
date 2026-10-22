import OrderSection from "./OrderSection";
import OrdersEmptyState from "./OrdersEmptyState";
import ordersColumns from "./OrdersTableColumns";
import applyStatusFilter from "./applyStatusFilter";


function OrderContent({ orders = [], activeFilter, activeTab = "ordersResume", searchTerm = "" }) {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase("pt-BR");

    if (orders.length === 0 && !normalizedSearch) {
        return <OrdersEmptyState />;
    }

    const activeOrders = orders.filter((order) => !order.isHistory);
    const finalizedOrders = orders.filter((order) => order.isHistory);
    const filteredOrders = applyStatusFilter(orders, activeFilter);
    const searchResults = normalizedSearch
        ? orders.filter((order) =>
            [
                order.code,
                order.recipientName,
                order.recipientPhone,
                order.originLabel,
                order.destinationLabel,
                order.status
            ].some((value) =>
                String(value ?? "").toLocaleLowerCase("pt-BR").includes(normalizedSearch)
            )
        )
        : [];

    return (
        <div className="tab-content" id="orderContent">
            <div className={`tab-pane${activeTab === "ordersResume" ? " show active" : ""}`} id="ordersResume" role="tabpanel" aria-labelledby="pills-resume-tab" tabIndex="0">
                <OrderSection
                    title="Pedidos em andamento"
                    icon="clock"
                    label="Pedidos que estão sendo analisados, em rota ou próximos da entrega."
                    columns={ordersColumns}
                    data={activeOrders}
                    limit={15}
                />
                <OrderSection
                    title="Pedidos finalizados"
                    icon="check2"
                    label="Pedidos entregues, cancelados ou com outro status final."
                    columns={ordersColumns}
                    data={finalizedOrders}
                    limit={15}
                />
            </div>
            <div className={`tab-pane${activeTab === "ordersFilter" ? " show active" : ""}`} id="ordersFilter" role="tabpanel" aria-labelledby="pills-in-progress-tab" tabIndex="0">
                <OrderSection
                    title="Filtro de pedidos"
                    icon="filter"
                    label="Resultados do filtro selecionado."
                    columns={ordersColumns}
                    data={filteredOrders}
                />
            </div>

            <div className={`tab-pane${activeTab === "ordersSearch" ? " show active" : ""}`} id="ordersSearch" role="tabpanel" aria-label="Resultados da pesquisa" tabIndex="0">
                <OrderSection
                    title="Pesquisa de pedidos"
                    icon="search"
                    label="Resultados encontrados na pesquisa."
                    limit={50}
                    columns={ordersColumns}
                    data={searchResults}
                />
            </div>
        </div>
    );
}

export default OrderContent;
