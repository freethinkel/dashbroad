<div class="card">
  <slot />
</div>

<style lang="postcss">
  .card {
    padding: 4px;
    border-radius: calc(var(--border-radius) * 1);
    background: var(--color-black);
    overflow: hidden;
  }
  .card:has(.wrapper > .widget.__hidden) {
    display: none;
  }
</style>
