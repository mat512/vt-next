<script lang="ts">
    import { getWeek } from "../lib/date";
    import { week, year, date } from "../stores/date";

    function calendar() {
        const d = new Date($date);
        if (!isNaN(d.getTime())) {
            $week = getWeek(d);
            $year = d.getFullYear();
        }
    }
</script>

<input
    type="date"
    placeholder="Calendrier"
    bind:value={$date}
    on:change={calendar}
    class="input input-bordered mt-5"
/>

<style>
    input[type="date"] {
        -webkit-appearance: none;
    }
</style>
