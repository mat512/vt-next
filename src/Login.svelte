<script lang="ts">
    import { login } from "./lib/login";
    import { deleteHistory, getHistory } from "./lib/history";

    let errorCodeVisible = false;

    let inputCode = localStorage.getItem("groupCode");
    let inputRemember = true;

    function loginEvent() {
        login(inputCode, inputRemember).then((value) => {
            errorCodeVisible = value;
        });
    }

    let groupCodeHistoryList = getHistory();
</script>

<div>
    <img src="/assets/logo.svg" alt="Logo" height="80" width="80" />

    <h1>VT Next</h1>

    <form on:submit={loginEvent} action="#">
        <input bind:value={inputCode} placeholder="Code de groupe VT" />
        <input type="submit" value="Continuer" />
        {#if errorCodeVisible}
            <span>Désolé code invalide :/</span>
        {/if}
    </form>

    <label>
        <input type="checkbox" bind:checked={inputRemember} />
        Se souvenir
    </label>

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
        margin-top: 2em;
        margin-bottom: 2em;
    }

    span {
        display: block;
        margin-top: 1em;
        color: red;
    }
</style>
