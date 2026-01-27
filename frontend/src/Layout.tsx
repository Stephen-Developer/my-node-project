import { Outlet, Link } from 'react-router-dom';
import Header from './components/Header';
import type { JSX } from 'react/jsx-dev-runtime';

export default function Layout(): JSX.Element {
    return (
        <>
            <Header/>
            <nav>
                <Link to="/">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
            <Outlet/>
        </>
    );
}
