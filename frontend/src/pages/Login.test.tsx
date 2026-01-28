vi.mock("../components/AuthForm", () => ({
    AuthForm: ({ title, onSubmit }: any) => (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit("testUser", "testPassword");
            }}
        >
            <h2>{title}</h2>
            <button type="submit">Submit</button>
        </form>
    )
}));

vi.mock("../api/auth", () => ({
    login: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<any>("react-router-dom");
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

import { describe, test, expect, vi, type Mock } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

describe("Login", () => {

    beforeEach(() => { 
        vi.clearAllMocks(); 

        vi.spyOn(window, "alert").mockImplementation(() => {});
    });

    test("successful login and navigates to correct page", async () => {
        const mockNavigate = vi.fn();
        (useNavigate as Mock).mockReturnValue(mockNavigate);

        (login as Mock).mockResolvedValue({ ok: true });

        render(<Login />);

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(login).toHaveBeenCalledWith("testUser", "testPassword");
            expect(localStorage.getItem("loggedIn")).toBe("true");
            expect(mockNavigate).toHaveBeenCalledWith("/UserDashboard");
        });
    });

    test("unsuccessful login displays alert", async() => {
        const mockNavigate = vi.fn();
        (useNavigate as Mock).mockReturnValue(mockNavigate);

        (login as Mock).mockResolvedValue({ ok: false, message: "test"});

        render(<Login />);

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(localStorage.getItem("loggedIn")).toBeNull;
            expect(mockNavigate).not.toHaveBeenCalled();
            expect(window.alert).toHaveBeenCalledWith("Login Failed: test");
        })
    });

    test("renders AuthForm with correct title", () => {
        render(<Login />);

        expect(screen.getByRole('heading', {level: 2})).toHaveTextContent("Login");
    });

    test("handles thrown errors from login", async() => {
        const mockNavigate = vi.fn();
        (useNavigate as Mock).mockReturnValue(mockNavigate);

        (login as Mock).mockRejectedValue(new Error("Network Error"));

        render(<Login />);

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Login Failed: Network Error");
            expect(mockNavigate).not.toHaveBeenCalled();
            expect(localStorage.getItem("loggedIn")).toBeNull;
        })
    })
});
