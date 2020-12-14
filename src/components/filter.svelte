<script>
  import { debounce } from "utils/function";
  import { filters } from "stores";

  function handleQuery(e) {
    $filters.query = e.target.value;
  }
</script>

<style>
  button.on {
    background: theme("colors.green.500");
    color: theme("colors.green.800");
  }

  button.on:hover,
  button.on:focus {
    background: theme("colors.green.600");
  }

  button.reverse {
    background: theme("colors.red.500");
    color: theme("colors.red.800");
  }

  button.reverse:hover,
  button.reverse:focus {
    background: theme("colors.red.600");
  }
</style>

<div class="flex flex-col space-y-2">
  <div class="flex items-center justify-center text-tertiary">
    <label class="relative w-full" for="filter">
      <div
        class="icon absolute top-0 left-0 flex items-center ml-1 h-8 cursor-text">
        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32">
          <path
            fill="currentColor"
            d="M 5 4 L 5 6.34375 L 5.21875 6.625 L 13 16.34375 L 13 28 L
            14.59375 26.8125 L 18.59375 23.8125 L 19 23.5 L 19 16.34375 L
            26.78125 6.625 L 27 6.34375 L 27 4 Z M 7.28125 6 L 24.71875 6 L
            17.53125 15 L 14.46875 15 Z M 15 17 L 17 17 L 17 22.5 L 15 24 Z" />
        </svg>
      </div>
      <input
        id="filter"
        name="filter"
        class="w-full border border-gray-400 text-secondary rounded px-2 pl-8
        py-1"
        type="search"
        placeholder="Filter"
        on:keyup={debounce(handleQuery, 250)}
        on:change={handleQuery}
        on:search={handleQuery}
        bind:value={$filters.query} />
    </label>
  </div>

  <div class="flex space-x-2">
    <button
      class="bg-gray-200 text-gray-500 rounded shadow-button px-2 py-2
      hover:bg-gray-300"
      class:on={$filters.isFlagged}
      class:reverse={$filters.isFlagged === 2}
      on:click={(e) => {
        $filters.isFlagged++;
        $filters.isFlagged %= 3;
        $filters.isScored = 0;
        e.target.blur();
      }}>
      <svg
        class="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32">
        <path
          fill="currentColor"
          d="M 5 5 L 5 29 L 7 29 L 7 19 L 15 19 L 15 22 L 27 22 L 27 8 L 17 8 L
          17 5 Z M 7 7 L 15 7 L 15 17 L 7 17 Z M 17 10 L 25 10 L 25 20 L 17 20 Z" />
      </svg>
    </button>

    <button
      class="bg-gray-200 text-gray-500 rounded shadow-button px-2 py-2
      hover:bg-gray-300"
      class:on={$filters.isScored}
      class:reverse={$filters.isScored === 2}
      on:click={(e) => {
        $filters.isScored++;
        $filters.isScored %= 3;
        $filters.isFlagged = 0;
        e.target.blur();
      }}>
      <svg
        class="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32">
        <path
          fill="currentColor"
          d="M 28.28125 6.28125 L 11 23.5625 L 3.71875 16.28125 L 2.28125
          17.71875 L 10.28125 25.71875 L 11 26.40625 L 11.71875 25.71875 L
          29.71875 7.71875 Z" />
      </svg>
    </button>

    <button
      class="flex-1 bg-secondary text-secondary-200 rounded shadow-button border
      border-transparent px-3 py-2 hover:bg-secondary-600 focus:bg-secondary-600"
      on:click={() => ($filters = { query: '', isFlagged: 0, isScored: 0 })}>
      Clear
    </button>
  </div>

</div>
