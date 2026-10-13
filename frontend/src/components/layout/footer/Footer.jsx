import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <a className={styles.whatsapp} href="https://wa.me/5579999999999" target="_blank" rel="noreferrer">
                    <i className="bi bi-whatsapp" aria-hidden="true"></i>
                    <span>
                        <strong>Fale conosco no WhatsApp</strong>
                        <span>(79) 99999-9999</span>
                    </span>
                </a>

                <div className={styles.cities}>
                    <strong>Cidades atendidas</strong>
                    <p>Aracaju, N. Sra. do Socorro, Laranjeiras,<br />
                        Maruim, Rosário, Carmópolis, Japaratuba,<br />
                        Pirambu e muitas outras.</p>
                </div>

                <div className={styles.social}>
                    <strong>Siga-nos</strong>
                    <div className={styles.socialLinks}>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                            <i className="bi bi-instagram" aria-hidden="true"></i>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                            <i className="bi bi-facebook" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
