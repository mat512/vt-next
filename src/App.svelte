<script lang="ts">
    import { groupCode, vtCode, loggedIn } from "./stores/login";

    import Main from "./Main.svelte";
    import Login from "./Login.svelte";

    // If a code has already been saved
    if (localStorage.getItem("groupCode") !== null) {
        loggedIn.set(true);
        groupCode.set(localStorage.getItem("groupCode"));
        vtCode.set(localStorage.getItem("vtCode"));
    }

    // If the saved preference theme is dark
    if (localStorage.getItem("theme") === "dark")
        document.body.setAttribute("data-theme", "dark");
</script>

<main class="bg-base-200 text-center">
    {#if $loggedIn}
        <Main />
    {:else}
        <Login />
    {/if}
</main>
