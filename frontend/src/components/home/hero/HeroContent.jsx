import HeroActions from './HeroActions'
import styles from '../css/Hero.module.css'

function HeroContent() {
    return (
        <div className={styles.content}>
            <p className={styles.eyebrow}>FreteApp Express</p>
            <h1 id="hero-title">Entregas <span className={styles.greenTitle}>intermunicipais</span></h1>
            <p className={styles.description}>
                Rápidas, seguras e com o melhor custo. Coletamos na sua cidade
                e entregamos na cidade de destino.
            </p>
            <HeroActions />
        </div>
    )
}

export default HeroContent