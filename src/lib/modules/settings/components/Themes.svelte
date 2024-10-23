<script lang="ts">
  import { CORE_THEMES, theme$ } from "@/modules/theme";

  const themes = CORE_THEMES;
  const currentPaletteName = theme$.theme;

  const colors = ["red", "green", "blue", "cyan", "magenta", "yellow"] as const;
</script>

<div class="wrapper">
  {#each themes as theme}
    <button
      class="theme-card"
      style:--background={theme.background}
      style:--foreground={theme.foreground}
      class:active={$currentPaletteName === theme.name}
      on:click={() => theme$.theme.set(theme.name)}
    >
      <div class="circles">
        {#each colors as color}
          <div class="circle" style:--color={theme[color]} />
        {/each}
      </div>
      <span class="label">{theme.name}</span>
    </button>
  {/each}
</div>

<style lang="postcss">
  .circles {
    display: flex;
    gap: 2px;
  }
  .circle {
    --size: 16px;
    border-radius: 10em;
    background: var(--color);
    height: var(--size);
    width: var(--size);
  }
  .label {
    display: block;
    margin-top: 10px;
    font-size: 0.7rem;
    font-weight: bold;
    text-transform: uppercase;
  }
  .wrapper {
    display: flex;
    gap: 6px;
    overflow: auto;
  }
  .theme-card {
    background: var(--background);
    color: var(--foreground);
    font-size: 1rem;
    border: none;
    appearance: none;
    outline: none;
    margin: 0;
    padding: 10px;
    border-radius: var(--border-radius);
    border: 2px solid var(--color-black);
    cursor: pointer;
    white-space: nowrap;
    text-align: left;
    justify-content: flex-start;
    align-items: flex-start;

    &.active {
      border-color: var(--color-cyan);
    }
  }
</style>
