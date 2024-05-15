import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./navStyle.css"

export default function Navbar() {
    return (
        <nav className="nav">
            <ul>
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/admin/">Admin Page</CustomLink>
                <CustomLink to="/about/">About</CustomLink>
            </ul>
        </nav>
    )
}

// @ts-ignore
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname+"/*", end:true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}