<script lang="ts">
    import { getWeek, getWeeksInYear, getYear } from "./lib/date";
    import { groupCodeValue, isLoggedIn, vtCodeValue } from "./lib/login";
    import Image from "./lib/Image.svelte";
    import Theme from "./lib/Theme.svelte";
    import Login from "./Login.svelte";

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

    let week = getWeek(new Date());
    let year = getYear(week);

    function today() {
        week = getWeek(new Date());
        year = getYear(week);
    }

    function previousWeek() {
        week -= 1;
        if (week <= 0) {
            year -= 1;
            week = getWeeksInYear(year);
        }
    }

    function nextWeek() {
        week += 1;
        if (week > getWeeksInYear(year)) {
            year += 1;
            week = 1;
        }
    }

    let inputDate = new Date().toISOString().slice(0, 10);

    function calendar() {
        const date = new Date(inputDate);
        if (!isNaN(date.getTime())) {
            week = getWeek(date);
            year = getYear(week);
        }
    }

    function logout() {
        loggedIn = false;
        isLoggedIn.set(false);
    }

    function onKeydown(event: KeyboardEvent) {
        const key = event.key;
        if (key === "ArrowLeft") previousWeek();
        if (key === "ArrowRight") nextWeek();
        if (key === "ArrowUp") today();
    }
</script>

<svelte:window on:keydown={onKeydown} />

<main class="bg-base-200 text-center">
    {#if loggedIn}
        <header class="p-1">
            <button on:click={logout} class="btn mt-5">Déconnexion</button>
            <Theme />
            <button type="button" on:click={today} class="btn">
                Aujourd'hui
            </button>
            <input
                type="number"
                placeholder="Semaine"
                min="1"
                bind:value={week}
                class="input input-bordered"
            />
            <input
                type="date"
                placeholder="Calendrier"
                bind:value={inputDate}
                on:change={calendar}
                class="input input-bordered mt-5"
            />
            <button
                type="button"
                on:click={previousWeek}
                aria-label="Précédente"
                class="btn"
            >
                <img
                    src="/assets/arrowLeft.svg"
                    alt="Précédente"
                    height="13"
                    width="13"
                />
            </button>
            <button
                type="button"
                on:click={nextWeek}
                aria-label="Suivante"
                class="btn"
            >
                <img
                    src="/assets/arrowRight.svg"
                    alt="Suivante"
                    height="13"
                    width="13"
                />
            </button>
            <p class="mt-5">
                Code: {groupCode ||
                    "(Non défini, déconnectez-vous et entrez votre code VT)"} - Semaine:
                {week} - Année: {year}
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

    input[type="date"] {
        -webkit-appearance: none;
    }
</style>
