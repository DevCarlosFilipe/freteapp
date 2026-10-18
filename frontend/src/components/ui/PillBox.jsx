import styles from "./PillBox.module.css";

function PillBox({ text, icon, className, status = "positive"}) {
    
    return (
        <span className={`${styles.pillBox} ${styles[status]} ${className || ''}`}>
            {icon && <i className={`bi bi-${icon}`}></i>}
            {text}
        </span>
    );
}

export default PillBox;