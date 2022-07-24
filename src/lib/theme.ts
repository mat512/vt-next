export function toggleDarkMode() {
    if (document.body.style.color === "var(--background)") {
        document.body.style.color = "var(--foreground)";
        document.body.style.backgroundColor = "var(--background)";

        localStorage.setItem("darkMode", "false");
    } else {
        document.body.style.color = "var(--background)";
        document.body.style.backgroundColor = "var(--foreground)";

        localStorage.setItem("darkMode", "true");
    }
}
