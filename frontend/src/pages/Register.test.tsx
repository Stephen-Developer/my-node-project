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
    register: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<any>("react-router-dom");
    return {
        ...actual,
        useNavigate: vi.fn(),
    }
});

import { describe, test, expect, vi, type Mock } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Register from "./Register";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

describe("Register", () => {

    beforeEach(() => {
        vi.clearAllMocks();

        vi.spyOn(window, "alert").mockImplementation(() => {});
    });

    test("successfully register a new user", async() => {
        const mockNavigate = vi.fn();
        (useNavigate as Mock).mockReturnValue(mockNavigate);

        (register as Mock).mockResolvedValue({ok: true});

        render(<Register />);

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(register).toHaveBeenCalledWith("testUser", "testPassword");
            expect(alert).toHaveBeenCalledWith("Registration successful!\nPlease proceed to login.");
            expect(mockNavigate).toHaveBeenCalledWith("/");
        })
    });

    test("unsuccessful register displays alert", async() => {
        const mockNavigate = vi.fn();
        (useNavigate as Mock).mockReturnValue(mockNavigate);

        (register as Mock).mockResolvedValue({ok: false, message: "test"});

        render(<Register />);

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(register).toHaveBeenCalledWith("testUser", "testPassword");
            expect(alert).toHaveBeenCalledWith("Registration failed: test");
            expect(mockNavigate).not.toHaveBeenCalled();
        })
    });

    test("renders AuthForm with correct title", () => {
        render(<Register />);

        expect(screen.getByRole('heading', {level: 2})).toHaveTextContent("Register");
    });

    test("handles thrown errors from register", async() => {
        const mockNavigate = vi.fn();
        (useNavigate as Mock).mockReturnValue(mockNavigate);

        (register as Mock).mockRejectedValue(new Error("Network Error"));

        render(<Register />);

        fireEvent.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Registration failed: Network Error");
            expect(mockNavigate).not.toHaveBeenCalled();
        })
    })
})