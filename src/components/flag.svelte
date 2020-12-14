<script>
  import { goto } from "@sapper/app";
  import { applicants, applicant } from "stores";
  import { post } from "src/api";

  import Modal from "components/modal.svelte";

  export let disabled = false;
  let show = false;
  let reason = "";
  let error = false;

  function handleClick() {
    console.log("clicked");
    show = true;
  }

  async function handleConfirm() {
    if (reason === "") {
      error = "A reason for the flag must be given.";
      document.getElementById("reason").focus();
      return;
    }

    error = false;
    show = false;

    const { ok, message } = await post("/api/flags", {
      applicant: $applicant,
      reason,
    });

    if (ok) {
      goto("/dashboard");

      reason = "";
      $applicants = $applicants.map((a) => {
        if (a.applicant_id === $applicant.applicant_id) {
          a.isFlagged = true;
        }

        return a;
      });
    } else {
      error = message;
      console.log({ message });
    }
  }
</script>

<style>
  button:disabled,
  button.disabled {
    color: theme("colors.gray.500");
    background: theme("colors.gray.300");
  }
</style>

{#if show}
  <Modal danger on:cancel={() => (show = false)} on:confirm={handleConfirm}>
    <span slot="header">What is the reason for this flag?</span>

    {#if error}
      <p class="text-sm text-red-500 mt-4">{error}</p>
    {/if}

    <textarea
      id="reason"
      class="w-full border border-gray-400 text-secondary rounded px-3 py-2"
      class:border-red-500={error}
      col="6"
      bind:value={reason}
      placeholder="Write the reason for the flag." />
  </Modal>
{/if}

<button
  class="bg-red-600 text-red-200 rounded shadow-button border border-transparent
  px-2 py-2 hover:bg-red-700"
  class:disabled={$applicant.isFlagged}
  disabled={$applicant.isFlagged || disabled}
  on:click|preventDefault={handleClick}>
  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path
      fill="currentColor"
      d="M 5 5 L 5 29 L 7 29 L 7 19 L 15 19 L 15 22 L 27 22 L 27 8 L 17 8 L 17 5
      Z M 7 7 L 15 7 L 15 17 L 7 17 Z M 17 10 L 25 10 L 25 20 L 17 20 Z" />
  </svg>
</button>
