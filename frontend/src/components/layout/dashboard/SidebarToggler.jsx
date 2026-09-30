import styles from "../css/Dashboard.module.css";

function SidebarToggler({ isOpen, toggleSidebar }) {
    return (
        <button
            className={styles.btnToggler}
            onClick={toggleSidebar}
            aria-label={isOpen ? "Recolher menu lateral" : "Expandir menu lateral"}
            aria-expanded={isOpen}
            title={isOpen ? "Recolher menu lateral" : "Expandir menu lateral"}
        >
            <i className="bi bi-list"></i>
        </button>
    );
}

export default SidebarToggler;