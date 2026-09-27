import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../header/Logo";
import useAPI from "../../../hooks/useAPI";
import styles from "../css/Dashboard.module.css";
import SidebarItem from "./SidebarItem";

function Sidebar() {
    const navigate = useNavigate();
    const [logoutVersion, setLogoutVersion] = useState(0);

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
        <div className={styles.sidebar}>
            <Logo img="/white-logo.png" siteName="FreteApp" />
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <SidebarItem link="/dashboard" text="Início" icon="house-door" />
                <SidebarItem link="/dashboard/orders" text="Minhas entregas" icon="calendar2-week" />
                <SidebarItem link="/dashboard/new-order" text="Nova Entrega" icon="plus-lg" />
                <SidebarItem link="/dashboard/addresses" text="Endereços" icon="geo-alt" />
                <SidebarItem link="/dashboard/profile" text="Perfil" icon="person" />
                <SidebarItem
                    text={logoutLoading ? "Saindo..." : "Sair"}
                    icon="box-arrow-right"
                    onClick={() => setLogoutVersion((version) => version + 1)}
                    disabled={logoutLoading}
                />
            </ul>
            {logoutError && (
                <p className="text-danger small mt-2" role="alert">
                    Não foi possível sair agora. Tente novamente.
                </p>
            )}
        </div>
    );
}

export default Sidebar;