import "@testing-library/jest-dom/vitest"
import { screen, render, cleanup } from "@testing-library/react";
import { expect, test, it, afterEach, describe } from 'vitest'
import App from "./App"

test('vitest is working', () => {
    expect(2+2).toBe(4);
});

describe("rtl tests", () => {
    afterEach(() => cleanup())
    it("renders h1", () => {
        render(<App />)
        expect(
            screen.getByRole("heading",{ name: /click counter/i})
        ).toBeInTheDocument();
    });
        it("renders button", () => {
        render(<App />)
        expect(
            screen.getByRole("button",{ name: /click me/i})
        ).toBeInTheDocument();
    });
});
