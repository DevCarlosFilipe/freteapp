import styles from "./NavPillsButton.module.css";

function NavPillsButton({ id, dataBsTarget, text, icon, active = false }) {
    const iconName = typeof icon === "string" ? icon.trim() : "";

    return (
        <li className="nav-item" role="presentation">
            <button
                className={`${styles.NavPillsButton} ${active ? "active" : ""}`}
                id={id}
                data-bs-toggle="tab" 
                data-bs-target={dataBsTarget} 
                type="button" 
                role="tab" 
                aria-controls={dataBsTarget.replace(/^#/, "")} 
                aria-selected={active}>

                {iconName && (
                    <i className={`bi bi-${iconName} ${styles.NavPillsButtonIcon}`} aria-hidden="true" />
                )}
                {text}

            </button>
        </li>
    );
}

export default NavPillsButton;