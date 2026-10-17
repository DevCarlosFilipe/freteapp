import styles from "./Orders.module.css";
import Table from "../ui/Table";

function OrderSection({ title, icon, label, data = [] }) {
    function countOrders (data) {
        return data.length + " Pedidos";
    }
    return (
        <div className="card h-100 border-0 shadow-sm p-3 mb-4">
            <div className="d-flex align-items-center gap-3 mb-3">
                {icon &&
                    <div className={styles.boxIcon}>
                        <i className={`bi bi-${icon}`}></i>
                    </div>
                }
                <div className={styles.boxTitle}>
                    <h4 className="fw-bold mb-0">{title}</h4>
                    <p className="text-secondary mb-0">
                        {label}
                    </p>
                </div>
                <div className={styles.boxCount}>
                    <span>{countOrders(data)}</span>
                </div>
            </div>

            <Table columns={Object.keys(data[0] || {})} data={data} />

        </div>
    );
}

export default OrderSection;