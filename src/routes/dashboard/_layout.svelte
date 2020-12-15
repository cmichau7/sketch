<script context="module">
  import { applicants } from "stores";

  export async function preload(_page, session) {
    if (!session.user) {
      const { ok, data = [] } = await this.fetch(
        "/api/auth/guard"
      ).then((res) => res.json());

      if (!ok) {
        this.redirect(302, "/");
      }

      session.user = data;
    }

    const { ok, data = [], message = "" } = await this.fetch(
      "/api/applicants"
    ).then((res) => res.json());

    if (!ok) {
      console.log({ message });
    }

    applicants.set(data);
  }
</script>

<script>
  import Top from "./_top.svelte";
  import Mid from "./_mid.svelte";
  import Side from "./_side.svelte";
</script>

<svelte:head>
  <title>uOttawa | Dashboard</title>
</svelte:head>

<Top />
<Mid />
<main class="h-screen flex overflow-hidden -mt-48 pt-48">
  <Side />
  <slot />
</main>
