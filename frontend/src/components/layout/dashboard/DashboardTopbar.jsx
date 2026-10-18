import { NavLink } from "react-router-dom";
import Skeleton from "../../ui/Skeleton";
import useAPI from "../../../hooks/useAPI";
import useDashboardLogout from "./useDashboardLogout";
import styles from "../css/Dashboard.module.css";

function DashboardTopbar() {
    const { data, loading, error } = useAPI({
        action: "auth.checkAuth",
        method: "post"
    });
    const { logout, logoutLoading, logoutError } = useDashboardLogout();
    const user = data?.data?.user;
    const userName = user?.firstName?.trim() || user?.name?.trim() || "Minha conta";

    return (
        <header className={styles.dashboardTopbar}>
            <NavLink
                to="/dashboard/orders"
                className={styles.topbarNotifications}
                aria-label="Ver minhas entregas"
                title="Minhas entregas"
            >
                <i className="bi bi-bell" aria-hidden="true" />
                <span className={styles.topbarNotificationDot} aria-hidden="true" />
            </NavLink>

            <details className={styles.topbarAccount}>
                <summary className={styles.topbarAccountButton} aria-label={`Menu da conta de ${userName}`}>
                    <span className={styles.topbarAvatar} aria-hidden="true">
                        <i className="bi bi-person" />
                    </span>
                    <span className={styles.topbarAccountText}>
                        <span className={styles.topbarAccountName}>
                            {loading
                                ? <Skeleton width="6rem" height="0.8rem" />
                                : error
                                    ? <span role="alert">Conta indisponível</span>
                                    : userName}
                        </span>
                        <span className={styles.topbarAccountRole}>Cliente</span>
                    </span>
                    <i className={`bi bi-chevron-down ${styles.topbarChevron}`} aria-hidden="true" />
                </summary>

                <div className={styles.topbarDropdown}>
                    <NavLink to="/dashboard/profile" className={styles.topbarDropdownLink}>
                        <i className="bi bi-person" aria-hidden="true" />
                        Meu perfil
                    </NavLink>
                    <button
                        type="button"
                        className={styles.topbarDropdownButton}
                        onClick={logout}
                        disabled={logoutLoading}
                    >
                        <i className="bi bi-box-arrow-right" aria-hidden="true" />
                        {logoutLoading ? "Saindo..." : "Sair"}
                    </button>
                    {logoutError && (
                        <p className={styles.topbarLogoutError} role="alert">
                            Não foi possível sair. Tente novamente.
                        </p>
                    )}
                </div>
            </details>
        </header>
    );
}

export default DashboardTopbar;
