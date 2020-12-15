<script>
  import { stores } from "@sapper/app";

  const { session } = stores();

  export let width = "50";
  export let height = "50";

  let initals = $session.user
    ? $session.user.firstname[0] + $session.user.lastname[0]
    : "SE";
</script>

<svg
  {width}
  {height}
  class="text-tertiary-500"
  viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="49" fill="currentColor" />
  <text
    class="text-4xl font-bold"
    x="50%"
    y="50%"
    dominant-baseline="middle"
    text-anchor="middle"
    fill="white">
    {initals}
  </text>
</svg>
