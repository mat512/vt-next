<script lang="ts">
    import type { Writable } from "svelte/store";
    
    import { login } from "../../lib/login";

    let errorCodeVisible = false;

    let inputRemember = true;

    export let inputCode: Writable<string>;

    function loginEvent() {
        login($inputCode.toUpperCase(), inputRemember).then((value) => {
            errorCodeVisible = value;
        });
    }
</script>

<form on:submit|preventDefault={loginEvent}>
    <div class="form-control w-full max-w-xs">
        <input
            bind:value={$inputCode}
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
