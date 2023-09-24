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

                    <label class="label cursor-pointer">
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
                        class="select select-bordered min-w-[70%]"
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
