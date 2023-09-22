<script lang="ts">
    import { groupCode, vtCode } from "./stores/login";
    import { nextWeek, previousWeek, today } from "./lib/date";
    import { week, year } from "./stores/date";

    import Image from "./components/Image.svelte";
    import Theme from "./components/Theme.svelte";
    import NextWeek from "./components/NextWeek.svelte";
    import PreviousWeek from "./components/PreviousWeek.svelte";
    import Today from "./components/Today.svelte";
    import Calendar from "./components/Calendar.svelte";
    import Logout from "./components/Logout.svelte";

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
            }

            week.set(result.week);
            year.set(result.year);
        }
    }
</script>

<svelte:window on:keydown={onKeydown} />

<div>
    <header class="p-1">
        <div class="btn-group mt-5">
            <Logout />
            <Theme />
            <Today />
        </div>
        <input
            type="number"
            placeholder="Semaine"
            min="1"
            bind:value={$week}
            class="input input-bordered w-20"
        />
        <Calendar />
        <div class="btn-group">
            <PreviousWeek />
            <NextWeek />
        </div>
        <p class="mt-5">
            Code: {$groupCode ||
                "(Non défini, déconnectez-vous et entrez votre code VT)"} - Semaine:
            {$week} - Année: {$year}
        </p>
    </header>

    <Image {year} {vtCode} {week} />
</div>
