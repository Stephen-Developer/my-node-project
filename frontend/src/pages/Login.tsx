import { AuthForm } from "../components/AuthForm";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async (username: string, password: string) => {
        const result = await login(username, password);
        console.log(result);
        console.log(result.ok);

        if(!result.ok) {
            alert("Login failed: " + result.message);
            return;
        }

        console.log("Login successful:", result);
        localStorage.setItem("loggedIn", "true");
        navigate('/UserDashboard');
    };

    return <AuthForm title=" Login " onSubmit={handleLogin} />;
}