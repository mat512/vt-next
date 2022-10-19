<script lang="ts">
    function toggleTheme(): void {
        if (document.body.getAttribute("data-theme") === "dark") {
            document.body.setAttribute("data-theme", "light");

            localStorage.setItem("theme", "light");
        } else {
            document.body.setAttribute("data-theme", "dark");

            localStorage.setItem("theme", "dark");
        }
    }
</script>

<button on:click={toggleTheme} aria-label="Changer de thème" class="btn">
    <img src="/assets/sun.svg" alt="Thème" height="13" width="13" />
</button>
