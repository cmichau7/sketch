<script>
  import { stores } from "@sapper/app";
  import { fade } from "svelte/transition";
  import { applicant, scorings, store } from "stores";
  import { sticky } from "actions/sticky";

  import Scores from "./_scores.svelte";
  import Filter from "components/filter.svelte";

  const { page, session } = stores();
  const { segment } = store({ page, session });

  let open = false;
</script>

<nav class="sticky -top-1 hidden md:flex bg-tertiary z-50" use:sticky>
  <div class="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div class="relative flex justify-between items-center min-h-32">
      <Filter />

      {#if $applicant && $scorings}
        <h2 class="text-white text-lg font-bold md:text-6xl">
          {$applicant.reference_number}
        </h2>

        <Scores />
      {/if}
    </div>

    <div class:block={open} class:hidden={!open} class="hidden sm:hidden">
      <div class="px-2 pt-2 pb-3">
        <!-- <a
        href="#"
        class="block px-3 py-2 rounded-sm text-base font-medium text-white
        bg-gray-900 focus:outline-none focus:text-white focus:bg-secondary-700
        transition duration-150 ease-in-out">
        Dashboard
      </a>
      <a
        href="#"
        class="mt-1 block px-3 py-2 rounded-sm text-base font-medium
        text-gray-300 hover:text-white hover:bg-secondary-700 focus:outline-none
        focus:text-white focus:bg-secondary-700 transition duration-150
        ease-in-out">
        Team
      </a>
      <a
        href="#"
        class="mt-1 block px-3 py-2 rounded-sm text-base font-medium
        text-gray-300 hover:text-white hover:bg-secondary-700 focus:outline-none
        focus:text-white focus:bg-secondary-700 transition duration-150
        ease-in-out">
        Projects
      </a>
      <a
        href="#"
        class="mt-1 block px-3 py-2 rounded-sm text-base font-medium
        text-gray-300 hover:text-white hover:bg-secondary-700 focus:outline-none
        focus:text-white focus:bg-secondary-700 transition duration-150
        ease-in-out">
        Calendar
      </a> -->
      </div>
    </div>
  </div>
</nav>
