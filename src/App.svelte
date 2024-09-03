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
    <div class="alert alert-warning shadow-lg">
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
            </svg>
            <span>
                Chers utilisateurs, nous vous informons que notre application a
                cessé de fonctionner en raison de l’abandon de l’utilisation du
                logiciel VT, qui était essentiel à son bon fonctionnement.
                Malheureusement, nous ne serons plus en mesure de fournir des
                mises à jour ou un support pour cette application. Nous vous
                remercions de votre compréhension.
            </span>
        </div>
    </div>

    {#if $loggedIn}
        <Main />
    {:else}
        <Login />
    {/if}
</main>
