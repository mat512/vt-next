<script lang="ts">
    import { groupCodeValue, isLoggedIn, vtCodeValue } from "./lib/login";
    import { nextWeek, previousWeek, today } from "./lib/date";
    import { week, year } from "./lib/stores";

    import Image from "./components/Image.svelte";
    import Theme from "./components/Theme.svelte";
    import Login from "./Login.svelte";
    import NextWeeks from "./components/NextWeek.svelte";
    import PreviousWeeks from "./components/PreviousWeek.svelte";
    import Today from "./components/Today.svelte";
    import Calendar from "./components/Calendar.svelte";

    let loggedIn = false;
    isLoggedIn.subscribe((value) => {
        loggedIn = value;
    });

    let vtCode, groupCode;
    vtCodeValue.subscribe((value) => {
        vtCode = value;
    });
    groupCodeValue.subscribe((value) => {
        groupCode = value;
    });

    // If a code as already saved
    if (localStorage.getItem("groupCode") !== null) {
        loggedIn = true;
        groupCode = localStorage.getItem("groupCode");
        vtCode = localStorage.getItem("vtCode");
    }

    let width = 1920;
    let height = 1080;

    // Adapt image size to screen orientation
    if (window.matchMedia("(orientation: portrait)").matches) {
        width = 1080;
        height = 1920;
    }

    // If theme preference is dark
    if (localStorage.getItem("theme") === "dark")
        document.body.setAttribute("data-theme", "dark");

    function logout() {
        loggedIn = false;
        isLoggedIn.set(false);
    }

    function onKeydown(event: KeyboardEvent) {
        const key = event.key;

        if (key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowUp") {
            let result = today($week, $year);

            switch (key) {
                case "ArrowLeft":
                    result = previousWeek($week, $year);
                    break;

                case "ArrowRight":
                    result = nextWeek($week, $year);
                    break;

                case "ArrowUp":
                    result = today($week, $year);
                    break;

                default:
                    break;
            }

            week.set(result.week);
            year.set(result.year);
        }
    }
</script>

<svelte:window on:keydown={onKeydown} />

<main class="bg-base-200 text-center">
    {#if loggedIn}
        <header class="p-1">
            <button on:click={logout} class="btn mt-5">Déconnexion</button>
            <Theme />
            <Today />
            <input
                type="number"
                placeholder="Semaine"
                min="1"
                bind:value={$week}
                class="input input-bordered"
            />
            <Calendar />
            <PreviousWeeks />
            <NextWeeks />
            <p class="mt-5">
                Code: {groupCode ||
                    "(Non défini, déconnectez-vous et entrez votre code VT)"} - Semaine:
                {$week} - Année: {$year}
            </p>
        </header>

        <Image {year} {vtCode} {week} {width} {height} />
    {:else}
        <Login />
    {/if}
</main>

<style>
    input[type="number"] {
        width: 5em;
    }
</style>
