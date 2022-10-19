<script lang="ts">
    import { onMount } from "svelte";

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

    export let year;
    export let vtCode;
    export let week;
    export let width;
    export let height;
</script>

{#if vtUrl !== null}
    <img
        src="{vtUrl}/vue_etudiant_horizontale.php?current_year={$year}&current_student={vtCode}&current_week={$week}&lar={width}&hau={height}"
        alt="Emploi du temps"
        usemap="#navigation"
        class="w-full"
    />
{/if}
