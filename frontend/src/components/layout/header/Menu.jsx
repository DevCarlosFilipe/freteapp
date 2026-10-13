import MenuItem from './MenuItem'

function Menu () {
    return (
        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <MenuItem label="Início" link="/" />
            <MenuItem label="Como Funciona" link="/how-work" />
            <MenuItem label="Cidades Atendidas" link="/cities-served" />
            <MenuItem label="Sobre Nós" link="/about-us" />
            <MenuItem label="Contato" link="/contact" />
        </ul>
    )
}

export default Menu
