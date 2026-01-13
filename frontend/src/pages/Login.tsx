import { AuthForm } from "../components/AuthForm";
import { login } from "../api/auth";

export default function Login() {
    const handleLogin = async (username: string, password: string) => {
        const result = await login(username, password);

        //Do things here, e.g., store auth token, redirect, etc.

        console.log(result);
    };

    return <AuthForm title="Login" onSubmit={handleLogin} />;
}