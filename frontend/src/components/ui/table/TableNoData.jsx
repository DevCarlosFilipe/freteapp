import styles from "./Table.module.css";
import BoxIcon from "../BoxIcon";

function TableNoData() {
    return (
        <section className={styles.emptyState} role="status" aria-live="polite">
            <BoxIcon icon="inbox" className={styles.icon} />
            <h2 className={styles.title}>Nenhum dado encontrado</h2>
            <p className={styles.description}>
                Quando houver informações, elas aparecerão aqui.
            </p>
        </section>
    );
}

export default TableNoData;
