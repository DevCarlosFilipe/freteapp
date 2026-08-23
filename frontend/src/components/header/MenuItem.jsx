import { NavLink } from 'react-router-dom'

function MenuItem({ label, link }) {
    function getLinkClassName({ isActive }) {
        return `nav-link px-2${isActive ? ' active' : ''}`
    }

    return (
        <li className="menu-item">
            <NavLink className={getLinkClassName} end={link === '/'} to={link}>
                {label}
            </NavLink>
        </li>
    )
}

export default MenuItem