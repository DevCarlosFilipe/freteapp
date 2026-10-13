import styles from '../css/Hero.module.css'
import HeroContent from './HeroContent'

function Hero() {
    return (
        <section className={styles.hero} aria-labelledby="hero-title">
            <div className={styles.overlay}>
                <HeroContent />
            </div>
        </section>
    )
}

export default Hero