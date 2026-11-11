import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { trackContactClicks } from "./lib/metrika";

trackContactClicks();

createRoot(document.getElementById("root")!).render(<App />);
