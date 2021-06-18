<script context="module">
  export async function preload(page, session) {
    if (!session.cycle || !session.subpools) {
      const { ok, data = {}, message = "" } = await this.fetch(
        "/api/cycle"
      ).then((res) => res.json());

      if (!ok) {
        console.log({ message });
      }

      session.cycle = data.cycle;
      session.subpools = data.subpools;
    }
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import { onMount } from "svelte";

  const { preloading } = stores();

  onMount(async () => {
    const module = await import("webfontloader");
    const webfontloader = module.default;

    webfontloader.load({
      google: {
        families: ["Poppins:100,300,400,500,600,700&display=swap"],
      },
    });
  });
</script>

<style global>
  @import "../assets/css/theme.css";

  .loading:after {
    content: " .";
    animation: dots 1s steps(5, end) infinite;
  }

  @keyframes dots {
    0%,
    20% {
      color: rgba(0, 0, 0, 0);
      text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    40% {
      color: inherit;
      text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    60% {
      text-shadow: 0.25em 0 0 currentColor, 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    80%,
    100% {
      text-shadow: 0.25em 0 0 currentColor, 0.5em 0 0 currentColor;
    }
  }
</style>

{#if $preloading}
  <div class="h-screen w-screen flex justify-center align-center">
    <h3 class="text-3xl mt-16 loading">Loading</h3>
  </div>
{:else}
  <slot />
{/if}
