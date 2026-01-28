import { describe, test, expect, vi } from "vitest";
import { fetchUsers, deleteAllUsers } from "./users.tsx";

describe("users", () => {

    test("fetch all users successfully", async() => {
        const mockResponse = {
            ok: true,
            status: 200,
            json: vi.fn().mockResolvedValue({ users: "abc123" })
        };

        const fetchMock = vi
            .spyOn(global, "fetch")
            .mockResolvedValue(mockResponse as any);

        const result = await fetchUsers();

        expect(fetchMock).toHaveBeenCalledWith(
            "http://localhost:3000/users"
        );

        expect(result).toEqual("abc123");
    });

    test("deletes all users successfully", async() => {
        const mockResponse = {
            ok: true,
            status: 200,
        };

        const fetchMock = vi
            .spyOn(global, "fetch")
            .mockResolvedValue(mockResponse as any);

        const result = await deleteAllUsers();

        expect(fetchMock).toHaveBeenCalledWith(
            "http://localhost:3000/users/reset"
        );
    })

});