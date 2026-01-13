export async function login(username: string, password: string) {
    const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
}

export async function register(username: string, password: string) {
    const response = await fetch("http://localhost:3000/users/createNewUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return response.json();
}