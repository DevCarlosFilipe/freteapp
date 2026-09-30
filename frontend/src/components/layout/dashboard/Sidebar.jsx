import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../header/Logo";
import useAPI from "../../../hooks/useAPI";
import styles from "../css/Dashboard.module.css";
import SidebarItem from "./SidebarItem";
import SidebarToggler from "./SidebarToggler";

function Sidebar() {
    const navigate = useNavigate();
    const [logoutVersion, setLogoutVersion] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen((isOpen) => !isOpen);
    };

    const handleLogoutSuccess = useCallback((response) => {
        if (response?.success) {
            navigate("/");
        }
    }, [navigate]);

    const { loading: logoutLoading, error: logoutError } = useAPI({
        action: "auth.logout",
        method: "post",
        requestVersion: logoutVersion,
        enabled: logoutVersion > 0,
        onSuccess: handleLogoutSuccess
    });

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
                    text={logoutLoading ? "Saindo..." : "Sair"}
                    icon="box-arrow-right"
                    onClick={() => setLogoutVersion((version) => version + 1)}
                    disabled={logoutLoading}
                    collapsed={!isSidebarOpen}
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