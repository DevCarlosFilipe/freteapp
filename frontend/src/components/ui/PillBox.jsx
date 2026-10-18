import styles from "./PillBox.module.css";

function PillBox({ text, icon, status = "positive"}) {
    
    return (
        <span className={`${styles.pillBox} ${styles[status]}`}>
            {icon && <i className={`bi bi-${icon}`}></i>}
            {text}
        </span>
    );
}

export default PillBox;