import { Link } from "react-router-dom";
import styles from "./Orders.module.css";
import BoxIcon from "../ui/BoxIcon";

function OrdersEmptyState() {
    return (
        <section className={styles.emptyState} aria-labelledby="orders-empty-title">
            <BoxIcon icon="box-seam" className={styles.emptyStateIcon} />
            <h2 className={styles.emptyStateTitle} id="orders-empty-title">
                Sua primeira entrega começa aqui
            </h2>
            <p className={styles.emptyStateDescription}>
                Você ainda não fez nenhum pedido. Crie sua primeira entrega e acompanhe tudo por aqui.
            </p>
            <Link to="/dashboard/new-order" className={`app-action-button ${styles.emptyStateAction}`}>
                <i className="bi bi-plus-lg" aria-hidden="true" />
                Fazer meu primeiro pedido
            </Link>
        </section>
    );
}

export default OrdersEmptyState;