import { NavLink } from "react-router-dom";
import styles from "../css/Dashboard.module.css";

const navigationItems = [
    { to: "/dashboard", text: "Início", icon: "house-door" },
    { to: "/dashboard/orders", text: "Entregas", icon: "calendar2-week" },
    { to: "/dashboard/new-order", text: "Nova entrega", icon: "plus-lg", featured: true },
    { to: "/dashboard/addresses", text: "Endereços", icon: "geo-alt" },
    { to: "/dashboard/profile", text: "Perfil", icon: "person" }
];

function BottomMobileMenu({ visible }) {
    return (
        <nav
            className={`${styles.bottomMobileMenu} ${visible ? "" : styles.mobileMenuHidden}`}
            aria-label="Navegação do painel"
        >
            {navigationItems.map(({ to, text, icon, featured = false }) => (
                <NavLink
                    key={to}
                    to={to}
                    end={to === "/dashboard"}
                    className={({ isActive }) => `${styles.bottomMobileMenuItem} ${featured ? styles.bottomMobileMenuItemFeatured : ""} ${isActive ? styles.bottomMobileMenuItemActive : ""}`}
                    aria-label={featured ? text : undefined}
                    title={featured ? text : undefined}
                >
                    <i className={`bi bi-${icon}`} aria-hidden="true" />
                    {!featured && <span>{text}</span>}
                </NavLink>
            ))}
        </nav>
    );
}

export default BottomMobileMenu;
