import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Header from "./Header.tsx";

describe("Header", () => {

    test("renders the header", () => {
        render(<Header />);

        const heading = screen.getByRole("heading", { level: 1 });

        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent("API Testing");
    });
});

