<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  export let danger;

  const dispatch = createEventDispatcher();
</script>

<style>
  button.danger {
    color: theme("colors.red.200");
    background: theme("colors.red.500");
  }

  button.danger:hover,
  button.danger:focus {
    background: theme("colors.red.600");
  }
</style>

<div
  class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center
  sm:justify-center">
  <div
    class="fixed inset-0 z-10"
    in:fade={{ duration: 200 }}
    out:fade={{ duration: 200, delay: 200 }}>
    <div class="absolute inset-0 bg-gray-500 opacity-75" />
  </div>

  <div
    class="bg-gray-200 rounded overflow-hidden shadow sm:max-w-lg sm:w-full
    z-100"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-headline"
    in:fade={{ duration: 200, delay: 200 }}
    out:fade={{ duration: 200 }}>
    <div class="bg-gray-100 p-4">
      <div class="sm:flex sm:items-start">
        <div class="text-center sm:flex-grow sm:text-left space-y-6">
          <h3 class="text-lg font-bold text-gray-900" id="modal-headline">
            <slot name="header">Modal header</slot>
          </h3>
          <div class="space-y-2">
            <slot>
              <p class="leading-5 text-gray-500">Modal body</p>
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 px-4 pb-4 text-base flex space-x-2">
      <button
        type="button"
        class="flex-grow rounded shadow-button border border-transparent px-3
        py-2 bg-white text-gray-500 hover:bg-gray-100 focus:bg-gray-100"
        on:click={() => dispatch('cancel')}>
        <slot name="cancel">Cancel</slot>
      </button>

      <button
        type="button"
        class="flex-grow rounded shadow-button border border-transparent px-3
        py-2 bg-green-500 text-green-200 hover:bg-green-600 focus:outline-none
        focus:border-green-600"
        class:danger
        on:click={() => dispatch('confirm')}>
        <slot name="confirm">Confirm</slot>
      </button>
    </div>
  </div>
</div>
