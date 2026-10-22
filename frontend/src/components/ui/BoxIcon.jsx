import styles from "./BoxIcon.module.css";

function BoxIcon({ icon, className = "", style }) {
    return (
        <div className={`${styles.boxIcon} ${className}`} style={style} aria-hidden="true">
            <i className={`bi bi-${icon}`} />
        </div>
    );
}

export default BoxIcon;
