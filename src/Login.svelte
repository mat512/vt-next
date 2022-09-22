<script lang="ts">
    import { login } from "./lib/login";
    import { deleteHistory, getHistory } from "./lib/history";

    let errorCodeVisible = false;

    let inputCode = localStorage.getItem("groupCode");
    let inputRemember = true;

    function loginEvent() {
        login(inputCode.toUpperCase(), inputRemember).then((value) => {
            errorCodeVisible = value;
        });
    }

    function deleteEvent() {
        deleteHistory();
        location.reload();
    }

    let groupCodeHistoryList = getHistory();
</script>

<div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
        <div class="max-w-md">
            <div class="avatar">
                <div class="w-24 rounded-xl">
                    <img
                        src="/assets/logo.svg"
                        alt="Logo"
                        height="80"
                        width="80"
                    />
                </div>
            </div>

            <h1 class="text-3xl m-5 font-bold">VT Next</h1>

            <form on:submit|preventDefault={loginEvent}>
                <div class="form-control w-full max-w-xs">
                    <input
                        bind:value={inputCode}
                        type="text"
                        placeholder="Code de groupe VT"
                        class="input input-bordered w-full max-w-xs"
                    />

                    <label class="label" for="">
                        {#if errorCodeVisible}
                            <span class="label-text-alt text-amber-700">
                                Désolé code invalide :/
                            </span>
                        {/if}
                    </label>

                    <label class="label cursor-pointer ">
                        <span class="label-text">Se souvenir</span>
                        <input
                            type="checkbox"
                            bind:checked={inputRemember}
                            class="checkbox"
                        />
                    </label>

                    <input class="btn" type="submit" value="Continuer" />
                </div>
            </form>

            <p class="mt-5 text-left">Historique:</p>
            <div class="form-control">
                <div class="input-group">
                    <select
                        bind:value={inputCode}
                        class="select select-bordered "
                    >
                        {#each groupCodeHistoryList as code}
                            <option value={code}>{code}</option>
                        {/each}
                    </select>
                    <button
                        class="btn"
                        type="button"
                        on:click={deleteEvent}
                        aria-label="Supprimer l'historique"
                    >
                        <img
                            src="/assets/trash.svg"
                            alt="Trash"
                            height="13"
                            width="13"
                        /></button
                    >
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    select {
        min-width: 10em;
    }
</style>
