import { AuthForm } from "../components/AuthForm";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async (username: string, password: string) => {
        try {
            const result = await login(username, password);

            if (!result.ok) {
                alert("Login Failed: " + result.message);
                return;
            }

            localStorage.setItem("loggedIn", "true");
            navigate('/UserDashboard');
        }
        catch (err: any) {
            alert("Login Failed: " + err.message);
        }
    };

    return <AuthForm title=" Login " onSubmit={handleLogin} />;
}