import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "../css/Dashboard.module.css";

function ClientLayout({ children }) {
    return (
        <div className={styles.clientLayout}>
            <Sidebar />
            {children || <Outlet />}
        </div>
    );
}

export default ClientLayout;