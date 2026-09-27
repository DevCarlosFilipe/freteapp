import { NavLink } from "react-router-dom";
import styles from "../css/Dashboard.module.css";

function SidebarItem({ link = "/dashboard", text = "Link", icon = null, onClick, disabled = false }) {

    function getClassStatus({ isActive }) {
        const status = isActive ? " active" : "";
        const itemClass = "nav-link px-3 text-white";

        return itemClass + status;
    }

    return (
        <li className={styles.sidebarItem}>
            {onClick ? (
                <button
                    type="button"
                    className="nav-link px-3 text-white w-100 text-start"
                    onClick={onClick}
                    disabled={disabled}
                >
                    {icon && <i className={"bi bi-" + icon}></i>}
                    {text}
                </button>
            ) : (
                <NavLink to={link} end={link === "/dashboard"} className={getClassStatus}>
                    {icon && <i className={"bi bi-" + icon}></i>}
                    {text}
                </NavLink>
            )}
        </li>
    );
}

export default SidebarItem;