export async function login(username: string, password: string) {
    const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    return {
        ok: response.ok,
        status: response.status,
        ...data
    };
}

export async function register(username: string, password: string) {
    const response = await fetch("http://localhost:3000/users/createNewUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    return {
        ok: response.ok,
        status: response.status,
        ...data
    };
}