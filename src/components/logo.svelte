<script>
  export let colour = "cmyk";
  export let orientation = "vertical";

  if (!["cmyk", "black", "white"].includes(colour)) {
    colour = "cmyk";
  }

  if (["horizontal", "vertical"].includes(orientation)) {
    orientation = "vertical";
  }
</script>

<figure>
  <img
    src={`/images/uottawa_${orientation}_${colour}.svg`}
    alt="uOttawa Logo" />
</figure>
