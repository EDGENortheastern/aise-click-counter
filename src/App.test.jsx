import "@testing-library/jest-dom/vitest"
import { screen, render, cleanup } from "@testing-library/react";
import { expect, test, it, afterEach, describe } from 'vitest';
import App from "./App"
import userEvent from "@testing-library/user-event";

test('vitest is working', () => {
    expect(2 + 2).toBe(4);
});

describe("rtl tests", () => {
    afterEach(() => cleanup())
    it("renders h1", () => {
        render(<App />)
        expect(
            screen.getByRole("heading", { name: /click counter/i })
        ).toBeInTheDocument();
    });
    it("renders button", () => {
        render(<App />)
        expect(
            screen.getByRole("button", { name: /click me/i })
        ).toBeInTheDocument();
    });
    test("the count increases when the button is clicked", async () => {
        const user = userEvent.setup()
        render(<App />);
        await user.click(screen.getByRole("button", { name: /click me/i }));
        expect(screen.getByText("Count: 1"))
    });
});
