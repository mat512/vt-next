<script lang="ts">
    import { previousWeek } from "../lib/date";
    import { week, year } from "../lib/stores";

    function handleClick() {
        const result = previousWeek($week, $year);
        week.set(result.week);
        year.set(result.year);
    }
</script>

<button
    type="button"
    on:click={handleClick}
    aria-label="Précédente"
    class="btn"
>
    <img src="/assets/arrowLeft.svg" alt="Précédente" height="13" width="13" />
</button>
