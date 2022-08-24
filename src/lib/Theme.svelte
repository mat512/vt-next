<script lang="ts">
    function toggleDarkMode(): void {
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

    const isDarkMode = localStorage.getItem("darkMode");
    if (isDarkMode === "true") toggleDarkMode();
</script>

<button on:click={toggleDarkMode} aria-label="Changer de thème">
    <img src="/assets/sun.svg" alt="Thème" height="13" width="13" />
</button>
