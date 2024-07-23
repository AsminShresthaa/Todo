import React from "react"
import { createRoot } from "react-dom/client"
import AppRouter from "./Router";
const App = () => {
    return(
        <React.StrictMode>
            <AppRouter/>
        </React.StrictMode>
    )
}
const root = createRoot(document.getElementById("app"));
root.render(<App/>);
