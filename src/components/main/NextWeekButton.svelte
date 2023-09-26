<script lang="ts">
    import { nextWeek } from "../../lib/date";
    import { week, year } from "../../stores/date";

    function handleClick() {
        const result = nextWeek($week, $year);
        week.set(result.week);
        year.set(result.year);
    }
</script>

<button type="button" on:click={handleClick} aria-label="Suivante">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
    </svg>
</button>
