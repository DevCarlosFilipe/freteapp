// components/orders/ordersTableColumns.jsx (ou direto na página)
import { Link } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDeliveryDate } from "../../utils/formatDeliveryDate";

export const ordersColumns = [
    {
        key: "code",
        header: "# Pedido",
        render: (order) => <span className="fw-semibold">#{order.code}</span>
    },
    {
        key: "recipient",
        header: "Cliente",
        render: (order) => (
            <>
                <div>{order.recipientName}</div>
                <div className="text-secondary small">
                    <i className="bi bi-telephone"></i> {order.recipientPhone}
                </div>
            </>
        )
    },
    {
        key: "route",
        header: "Origem → Destino",
        render: (order) => (
            <>{order.originLabel} <i className="bi bi-arrow-right"></i> {order.destinationLabel}</>
        )
    },
    {
        key: "status",
        header: "Status",
        render: (order) => <OrderStatusBadge status={order.status} />
    },
    {
        key: "forecast",
        header: "Previsão",
        render: (order) => formatDeliveryDate(order.estimatedDeliveryAt || order.requestedPickupDate)
    },
    {
        key: "price",
        header: "Valor",
        render: (order) => formatCurrency(order.price)
    },
    {
        key: "actions",
        header: "Ações",
        render: (order) => (
            <Link to={`/dashboard/orders/${order.id}`}>
                Ver detalhes <i className="bi bi-chevron-right"></i>
            </Link>
        )
    }
];