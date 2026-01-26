export type User = {
    username: string,
    password: string
};

export async function fetchUsers(): Promise<User[]> {
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    
    const data = await response.json();
    return data.users;
}

export async function deleteAllUsers(): Promise<void> {
    const response = await fetch("http://localhost:3000/users/reset");

    if (!response.ok) {
        throw new Error("Failed to delete all users");
    }
    return;
}