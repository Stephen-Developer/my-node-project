import { fetchUsers, type User } from '../api/users';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { deleteAllUsers, updatePassword } from '../api/users';

export default function UserDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const loadUsers = async () => {
            const loggedIn = localStorage.getItem("loggedIn"); 
            if (loggedIn !== "true") { 
                navigate('/');
                return;
            }

            try {
                const fetchedUsers = await fetchUsers();
                console.log("Fetched users:", fetchedUsers);
                setUsers(fetchedUsers);
            }
            catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        loadUsers();
    }, []);

    const handleLogout = () => { 
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("currentUserName");
        navigate('/'); 
    };

    const handleResetAllUsers = () => {
        const deleteConfirmed = confirm("Are you sure you want to reset all users?\nThis action cannot be undone.");

        if(!deleteConfirmed) {
            return;
        }

        deleteAllUsers();
        alert("All users have been deleted.");
        localStorage.removeItem("loggedIn");
        navigate('/');
    }

    const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        const currentUserName = localStorage.getItem("currentUserName") || "";

        try {
            const result = await updatePassword(currentUserName, oldPassword, newPassword);

            if (!result.ok) {
                alert("Password update failed: " + result.message);
                return;
            }

            alert("Password updated successfully!");
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
        catch (error: any) {
            alert("Password update failed with an error: " + error.message);
        }
    }

    return (
        <div>
            <h2>User Dashboard</h2>
            <p>Welcome to the dashboard!</p>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleResetAllUsers}>Delete All Users</button>
            <form onSubmit={handleUpdatePassword}>
                <h2>Update Password</h2>
            
                <input
                    type="password"
                    placeholder="old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                />
            
                <input
                    type="password"
                    placeholder="new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            
            <button type="submit">Update Password</button>
        </form>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.username}>
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
}