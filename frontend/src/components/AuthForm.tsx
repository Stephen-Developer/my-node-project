import React, { useState } from 'react';

type  AuthFormProps = {
    title: string;
    onSubmit: (username: string, password: string) => void;
};

export const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{title}</h2>
            
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            
            <button type="submit">{title}</button>
        </form>
    );
};