import { NavLink } from "react-router-dom";
import styles from "../css/Dashboard.module.css";

function SidebarItem({ link = "/dashboard", text = "Link", icon = null, onClick, disabled = false, collapsed = false }) {

    function getClassStatus({ isActive }) {
        const status = isActive ? " active" : "";
        const itemClass = collapsed ? "nav-link text-white" : "nav-link px-3 text-white";
        const collapsedClass = collapsed ? ` ${styles.sidebarItemCollapsedLink}` : "";

        return `${itemClass} ${styles.sidebarItemLink}${collapsedClass}${status}`;
    }

    return (
        <li className={`${styles.sidebarItem} ${collapsed ? styles.sidebarItemCollapsed : ""}`}>
            {onClick ? (
                <button
                    type="button"
                    className={`${collapsed ? "nav-link text-white" : "nav-link px-3 text-white text-start"} ${styles.sidebarItemLink} ${collapsed ? styles.sidebarItemCollapsedLink : ""}`}
                    onClick={onClick}
                    disabled={disabled}
                    aria-label={collapsed ? text : undefined}
                    title={collapsed ? text : undefined}
                >
                    {icon && <i className={"bi bi-" + icon} aria-hidden="true"></i>}
                    {!collapsed && text}
                </button>
            ) : (
                <NavLink
                    to={link}
                    end={link === "/dashboard"}
                    className={getClassStatus}
                    aria-label={collapsed ? text : undefined}
                    title={collapsed ? text : undefined}
                >
                    {icon && <i className={"bi bi-" + icon} aria-hidden="true"></i>}
                    {!collapsed && text}
                </NavLink>
            )}
        </li>
    );
}

export default SidebarItem;