<script context="module">
  import { applicant, scorings } from "stores";

  export async function preload() {
    applicant.set(false);
    scorings.set(false);
  }
</script>

<script>
  import { applicants } from "stores";

  $: firstApplicant = $applicants.find(
    (applicant) => !applicant.isScored && !applicant.isFlagged
  );
</script>

<div
  class="flex flex-col justify-center items-center w-0 flex-1 overflow-hidden">
  <div class="flex flex-col items-center -mt-48 space-y-2">
    <h3 class="text-3xl">Please select an applicant to start reviewing.</h3>
    <p>
      To start the scoring process, you may select any candidate located in the
      sidebar navigation.
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
</div>
