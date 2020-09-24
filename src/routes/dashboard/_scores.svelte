<script>
  // TODO cleanup / simplify
  import { goto, stores } from "@sapper/app";
  import { createForm } from "svelte-forms-lib";
  import { object } from "yup";
  import { applicants, applicant, scorings, scores, schema } from "stores";
  import { post } from "src/api";

  import Flag from "components/flag.svelte";

  const { session } = stores();

  let error = false;

  const {
    form,
    errors,
    updateInitialValues,
    // updateValidateField,
    // isValid,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = createForm({
    initialValues: $scores,
    validationSchema: $schema,
    onSubmit: async (scores) => {
      if ($applicant.isFlagged) return;

      const { ok, message, user } = await post(`/api/scores`, {
        applicant: $applicant,
        scores,
      });

      if (ok) {
        goto("/dashboard");
        error = false;

        $applicants = $applicants.map((a) => {
          if (a.applicant_id === $applicant.applicant_id) {
            a.isScored = true;
          }
          return a;
        });
      } else {
        console.log(message);
        error = message;
      }
    },
  });

  $: updateInitialValues($scores);
  // $: scores = createScores($form);

  // $: console.dir({ $scores }, { depth: null });
  $: types = $session.user.groups[$applicant.group_id];
  $: canScore = (shortname) =>
    types.some((type) => type.shortname === shortname);
  //   // updateInitialValues();
  //   console.log({ $form });
  // }

  // function handleBeforeUnload(e) {
  //   console.log("\n\n\n\nbeforeUnload\n\n\n");

  //   // Chrome
  //   event.returnValue = "";

  //   return "";
  // }
</script>

<style>
  button:disabled,
  button.disabled,
  input:read-only {
    color: theme("colors.gray.500");
    background: theme("colors.gray.300");
  }

  input.error {
    background: theme("colors.red.300");
    border-color: theme("colors.red.500");
  }
</style>

<!-- <svelte:window on:beforeunload|preventDefault={handleBeforeUnload} /> -->

{#if $scores}
  <form on:submit|preventDefault={handleSubmit}>
    <div class="flex items-center sm:static sm:inset-auto sm:pr-0 space-x-4">
      {#if $applicant}
        {#each $scorings as { name, shortname, scoring }}
          <div class="flex flex-col space-y-2">
            <h3 class="text-white">{name}</h3>

            <div class="flex space-x-2">
              <!-- {#if 'min' in scorings && 'max' in scorings}
                <label class="relative w-full" for="{shortname}-score">
                  <div
                    class="icon absolute top-0 left-0 flex items-center ml-2 h-8
                    cursor-text">
                    <span class="text-sm text-tertiary-500">Scr:</span>
                  </div>

                  <input
                    id="{shortname}-score"
                    name={shortname}
                    class="w-20 border border-gray-400 text-secondary rounded
                    px-2 pl-10 py-1"
                    class:error={$errors[shortname]}
                    type="number"
                    readonly={$applicant.isFlagged || !canScore(shortname)}
                    step="1"
                    on:change={handleChange}
                    on:blur={handleChange}
                    bind:value={$form[shortname]} />
                </label>
              {:else} -->
              {#each Object.keys(scoring.get(shortname)) as key}
                <label class="relative w-full" for="{shortname}-{key}">
                  <div
                    class="icon absolute top-0 left-0 flex items-center ml-2 h-8
                    cursor-text">
                    <span class="text-sm text-tertiary-500">
                      {#if key === 'quality' || key === 'qlt' || key === 'qy'}
                        Qlt:
                      {:else if key === 'quantity' || key === 'qty' || key === 'qnt' || key === 'qt'}
                        Qty:
                      {:else}Scr:{/if}
                    </span>
                  </div>
                  <input
                    id="{shortname}-{key}"
                    name="{shortname}.{key}"
                    class="w-20 border border-gray-400 text-secondary rounded
                    px-2 pl-10 py-1"
                    class:error={$errors[shortname][key]}
                    type="number"
                    readonly={$applicant.isFlagged || !canScore(shortname)}
                    step="1"
                    on:change={handleChange}
                    on:blur={handleChange}
                    bind:value={$form[shortname][key]} />
                </label>
              {/each}
              <!-- {/if} -->
            </div>
          </div>
        {/each}

        <div class="flex space-x-2">
          <Flag disabled={$isSubmitting} />

          <button
            type="submit"
            class="w-24 bg-green-600 text-green-200 rounded shadow-button border
            border-transparent px-3 py-2 hover:bg-green-700"
            class:disabled={$applicant.isFlagged}
            disabled={$applicant.isFlagged || $isSubmitting}
            on:submit|preventDefault={handleSubmit}>
            {#if $isSubmitting}
              Saving
            {:else}{$applicant.isScored ? 'Update' : 'Save'}{/if}
          </button>
        </div>
      {/if}
    </div>
  </form>
{/if}
