<script lang="ts">
    import { nextWeek } from "../lib/date";
    import { week, year } from "../stores/date";

    function handleClick() {
        const result = nextWeek($week, $year);
        week.set(result.week);
        year.set(result.year);
    }
</script>

<button type="button" on:click={handleClick} aria-label="Suivante" class="btn">
    <img src="/assets/arrowRight.svg" alt="Suivante" height="13" width="13" />
</button>
