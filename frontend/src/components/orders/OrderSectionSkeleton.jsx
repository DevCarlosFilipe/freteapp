import styles from "./Orders.module.css";
import Skeleton from "../ui/Skeleton";

function OrderSectionSkeleton() {
    return (
        <section className={`card border-0 shadow-sm p-3 mb-4 ${styles.ordersSkeletonSection}`} aria-hidden="true">
            <div className={styles.ordersSkeletonHeading}>
                <Skeleton width="45px" height="45px" circle />
                <div className={styles.ordersSkeletonTitle}>
                    <Skeleton width="min(12rem, 60%)" height="1.25rem" className="d-block mb-2" />
                    <Skeleton width="min(20rem, 85%)" height="0.875rem" />
                </div>
                <Skeleton width="5.5rem" height="1.75rem" className={styles.ordersSkeletonCount} />
            </div>
            <div className={styles.ordersSkeletonTable}>
                <div className={styles.ordersSkeletonRow}>
                    {[0, 1, 2, 3, 4, 5, 6].map((column) => (
                        <Skeleton key={column} width="68%" height="0.875rem" />
                    ))}
                </div>
                {[0, 1, 2].map((row) => (
                    <div className={styles.ordersSkeletonRow} key={row}>
                        {[0, 1, 2, 3, 4, 5, 6].map((column) => (
                            <Skeleton
                                key={column}
                                width={column === 2 ? "84%" : column === 6 ? "60%" : "72%"}
                                height="1rem"
                            />
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default OrderSectionSkeleton;