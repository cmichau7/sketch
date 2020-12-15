<script context="module">
  export async function preload(page, session) {
    if (!session.cycle || !session.subpools) {
      const { ok, data = {}, message = "" } = await this.fetch(
        "/api/cycle"
      ).then((res) => res.json());

      if (!ok) {
        console.log({ message });
      }

      session = { ...session, ...data };
    }
  }
</script>

<script>
  import { onMount } from "svelte";

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
  @import '../assets/css/theme.css';
</style>


<slot />
