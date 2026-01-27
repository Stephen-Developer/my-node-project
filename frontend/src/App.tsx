import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
//import Header from './components/Header';
import Layout from './Layout';
import UserDashboard from './pages/UserDashboard';

export default function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Route>
                    <Route path="/UserDashboard" element={<UserDashboard/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}
