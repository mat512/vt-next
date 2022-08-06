<script lang="ts">
    import { errorCode, login } from "./lib/login";
    import { deleteHistory, getHistory } from "./lib/history";

    let errorCodeVisible = false;
    errorCode.subscribe((value) => {
        errorCodeVisible = value;
    });

    let inputCode = localStorage.getItem("groupCode");
    let inputRemember = true;

    function loginEvent() {
        login(inputCode, inputRemember);
    }

    function onKeydown(event: KeyboardEvent) {
        const key = event.key;
        if (key === "Enter") loginEvent();
    }

    let groupCodeHistoryList = getHistory();
</script>

<svelte:window on:keydown={onKeydown} />

<div>
    <img src="/assets/logo.svg" alt="Logo" height="80" width="80" />

    <h1>VT Next</h1>

    <input bind:value={inputCode} placeholder="Code de groupe VT" />
    <button type="button" on:click={loginEvent}>Continuer</button>

    {#if errorCodeVisible}
        <p style="color: red;">Désolé code invalide :/</p>
    {/if}

    <br />

    <label>
        <input type="checkbox" bind:checked={inputRemember} />
        Se souvenir
    </label>

    <br />

    <p>Historique:</p>
    <select bind:value={inputCode}>
        {#each groupCodeHistoryList as code}
            <option value={code}>{code}</option>
        {/each}
    </select>
    <button
        type="button"
        on:click={deleteHistory}
        aria-label="Supprimer l'historique"
    >
        <img src="/assets/trash.svg" alt="Trash" height="13" width="13" />
    </button>
</div>

<style>
    div {
        margin-top: 20vh;
    }

    input[type="checkbox"] {
        margin: 1em;
    }
</style>
