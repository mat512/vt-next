<script lang="ts">
    import { onMount } from "svelte";

    import { getWeek, getWeeksInYear, getYear } from "./lib/date";
    import { groupCodeValue, isLoggedIn, vtCodeValue } from "./lib/login";
    import { toggleDarkMode } from "./lib/theme";

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

    const isDarkMode = localStorage.getItem("darkMode");
    if (isDarkMode === "true") toggleDarkMode();

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

    let vtUrl = localStorage.getItem("vtUrl");
    if (vtUrl === null) {
        onMount(async () => {
            const response = await fetch(
                import.meta.env.VITE_API_URL + "/api/url"
            );
            vtUrl = await response.text();
            localStorage.setItem("vtUrl", vtUrl);
        });
    }
</script>

<svelte:window on:keydown={onKeydown} />

<main>
    {#if loggedIn}
        <header>
            <button on:click={logout}>Déconnexion</button>
            <button on:click={toggleDarkMode} aria-label="Changer de thème">
                <img src="/assets/sun.svg" alt="Thème" height="13" width="13" />
            </button>
            <button type="button" on:click={today}>Aujourd'hui</button>
            <input
                type="number"
                placeholder="Semaine"
                min="1"
                bind:value={week}
            />
            <input
                type="date"
                placeholder="Calendrier"
                bind:value={inputDate}
                on:change={calendar}
            />
            <button
                type="button"
                on:click={previousWeek}
                aria-label="Précédente"
            >
                <img src="/assets/arrowLeft.svg" alt="Précédente" height="13" width="13" />
            </button>
            <button type="button" on:click={nextWeek} aria-label="Suivante">
                <img src="/assets/arrowRight.svg" alt="Suivante" height="13" width="13" />
            </button>
            <p>
                Code: {groupCode ||
                    "(Non défini, déconnectez-vous et entrez votre code VT)"} - Semaine:
                {week} - Année: {year}
            </p>
        </header>

        {#if vtUrl !== null}
            <img
                src="{vtUrl}/vue_etudiant_horizontale.php?current_year={year}&current_student={vtCode}&current_week={week}&lar={width}&hau={height}"
                alt="Emploi du temps"
                usemap="#navigation"
            />
        {/if}
    {:else}
        <Login />
    {/if}
</main>

<style>
    input[type="number"] {
        width: 40px;
    }

    input[type="date"] {
        max-width: 8rem;
        -webkit-appearance: none;
    }
</style>
