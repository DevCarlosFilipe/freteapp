import styles from '../css/ColItem.module.css'

function ColItem(props) {
    function getIconClass(icon) {
        if (icon) {
            return `bi bi-${icon} ${styles.icon}`
        }

        return `bi bi-shield-fill-check ${styles.icon}`
    }
    return (
        <div className={`${styles.item} ${props.className || ''}`}>
            <i className={getIconClass(props.icon)} aria-hidden="true"></i>
            <div className={styles.text}>
                <h3>{props.title || 'Segurança'}</h3>
                <p>{props.description || props.children || 'Sua encomenda é nossa prioridade'}</p>
            </div>
        </div>
    )
}

export default ColItem