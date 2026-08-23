import MenuItem from './MenuItem'

function Menu () {
    return (
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <MenuItem label="Home" link="/" />
            <MenuItem label="About" link="/about" />
            <MenuItem label="Contact" link="/contact" />
        </ul>
    )
}

export default Menu
