import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="header">
            <h1>API Testing</h1>
            <nav>
                <Link to="/">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    )
}