import { useState } from "react";
import Logo from "../header/Logo";
import Skeleton from "../../ui/Skeleton";
import styles from "../css/Dashboard.module.css";
import SidebarItem from "./SidebarItem";
import SidebarToggler from "./SidebarToggler";
import useDashboardLogout from "./useDashboardLogout";

function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { logout, logoutLoading, logoutError } = useDashboardLogout();

    const toggleSidebar = () => {
        setIsSidebarOpen((isOpen) => !isOpen);
    };

    return (
        <div className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ""}`}>
            <div className={`${styles.sidebarHeader} ${!isSidebarOpen ? styles.sidebarHeaderCollapsed : ""}`}>
                <SidebarToggler isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                {isSidebarOpen && <Logo img="/white-logo.png" siteName="FreteApp" />}
            </div>
            <ul className="nav nav-pills flex-column mb-auto">
                <SidebarItem link="/dashboard" text="Início" icon="house-door" collapsed={!isSidebarOpen} />
                <SidebarItem link="/dashboard/orders" text="Minhas entregas" icon="calendar2-week" collapsed={!isSidebarOpen} />
                <SidebarItem link="/dashboard/new-order" text="Nova Entrega" icon="plus-lg" collapsed={!isSidebarOpen} />
                <SidebarItem link="/dashboard/addresses" text="Endereços" icon="geo-alt" collapsed={!isSidebarOpen} />
                <SidebarItem link="/dashboard/profile" text="Perfil" icon="person" collapsed={!isSidebarOpen} />
                <SidebarItem
                    text={logoutLoading
                        ? <Skeleton width="3.5rem" height="0.875rem" tone="dark" />
                        : "Sair"}
                    icon="box-arrow-right"
                    onClick={logout}
                    disabled={logoutLoading}
                    collapsed={!isSidebarOpen}
                    ariaLabel={logoutLoading ? "Saindo..." : "Sair"}
                />
            </ul>
            {logoutError && isSidebarOpen && (
                <p className="text-danger small mt-2" role="alert">
                    Não foi possível sair agora. Tente novamente.
                </p>
            )}
        </div>
    );
}

export default Sidebar;