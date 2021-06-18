<script context="module">
  import { applicant, scorings } from "stores";

  export async function preload() {
    applicant.set(false);
    scorings.set(false);
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import { applicants } from "stores";

  const { preloading } = stores();

  $: firstApplicant = $applicants.find(
    (applicant) => !applicant.isScored && !applicant.isFlagged
  );
</script>

<div
  class="flex flex-col text-center justify-center items-center w-0 flex-1 overflow-hidden">
  {#if $preloading}
    <div
      class="flex flex-col w-full text-center items-center justify-center space-y-2 px-8">
      <h3 class="text-3xl mt-16 loading">Loading</h3>
    </div>
  {:else}
    <div class="flex flex-col items-center -mt-48 space-y-2">
      <h3 class="text-3xl">Please select an applicant to start reviewing.</h3>
      <p>
        To start the scoring process, you may select any candidate located in
        the sidebar navigation.
      </p>
    </div>

    {#if firstApplicant}
      <div class="flex flex-col items-center space-y-1">
        <p>Your first unscored candidate from your list is</p>
        <a
          class="font-heading text-3xl text-tertiary font-bold
        hover:text-tertiary-600 focus:text-tertiary-600"
          href="/dashboard/{firstApplicant.reference_number}">
          {firstApplicant.reference_number}
        </a>
      </div>
    {:else}
      <div class="flex flex-col items-center space-y-1">
        <p>You have no more applicants remaining on your list.</p>
      </div>
    {/if}
  {/if}
</div>
