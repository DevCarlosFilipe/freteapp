import styles from "./Orders.module.css";
import Table from "../ui/Table";
import PillBox from "../ui/PillBox";

function OrderSection({ title, icon, label, columns = [], data = [] }) {
    function countOrders (data) {
        var order = data.length === 1 ? " Pedido" : " Pedidos";
        return data.length + order;
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
                <PillBox text={countOrders(data)} status="theme" className="ms-auto" />
            </div>

            <Table columns={columns} data={data} />

        </div>
    );
}

export default OrderSection;