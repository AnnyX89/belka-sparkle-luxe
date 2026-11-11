import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { trackContactClicks } from "./lib/metrika";
import { rememberSource } from "./lib/leadSource";

trackContactClicks();
rememberSource();

createRoot(document.getElementById("root")!).render(<App />);
