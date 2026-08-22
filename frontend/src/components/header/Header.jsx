// css
import './Header.css'
import Logo from './Logo'

function Header() {
    return (
        <header className="header d-flex align-items-center justify-content-between">
            <Logo img="/logo.png" siteName="FreteApp" />
        </header>
    )
}

export default Header