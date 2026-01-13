import { AuthForm } from '../components/AuthForm';
import { register } from '../api/auth';

export default function Register() {
    const handleRegister = async (username: string, password: string) => {
        const result = await register(username, password);

        // Do things here, e.g., show success message, redirect, etc.

        console.log(result);
    };

    return <AuthForm title="Register" onSubmit={handleRegister} />;
}