import { describe, test, expect, vi } from "vitest";
import { login, register } from "./auth.tsx"

describe("auth", () => {

    test("login successful", async() => {
        const mockResponse = {
            ok: true,
            status: 200,
            json: vi.fn().mockResolvedValue({ token: "abc123" })
        };

        const fetchMock = vi
            .spyOn(global, "fetch")
            .mockResolvedValue(mockResponse as any);

        const result = await login("alice", "password");

        expect(fetchMock).toHaveBeenCalledWith(
            "http://localhost:3000/users/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: "alice", password: "password" })
            }
        );

        expect(result).toEqual({
            ok: true,
            status: 200,
            token: "abc123"
        });
    });

    test("register successful", async() => {
        const mockResponse = {
            ok: true,
            status: 200,
            json: vi.fn().mockResolvedValue({ token: "abc123" })
        };

        const fetchMock = vi
            .spyOn(global, "fetch")
            .mockResolvedValue(mockResponse as any);

        const result = await register("alice", "password");

        expect(fetchMock).toHaveBeenCalledWith(
            "http://localhost:3000/users/createNewUser",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: "alice", password: "password"})
            }
        );

        expect(result).toEqual({
            ok: true,
            status: 200,
            token: "abc123"
        })
    });
})