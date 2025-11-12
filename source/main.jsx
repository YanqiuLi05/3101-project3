import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./style.css"

window.addEventListener("load", () => {
  const root = createRoot(document.getElementById("root"))
  root.render(<App />)
})
