import { Link } from 'react-router-dom'

function MenuItem({ label, link }) {
    return (
        <li className="menu-item">
            <Link className="nav-link px-2" to={link}>{label}</Link>
        </li>
    )
}

export default MenuItem