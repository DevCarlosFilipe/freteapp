// css
import './Header.css'
import Logo from './Logo'
import Menu from './Menu'
import UserSpace from './UserSpace'

function Header() {
    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid header-content">
                    <Logo img="/white-logo.png" siteName="FreteApp" />
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#main-navigation"
                        aria-controls="main-navigation"
                        aria-expanded="false"
                        aria-label="Abrir menu de navegação"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="main-navigation">
                        <Menu />
                        <UserSpace />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header