<script lang="ts">
    import { inputCode } from "./stores/login";
    
    import History from "./components/login/History.svelte";
    import LoginForm from "./components/login/LoginForm.svelte";

    inputCode.set(localStorage.getItem("groupCode"));
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

            <LoginForm {inputCode} />

            <History {inputCode} />
        </div>
    </div>
</div>
