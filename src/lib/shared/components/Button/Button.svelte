<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let type: "button" | "submit" = "button";
  export let kind: "default" | "icon" = "default";
  export let active = false;

  const dispatch = createEventDispatcher();
</script>

<button
  class="kind__{kind}"
  class:active
  {type}
  on:click={() => dispatch("click")}
>
  <slot />
</button>

<style lang="postcss">
  button {
    appearance: none;
    border: none;
    background: transparent;
    font-size: 1rem;
    padding: 6px 10px;
    cursor: pointer;
    outline: none;
    border-radius: var(--border-radius);
    margin: 0;
    display: flex;
    align-items: center;

    &:hover {
      background: var(--color-blue);
      color: var(--color-background);
    }
  }
  .active {
    background: var(--color-blue);
    color: var(--color-background);
  }
  .kind {
    &__icon {
      height: 28px;
      width: 28px;
      padding: 4px;
      justify-content: center;
    }
  }
</style>
