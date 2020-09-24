<script context="module">
  export async function preload(_, session) {
    if (session.user) {
      this.redirect(302, "/dashboard");
    }
  }
</script>

<script>
  import { stores } from "@sapper/app";

  import Logo from "components/logo.svelte";
  import Signin from "./_signin.svelte";

  const { preloading } = stores();
</script>

<svelte:head>
  <title>uOttawa | Sketch Eval</title>
</svelte:head>

{#if !$preloading}
  <main
    class="flex h-screen bg-tertiary text-center justify-center items-center p-4">
    <div
      class="flex flex-col w-full bg-gray-100 shadow p-12 space-y-6 md:w-128">
      <header class="w-auto mb-12 mx-auto">
        <Logo />
      </header>

      <section class="text-left space-y-2">
        <h2 class="text-xl font-bold">Sketch Eval</h2>
        <p class="text-sm text-gray-900">
          Please enter your username and password to begin.
        </p>
      </section>

      <Signin />
    </div>
  </main>
{/if}
