import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SidebarMobile from "./SidebarMobile";
import DashboardTopbar from "./DashboardTopbar";
import styles from "../css/Dashboard.module.css";

function ClientLayout({ children }) {
    return (
        <div className={styles.clientLayout}>
            <Sidebar />
            <SidebarMobile />
            <div className={styles.dashboardMain}>
                <DashboardTopbar />
                {children || <Outlet />}
            </div>
        </div>
    );
}

export default ClientLayout;