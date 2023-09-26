<script lang="ts">
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";
    
    import { getAPIUrl } from "../../lib/url";

    let vtUrl = localStorage.getItem("vtUrl");
    if (vtUrl === null) {
        onMount(async () => {
            const url = getAPIUrl("url");
            const response = await fetch(url);
            vtUrl = await response.text();
            localStorage.setItem("vtUrl", vtUrl);
        });
    }

    export let year: Writable<number>;
    export let vtCode: Writable<string>;
    export let week: Writable<number>;

    // Adapt the image size to the screen orientation
    let width = 1920;
    let height = 1080;

    if (window.matchMedia("(orientation: portrait)").matches) {
        width = 1080;
        height = 1920;
    }
</script>

{#if vtUrl !== null}
    <img
        src="{vtUrl}/vue_etudiant_horizontale.php?current_year={$year}&current_student={$vtCode}&current_week={$week}&lar={width}&hau={height}"
        alt="Emploi du temps"
        usemap="#navigation"
        class="w-full"
    />
{/if}
