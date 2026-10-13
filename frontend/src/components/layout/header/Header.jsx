import { useEffect, useRef, useState } from 'react'
import './css/Header.css'
import Logo from './Logo'
import Menu from './Menu'
import UserSpace from './UserSpace'

function Header() {
    const [isHidden, setIsHidden] = useState(false)
    const previousScrollY = useRef(0)

    useEffect(() => {
        function handleScroll() {
            const currentScrollY = window.scrollY

            if (currentScrollY <= 0) {
                setIsHidden(false)
            } else {
                setIsHidden(currentScrollY > previousScrollY.current)
            }

            previousScrollY.current = currentScrollY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`header ${isHidden ? 'header--hidden' : ''}`}>
            <nav className="navbar-expand-lg navbar navbar-dark">
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