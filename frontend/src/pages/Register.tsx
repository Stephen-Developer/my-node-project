import { AuthForm } from '../components/AuthForm';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();

    const handleRegister = async (username: string, password: string) => {
        try {
            const result = await register(username, password);

            if (!result.ok) {
                alert("Registration failed: " + result.message);
                return;
            }

            alert("Registration successful!\nPlease proceed to login.");
            navigate('/');
        }
        catch (error: any) {
            alert("Registration failed: " + error.message);
        }

    };

    return <AuthForm title=" Register " onSubmit={handleRegister} />;
}