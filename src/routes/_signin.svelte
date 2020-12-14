<script>
  import { goto, stores } from "@sapper/app";
  import { createForm } from "svelte-forms-lib";
  import { post } from "src/api";
  import { schema } from "./_signin";

  const { session } = stores();

  let error = false;

  const { form, errors, isSubmitting, handleChange, handleSubmit } = createForm(
    {
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: schema,
      onSubmit: async ({ username, password }) => {
        const { ok, message, user } = await post("/api/auth/signin", {
          username,
          password,
        });

        if (ok) {
          error = false;
          await goto("/dashboard");
        } else {
          console.log(message);
          error = message;
        }
      },
    }
  );
</script>

<style>
  input[type="submit"]:disabled,
  input[type="submit"].disabled {
    color: theme("colors.gray.500");
    background: theme("colors.gray.300");
  }
</style>

<form class="flex flex-col space-y-4" on:submit|preventDefault={handleSubmit}>
  {#if error}
    <p class="text-sm text-red-500">{error}</p>
  {/if}

  <label
    for="username"
    class="flex flex-col text-gray-500 text-left text-xs space-y-2">
    <span>Username</span>
    <input
      id="username"
      type="text"
      name="username"
      class="border border-gray-400 text-secondary rounded px-2 py-1"
      class:border-red-500={!!$errors.username}
      class:bg-red-200={!!$errors.username}
      on:change={handleChange}
      bind:value={$form.username} />
  </label>

  <label
    for="password"
    class="flex flex-col text-gray-500 text-left text-xs space-y-1">
    <span>Password</span>
    <input
      id="password"
      type="password"
      name="password"
      class="border border-gray-400 text-secondary rounded px-2 py-1"
      class:border-red-500={!!$errors.password}
      class:bg-red-200={!!$errors.password}
      on:change={handleChange}
      bind:value={$form.password} />
  </label>

  <input
    type="submit"
    class="bg-tertiary text-white rounded shadow-button border
    border-transparent px-3 py-2 hover:bg-tertiary-600"
    class:disabled={$isSubmitting}
    disabled={$isSubmitting}
    value="Sign in" />
</form>
