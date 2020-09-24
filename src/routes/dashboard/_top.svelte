<script>
  import { fade } from "svelte/transition";
  // import { easeIn } from "svelte/easing";

  import Avatar from "components/avatar.svelte";
  import Signout from "./_signout.svelte";

  //export let segment;
  let open = false;
</script>

<nav class="bg-secondary">
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-16">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button
          on:click={() => (open = !open)}
          class="inline-flex items-center justify-center p-2 rounded-sm
          text-gray-400 hover:text-white hover:bg-secondary-700
          focus:outline-none focus:bg-secondary-700 focus:text-white transition
          duration-150 ease-in-out">
          <svg
            class="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24">
            <path
              hidden:class={open}
              class:inline-flex={!open}
              class="inline-flex"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
            <path
              hidden:class={!open}
              class:inline-flex={open}
              class="hidden"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div
        class="flex-1 flex items-center justify-center sm:items-stretch
        sm:justify-start">
        <a
          class="flex items-center justify-center sm:items-stretch
          sm:justify-start"
          href="/dashboard">
          <div class="flex-shrink-0">
            <img
              class="block lg:hidden h-8 w-auto"
              src="/images/uottawa_horizontal_white.svg"
              alt="" />
            <img
              class="hidden lg:block h-8 w-auto"
              src="/images/uottawa_horizontal_white.svg"
              alt="" />
          </div>
          <h1 class="text-4xl font-bold text-white uppercase my-auto mx-4">
            Sketch Eval
          </h1>
        </a>

        <div class="hidden sm:block sm:ml-6">
          <div class="flex">

            <!-- <a
              href="#/"
              class="ml-4 px-3 py-2 rounded-sm text-sm font-medium leading-5
              text-gray-300 hover:text-white hover:bg-secondary-700
              focus:outline-none focus:text-white focus:bg-secondary-700
              transition duration-150 ease-in-out">
              Dashboard
            </a>
            <a
              href="#/"
              class="ml-4 px-3 py-2 rounded-sm text-sm font-medium leading-5
              text-gray-300 hover:text-white hover:bg-secondary-700
              focus:outline-none focus:text-white focus:bg-secondary-700
              transition duration-150 ease-in-out">
              Team
            </a>
            <a
              href="#/"
              class="ml-4 px-3 py-2 rounded-sm text-sm font-medium leading-5
              text-gray-300 hover:text-white hover:bg-secondary-700
              focus:outline-none focus:text-white focus:bg-secondary-700
              transition duration-150 ease-in-out">
              Projects
            </a>
            <a
              href="#/"
              class="ml-4 px-3 py-2 rounded-sm text-sm font-medium leading-5
              text-gray-300 hover:text-white hover:bg-secondary-700
              focus:outline-none focus:text-white focus:bg-secondary-700
              transition duration-150 ease-in-out">
              Calendar
            </a> -->
          </div>
        </div>
      </div>
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static
        sm:inset-auto sm:ml-6 sm:pr-0">
        <!-- <button
          class="p-1 border-2 border-transparent text-gray-400 rounded-full
          hover:text-white focus:outline-none focus:text-white
          focus:bg-secondary-700 transition duration-150 ease-in-out">
          <svg
            class="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002
              0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0
              .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button> -->
        <div class="ml-3 relative">
          <div class="flex items-center space-x-2">
            <Signout />
            <Avatar />

            <!--
            <button
              on:click={() => {
                open = !!open;
              }}
              class="flex text-sm border-2 text-primary border-transparent
              rounded-full focus:outline-none focus:border-white transition
              duration-150 ease-in-out">
              <Avatar />
            </button>
           -->

          </div>
          {#if open}
            <!-- <div
            x-transition:enter="transition ease-out duration-100"
            x-transition:enter-start="transform opacity-0 scale-95"
            x-transition:enter-end="transform opacity-100 scale-100"
            x-transition:leave="transition ease-in duration-75"
            x-transition:leave-start="transform opacity-100 scale-100"
            x-transition:leave-end="transform opacity-0 scale-95"
            class="origin-top-right absolute right-0 mt-2 w-48 rounded-sm shadow-lg"> -->
            <div
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-sm
              shadow-lg">
              <div class="py-1 rounded-sm bg-white shadow-xs">
                <a
                  href="#/"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700
                  hover:bg-gray-100 focus:outline-none focus:bg-gray-100
                  transition duration-150 ease-in-out">
                  Your Profile
                </a>
                <a
                  href="#/"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700
                  hover:bg-gray-100 focus:outline-none focus:bg-gray-100
                  transition duration-150 ease-in-out">
                  Settings
                </a>
                <a
                  href="#/"
                  class="block px-4 py-2 text-sm leading-5 text-gray-700
                  hover:bg-gray-100 focus:outline-none focus:bg-gray-100
                  transition duration-150 ease-in-out">
                  Sign out
                </a>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
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
</nav>
