import { useState } from "react"
import './App.css'

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

export default App;