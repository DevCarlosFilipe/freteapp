import { Link } from "react-router-dom";
import OrderStatus from "./OrderStatus";
import { formatCurrency } from "../../utils/FormatCurrency";
import { formatDeliveryDate } from "../../utils/FormatDeliveryDate";
import styles from "./Orders.module.css";

const ordersColumns = [
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
                <div className={styles.boxTextIcon}>
                    <i className="bi bi-person-circle"></i>
                    {order.recipientName}
                </div>
                <div className={`text-secondary small ${styles.boxTextIcon}`}>
                    <i className="bi bi-telephone"></i>
                    {order.recipientPhone}
                </div>
            </>
        )
    },
    {
        key: "route",
        header: (
            <div className={styles.boxTextIcon}>
                Origem <i className="bi bi-arrow-right-short"></i> Destino
            </div>
        ),
        render: (order) => (
            <>
                <div className={styles.boxTextIcon}>
                    <i className="bi bi-geo-alt"></i>
                    {order.originLabel}
                </div>
                <div className={`text-secondary small ${styles.boxTextIcon}`}>
                    <i className="bi bi-arrow-right"></i>
                    {order.destinationLabel}
                </div>
            </>
        )
    },
    {
        key: "status",
        header: "Status",
        render: (order) => <OrderStatus status={order.status} />
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

export default ordersColumns;