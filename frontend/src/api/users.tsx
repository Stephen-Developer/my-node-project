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

export async function updatePassword(username: string, oldPassword: string, newPassword: string): Promise<{ok: boolean, message: string}> {
    const response = await fetch("http://localhost:3000/users/updateUserPassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, oldPassword, newPassword })
    });

    const data = await response.json();

    return {
        ok: response.ok,
        status: response.status,
        ...data
    }
}