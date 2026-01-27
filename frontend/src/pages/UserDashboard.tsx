import { fetchUsers, type User } from '../api/users';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { deleteAllUsers } from '../api/users';

export default function UserDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();

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
            finally {

            }
        };

        loadUsers();
    }, []);

    const handleLogout = () => { 
        localStorage.removeItem("loggedIn");
        navigate('/'); 
    };

    const handleResetAllUsers = () => {
        const deleteConfirmed = confirm("Are you sure you want to reset all users?\nThis action cannot be undone.");

        if(!deleteConfirmed) {
            return;
        }

        deleteAllUsers();
        alert("All users have been deleted.");
        navigate('/');
    }

    return (
        <div>
            <h2>User Dashboard</h2>
            <p>Welcome to the dashboard!</p>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleResetAllUsers}>Delete All Users</button>
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