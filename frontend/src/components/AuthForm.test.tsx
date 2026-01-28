import { render, screen } from "@testing-library/react";
import { AuthForm } from "./AuthForm";
import { describe, test, expect, vi } from "vitest";
import userEvent from '@testing-library/user-event';

describe("AuthForm", () => {

    test("renders the title and input fields", () => {
        render(<AuthForm title="Login" onSubmit={vi.fn()} />); 
        
        const heading = screen.getByRole("heading", { level: 2 }); 
        const usernameInput = screen.getByPlaceholderText("Username"); 
        const passwordInput = screen.getByPlaceholderText("Password"); 
        const button = screen.getByRole("button", { name: "Login" }); 
        
        expect(heading).toHaveTextContent("Login"); 
        expect(usernameInput).toBeInTheDocument(); 
        expect(usernameInput).toHaveAttribute("type", "text"); 
        expect(passwordInput).toBeInTheDocument(); 
        expect(passwordInput).toHaveAttribute("type", "password"); 
        expect(button).toHaveTextContent("Login"); 
        expect(button).toHaveAttribute("type", "submit");
    });

    test("input variables when typed into", async() => {
         const user = userEvent.setup();

         render(<AuthForm title="Login" onSubmit={vi.fn()} />);

         const usernameInput = screen.getByPlaceholderText("Username");
         const passwordInput = screen.getByPlaceholderText("Password");

         await user.type(usernameInput, "Alice");
         await user.type(passwordInput, "password");

         expect(usernameInput).toHaveValue("Alice");
         expect(passwordInput).toHaveValue("password");
    })

    test("onSubmit called with correct inputs", async() => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();

        render(<AuthForm title="Login" onSubmit={handleSubmit} />);

        const usernameInput = screen.getByPlaceholderText("Username");
        const passwordInput = screen.getByPlaceholderText("Password");
        const button = screen.getByRole("button", {name: "Login"})

        await user.type(usernameInput, "Alice");
        await user.type(passwordInput, "password");
        await user.click(button);

        expect(handleSubmit).toHaveBeenCalledWith("Alice", "password");
        expect(handleSubmit).toHaveBeenCalledOnce();
    })
});