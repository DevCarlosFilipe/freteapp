import { Link } from 'react-router-dom'
import '../styles/NotFound.css'

function NotFound() {
    return (
        <main className="not-found" aria-labelledby="not-found-title">
            <div className="not-found__content">
                <p className="not-found__eyebrow">Erro 404</p>
                <h1 id="not-found-title">Página não encontrada</h1>
                <p className="not-found__message">
                    O endereço que você acessou não existe ou foi movido.
                </p>
                <Link className="app-action-button not-found__link" to="/">
                    Voltar para a página inicial <span aria-hidden="true">&#8594;</span>
                </Link>
            </div>
            <div className="not-found__number" aria-hidden="true">
                404
            </div>
        </main>
    )
}

export default NotFound
