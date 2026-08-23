// css
import './Header.css'
import Logo from './Logo'
import Menu from './Menu'
import UserSpace from './UserSpace'

function Header() {
    return (
        <header className="header">
            <div className="header-content d-flex align-items-center justify-content-between w-100">
                <Logo img="/white-logo.png" siteName="FreteApp" />
                <Menu />
                <UserSpace />
            </div>
        </header>
    )
}

export default Header