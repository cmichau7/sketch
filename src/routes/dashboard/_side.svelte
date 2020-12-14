<script>
  import { stores } from "@sapper/app";
  import { applicants, filters, hasFilters, hasFlags, store } from "stores";

  import Filter from "components/filter.svelte";

  const { segment } = store(stores());

  $: filter = (applicants) => {
    if (!$hasFilters) {
      return applicants;
    }

    const { query, ...flags } = $filters;

    if (query) {
      applicants = applicants.filter((applicant) =>
        applicant.reference_number.toString().includes(query)
      );
    }

    if ($hasFlags) {
      applicants = applicants.filter((applicant) => {
        for (const [prop, value] of Object.entries(flags)) {
          if (!value) continue;

          const flag = value === 1 ? !!applicant[prop] : !applicant[prop];

          if (flag) return true;
        }
      });
    }

    return applicants;
  };
</script>

<style>
  a.active {
    color: theme("colors.secondary.200");
    background: theme("colors.secondary.500");
  }

  a.scored {
    color: theme("colors.green.800");
    background: theme("colors.green.300");
  }

  a.scored:hover,
  a.scored:focus {
    background: theme("colors.green.400");
  }

  a.active.scored {
    background: theme("colors.green.500");
  }

  a.flagged {
    color: theme("colors.red.800");
    background: theme("colors.red.300");
  }

  a.flagged:hover,
  a.flagged:focus {
    background: theme("colors.red.400");
  }

  a.active.flagged {
    background: theme("colors.red.500");
  }
</style>

<div class="hidden md:flex md:flex-shrink-0 md:w-1/5">
  <div class="flex flex-col md:w-full">
    <div class="hidden bg-tertiary-500 px-6 py-4">
      <Filter />
    </div>
    <div class="h-0 flex-1 flex flex-col overflow-y-auto">
      <nav id="sidenav" class="border-r-1 border-gray-300">
        {#if !$applicants.length}
          <div class="py-2 px-2 sm:py-4 sm:px-6 lg:px-8">
            <p class="font-heading font-bold my-4">
              No applicants for this cycle has been assigned to you.
            </p>
            <p>
              If you should have applicants assigned to you, please contact an
              admin so they can verify Admissions' configurations. Thank you.
            </p>
          </div>
        {:else}
          {#if !filter($applicants).length && $hasFilters}
            <div
              class="flex flex-col justify-center py-2 px-2 sm:py-4 sm:px-6
              lg:px-8">
              <p class="font-heading text-center font-bold my-4">
                No applicants found that is matching your filters.
              </p>
              <button
                class="bg-secondary text-gray-200 rounded shadow-button border
                border-transparent px-3 py-2 hover:bg-secondary-600
                focus:bg-secondary-600"
                on:click={() => ($filters = { query: '', isFlagged: 0, isScored: 0 })}>
                Clear Filters
              </button>
            </div>
          {/if}

          {#each filter($applicants) as { reference_number, isFlagged, isScored }}
            <a
              href="/dashboard/{reference_number}"
              class="flex justify-between text-lg bg-gray-100 py-2 px-2 sm:py-4
              sm:px-6 lg:px-8 hover:bg-gray-200 focus:bg-gray-200"
              class:active={reference_number === parseInt($segment)}
              class:flagged={isFlagged}
              class:scored={isScored}>
              <span>{reference_number}</span>
              {#if isFlagged}
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32">
                  <path
                    fill="currentColor"
                    d="M 5 5 L 5 29 L 7 29 L 7 19 L 15 19 L 15 22 L 27 22 L 27 8
                    L 17 8 L 17 5 Z M 7 7 L 15 7 L 15 17 L 7 17 Z M 17 10 L 25
                    10 L 25 20 L 17 20 Z" />
                </svg>
              {:else if isScored}
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32">
                  <path
                    fill="currentColor"
                    d="M 28.28125 6.28125 L 11 23.5625 L 3.71875 16.28125 L
                    2.28125 17.71875 L 10.28125 25.71875 L 11 26.40625 L
                    11.71875 25.71875 L 29.71875 7.71875 Z" />
                </svg>
              {/if}
            </a>
          {/each}

          {#each new Array(20) as arr}
            <div class="h-10">test</div>
          {/each}
          <div class="h-10 bg-red-500">last</div>
        {/if}
      </nav>
    </div>
  </div>
</div>
