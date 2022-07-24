import "./app.css";
import App from "./App.svelte";

import { useRegisterSW } from "virtual:pwa-register/svelte";

const intervalMS = 30000;
const updateServiceWorker = useRegisterSW({
    onRegistered(r) {
        r &&
            setInterval(() => {
                r.update();
            }, intervalMS);
    },
});

const app = new App({
    target: document.getElementById("app"),
});

export default app;
