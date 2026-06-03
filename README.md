# Click Counter — TDD Example

A simple React click counter built step-by-step using **Test-Driven Development (TDD)** with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

TDD follows a tight loop:

1. **Red** — write a failing test that describes the behaviour you want
2. **Green** — write the minimum code to make the test pass
3. **Refactor** — clean up if needed, keeping tests green

---

## Step 0 — Smoke test (sanity check)

Before writing any component tests, verify the test runner itself works. This catches misconfigured tooling before it wastes your time.

```js
// App.test.jsx
import { expect, test } from 'vitest'

test('vitest is working', () => {
    expect(2 + 2).toBe(4);
});
```

Run `npm test` — if this passes, your setup is good. Now you can trust future failures are real failures.

---

## Step 1 — Renders a heading

### Red

```jsx
// App.test.jsx
import "@testing-library/jest-dom/vitest"
import { screen, render, cleanup } from "@testing-library/react";
import { expect, test, it, afterEach, describe } from 'vitest';
import App from "./App"

describe("rtl tests", () => {
    afterEach(() => cleanup())

    it("renders h1", () => {
        render(<App />)
        expect(
            screen.getByRole("heading", { name: /click counter/i })
        ).toBeInTheDocument();
    });
});
```

### Green

```jsx
// App.jsx
const App = () => {
  return (
    <main className="app">
      <h1>Click Counter</h1>
    </main>
  )
}

export default App;
```

---

## Step 2 — Renders a button

### Red 2

```jsx
it("renders button", () => {
    render(<App />)
    expect(
        screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
});
```

### Green 2

```jsx
const App = () => {
  return (
    <main className="app">
      <h1>Click Counter</h1>
      <button>
        Click Me
      </button>
    </main>
  )
}
```

---

## Step 3 — Count increases on click

### Red 3

```jsx
import userEvent from "@testing-library/user-event";

test("the count increases when the button is clicked", async () => {
    const user = userEvent.setup()
    render(<App />);
    await user.click(screen.getByRole("button", { name: /click me/i }));
    expect(screen.getByText("Count: 1"))
});
```

### Green 3

```jsx
import { useState } from "react"

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <main className="app">
      <h1>Click Counter</h1>
      <button
        onClick={() => setCount(count + 1)}
      >
        Click Me
      </button>
      <p>Count: {count}</p>
    </main>
  )
}
```

---

## Step 4 — Count element has a CSS class

### Red 4

```jsx
test("the count has a count class", () => {
    render(<App />);
    expect(screen.getByText("Count: 0")).toHaveClass("count");
});
```

### Green 4

```jsx
<p className="count">Count: {count}</p>
```

---

## Final test file

```jsx
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

    test("the count has a count class", () => {
        render(<App />);
        expect(screen.getByText("Count: 0")).toHaveClass("count");
    });
});
```

## Running the tests

```bash
npm test
```
