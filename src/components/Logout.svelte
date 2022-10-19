<script lang="ts">
    import { loggedIn } from "../lib/login";

    function logout() {
        loggedIn.set(false);
    }
</script>

<button on:click={logout} class="btn mt-5">Déconnexion</button>
