<script>
  import { goto, stores } from "@sapper/app";
  import { post } from "src/api";

  const { session } = stores();

  async function handleClick() {
    const { ok, message } = await post("/api/auth/signout");

    console.log({ ok, message });

    if (ok) {
      delete $session.user;
      goto("/");
    }
  }
</script>

<button
  class="flex items-center bg-red-600 text-red-200 rounded shadow-button border
  border-transparent space-x-1 px-2 py-2 hover:bg-red-700"
  on:click={handleClick}>
  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <path
      fill="currentColor"
      d="M 15 4 L 15 16 L 17 16 L 17 4 Z M 12 4.6875 C 7.347656 6.339844 4
      10.785156 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188
      28 16 C 28 10.785156 24.652344 6.339844 20 4.6875 L 20 6.84375 C 23.527344
      8.390625 26 11.910156 26 16 C 26 21.515625 21.515625 26 16 26 C 10.484375
      26 6 21.515625 6 16 C 6 11.910156 8.472656 8.390625 12 6.84375 Z" />
  </svg>
  <span>Signout</span>
</button>
