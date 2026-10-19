import Logo from "../header/Logo";
import Skeleton from "../../ui/Skeleton";
import useDashboardLogout from "./useDashboardLogout";
import styles from "./css/Dashboard.module.css";

function TopMobileMenu({ visible }) {
    const { logout, logoutLoading, logoutError } = useDashboardLogout();

    return (
        <header className={`${styles.topMobileMenu} ${visible ? "" : styles.mobileMenuHidden}`}>
            <Logo img="/white-logo.png" siteName="FreteApp" />
            <div className={styles.mobileLogoutArea}>
                <button
                    type="button"
                    className={styles.mobileLogoutButton}
                    onClick={logout}
                    disabled={logoutLoading}
                >
                    <i className="bi bi-box-arrow-right" aria-hidden="true" />
                    {logoutLoading
                        ? <Skeleton width="3.5rem" height="0.875rem" tone="dark" />
                        : <span>Sair</span>}
                </button>
                {logoutError && <span className={styles.mobileMenuError} role="alert">Falha ao sair</span>}
            </div>
        </header>
    );
}

export default TopMobileMenu;
