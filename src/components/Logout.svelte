<script lang="ts">
    import { loggedIn } from "../stores/login";

    function logout() {
        loggedIn.set(false);
    }
</script>

<button on:click={logout} class="btn">Déconnexion</button>
