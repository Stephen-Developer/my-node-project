vi.mock("../api/users", () => ({
    fetchUsers: vi.fn(),
    deleteAllUsers: vi.fn(),
}));

vi.mock("react-router-dom", async() => {
    const actual = await vi.importActual<any>("react-router-dom");
    return {
        ...actual,
        useNavigate: vi.fn(),
    }
});

import { describe, test, expect, vi, type Mock} from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { deleteAllUsers, fetchUsers } from "../api/users";
import UserDashboard from "./UserDashboard";

describe("UserDashboard", () => {

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();

        vi.spyOn(window, "alert").mockImplementation(() => {});
        vi.spyOn(window, "confirm").mockImplementation(() => true);
    })


    test("redirects if not logged in", async() => {
        const mockNavigate = vi.fn();
        (useNavigate as Mock).mockReturnValue(mockNavigate);

        localStorage.clear();

        render(<UserDashboard />);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });

    test("displays correctly if user is logged in", async() => {
        const mockNavigate = vi.fn();
        (useNavigate as Mock).mockReturnValue(mockNavigate);

        localStorage.setItem("loggedIn", "true");

        (fetchUsers as Mock).mockReturnValue([
            { username: "alice" },
            { username: "bob" },
        ]);

        render(<UserDashboard />);

        expect(fetchUsers).toHaveBeenCalledOnce();

        await waitFor(() => {
            expect(screen.getByText("alice")).toBeInTheDocument();
            expect(screen.getByText("bob")).toBeInTheDocument();
        })
    });

    test("logout removed loggedIn and navigates home", async() => {
        const mockNavigate = vi.fn();
        (useNavigate as Mock).mockReturnValue(mockNavigate);

        localStorage.setItem("loggedIn", "true");

        render(<UserDashboard />);

        fireEvent.click(screen.getByText("Logout"));

        expect(localStorage.getItem("loggedIn")).toBe(null);
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    test("delete all users", async() => {
        const mockNavigate = vi.fn();
        (useNavigate as Mock).mockReturnValue(mockNavigate);

        localStorage.setItem("loggedIn", "true");

        render(<UserDashboard />);

        fireEvent.click(screen.getByText("Delete All Users"));

        expect(window.confirm).toHaveBeenCalled();
        expect(deleteAllUsers).toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalled();
        expect(localStorage.getItem("loggedIn")).toBe(null);
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    test("cancel deleting all users", async() => {
        const mockNavigate = vi.fn();
        (useNavigate as Mock).mockReturnValue(mockNavigate);

        localStorage.setItem("loggedIn", "true");

        vi.spyOn(window, "confirm").mockReturnValue(false);

        render(<UserDashboard />);

        fireEvent.click(screen.getByText("Delete All Users"));

        expect(window.confirm).toHaveBeenCalled();
        expect(deleteAllUsers).not.toHaveBeenCalled();
        expect(window.alert).not.toHaveBeenCalled();
        expect(localStorage.getItem("loggedIn")).toBe("true");
        expect(mockNavigate).not.toHaveBeenCalled();
    });

});