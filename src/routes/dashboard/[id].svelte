<script context="module">
  import { applicant, scorings, scores } from "stores";
  import { isEmpty } from "utils/object";

  export async function preload({ params }, session) {
    const { id } = params;
    const map = new Map();

    // Verify reference number in list.
    let { ok, data = {}, message = "" } = await this.fetch(
      `/api/applicants/${id}`
    ).then((res) => res.json());

    if (!ok) {
      console.log({ message });
      this.error(500, `Applicant request failed: ${message}`);
    }

    if (isEmpty(data)) {
      return this.error(
        404,
        `Applicant with reference number ${id} not found.`
      );
    }

    map.set(
      "scores",
      data.scores.reduce(
        (acc, { shortname, score }) =>
          (acc = { ...acc, [shortname]: Object.fromEntries(score) }),
        {}
      )
    );

    data.scores = data.scores.map((score) => {
      score.score = new Map(score.score);

      return score;
    });

    // Get last file path
    let url;
    ({ ok, url } = await this.fetch(
      `/pdfs/${session.cycle.year}/unzipped/${data.files.reduce(
        (_file, { path }) => path,
        ""
      )}`
    ));

    data.pdf = ok && url.includes(data.reference_number) ? url : null;

    applicant.set(data);

    const groupId = data.group_id;
    ({ ok, data = [], message = "" } = await this.fetch(
      `/api/scores/${groupId}`
    ).then((res) => res.json()));

    if (!ok) {
      console.log({ message });
    } else {
      data = data.map((datium) => {
        datium.scoring = new Map(datium.scoring);

        return datium;
      });

      scorings.set(data);

      map.set(
        "scorings",
        data.reduce((acc, { shortname, scoring }) => {
          let score = {};
          for (const [key, value] of Object.entries(scoring.get(shortname))) {
            score = { ...score, [key]: value.min };
          }

          return (acc = { ...acc, [shortname]: score });
        }, {})
      );

      scores.set({ ...map.get("scorings"), ...map.get("scores") });
    }
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import { store, applicants } from "stores";

  const { page, session, preloading } = stores();
  const { segment } = store({ page, session });

  $: firstApplicant = $applicants.find(
    (applicant) => !applicant.isScored && !applicant.isFlagged
  );
</script>

{#if $preloading}
  <div
    class="flex flex-col text-center justify-center items-center w-0 flex-1 overflow-hidden">
    <div
      class="flex flex-col w-full text-center items-center justify-center space-y-2 px-8">
      <h3 class="text-3xl mt-16 loading">Loading</h3>
    </div>
  </div>
{:else if $applicant}
  <div class="flex flex-col w-0 flex-1 overflow-hidden">
    <div
      class="flex flex-col flex-1 relative z-0 overflow-y-auto focus:outline-none">
      {#if $applicant.pdf}
        <object
          class="min-h-64"
          aria-label="pdf"
          data={$applicant.pdf}
          type="application/pdf"
          width="100%"
          height="100%">
          <div class="h-full flex flex-col justify-center items-center">
            <p>
              Unable to view embedded PDF on this device. You will need to
              download the PDF to view.
            </p>
            <a
              class="text-2xl text-secondary-500 font-heading font-bold
              hover:text-secondary-600"
              href="#{$applicant.pdf}"
              download="{$applicant.pdf}s">
              Download PDF
            </a>
          </div>
        </object>
      {:else}
        <div
          class="flex flex-col w-full text-center items-center justify-center space-y-2 px-8">
          <h3 class="text-3xl mt-16">No Document found.</h3>
          <p>
            Unable to find documents for the applicants with the reference
            number
            {$segment}. Please contact the system administrators for further
            assistance.
          </p>
        </div>
      {/if}
    </div>
  </div>
{:else}
  <div class="flex flex-col w-0 flex-1 overflow-hidden">
    <div
      class="flex flex-col flex-1 relative z-0 overflow-y-auto focus:outline-none">
      <div class="h-full flex flex-col items-center space-y-2">
        <div class="flex w-full items-center justify-center -mt-32">
          <h3 class="text-3xl mt-16">
            No Applicants found for reference number
            {$segment}.
          </h3>

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
      </div>
    </div>
  </div>
{/if}
