import styles from '../css/Testimonial.module.css'

function Testimonial(props) {
    const rating = Math.min(Math.max(props.rating || 5, 0), 5)

    return (
        <article className={styles.card}>
            <div className={styles.rating} aria-label={`${rating} de 5 estrelas`}>
                {Array.from({ length: 5 }, (_, index) => (
                    <i
                        key={index}
                        className={`bi ${index < rating ? 'bi-star-fill' : 'bi-star'} ${styles.star}`}
                        aria-hidden="true"
                    ></i>
                ))}
            </div>
            <p className={styles.quote}>"{props.quote || 'Excelente serviço! Entregaram no prazo e minha encomenda chegou perfeita.'}"</p>
            <strong className={styles.name}>{props.name || 'Carlos Almeida'}</strong>
            <span className={styles.location}>{props.location || 'Aracaju - SE'}</span>
        </article>
    )
}

export default Testimonial