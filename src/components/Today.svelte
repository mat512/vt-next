<script lang="ts">
    import { today } from "../lib/date";
    import { week, year } from "../lib/stores";

    function handleClick() {
        const result = today($week, $year);
        week.set(result.week);
        year.set(result.year);
    }
</script>

<button type="button" on:click={handleClick} class="btn">Aujourd'hui</button>
