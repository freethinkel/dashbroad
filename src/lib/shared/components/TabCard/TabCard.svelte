<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Icon } from "../Icon";

  export let active = false;
  export let icon = "";

  const dispatch = createEventDispatcher();
</script>

<button class="wrapper" class:active on:click={() => dispatch("click")}>
  <Icon name={icon} />
  <span class="text">
    <slot />
  </span>
</button>

<style lang="postcss">
  .wrapper {
    appearance: none;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    border-radius: var(--border-radius);
    padding: 6px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
    margin: 0;
    gap: 4px;
    color: var(--color-white);
    --size: 22px;
    --color: var(--color-foreground);

    &:hover,
    &.active {
      background: var(--color-blue);
      color: var(--color-background);
      --color: var(--color-background);
    }
  }
</style>
