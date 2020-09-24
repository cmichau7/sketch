<script>
  import Logo from "components/logo.svelte";

  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<svelte:head>
  <title>uOttawa | Sketch Eval | {status}</title>
</svelte:head>

<main
  class="flex flex-col min-h-screen justify-center items-center text-white
  bg-tertiary">
  <header class="-mt-12 mb-12">
    <Logo colour="white" />
  </header>

  <h1 class="text-6xl mb-2">{status}</h1>
  <p class="text-lg mt-2">{error.message}</p>
</main>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
