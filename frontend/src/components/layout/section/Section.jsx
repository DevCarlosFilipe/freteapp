import { Children } from 'react'
import styles from '../css/Section.module.css'


function Section(props) {
    function getBackgroundClass(background) {
        switch (background) {
            case 'black':
                return styles.black
            case 'gray':
                return styles.gray
            default:
                return styles.white
        }
    }
    
    const backgroundClass = getBackgroundClass(props.background)
    const contentItems = Children.toArray(props.children)
    const content = props.arrow
        ? contentItems.flatMap((item, index) => index < contentItems.length - 1
            ? [item, <i key={`arrow-${index}`} className={`bi bi-arrow-right ${styles.arrow}`} aria-hidden="true"></i>]
            : [item])
        : contentItems

    return (
        <section className={`${styles.section} ${backgroundClass}`}>
            {props.title && <h3>{props.title}</h3>}
            <div className={styles.content}>
                {content}
            </div>
        </section>
    )
}

export default Section;