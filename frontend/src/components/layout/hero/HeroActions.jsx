import { Link } from 'react-router-dom'
import styles from '../css/Hero.module.css'

function HeroActions() {
    return (
        <div className={styles.actions}>
            <Link className={`${styles.action} ${styles.actionPrimary}`} to="/contact">
                <i class={`${styles.actionIcon} bi bi-box-seam`}></i>
                <span>
                    <strong>Solicitar coleta</strong>
                    <small>É rápido e fácil</small>
                </span>
            </Link>
            <Link className={`${styles.action} ${styles.actionSecondary}`} to="/how-work">
                <i class={`${styles.actionIcon} bi bi-search`}></i>
                <span>
                    <strong>Acompanhar entrega</strong>
                    <small>Veja onde está seu envio</small>
                </span>
            </Link>
        </div>
    )
}

export default HeroActions