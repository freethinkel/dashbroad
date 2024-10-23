<script>
  import { Button } from "@/shared/components/Button";
  import { Icon } from "@/shared/components/Icon";
  import { settings$ } from "@/modules/settings";

  const isPinned = settings$.isPinned;
  const isSettingsOpened = settings$.isSettingsOpened;
</script>

<header>
  <div class="controls">
    <Button
      kind="icon"
      active={$isPinned}
      on:click={() => settings$.togglePinned()}
    >
      <Icon name={$isPinned ? "pinned" : "pinned-off"} />
    </Button>
    <Button
      kind="icon"
      active={$isSettingsOpened}
      on:click={() => settings$.toggleSettingsPage()}
    >
      <Icon name="settings" />
    </Button>
  </div>
</header>

<style lang="postcss">
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    padding: 4px;
    z-index: 100;

    --size: 16px;
  }
  .controls {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 4px;
    opacity: 0;
    transition: 0.1s;

    &:hover {
      opacity: 1;
    }
  }
</style>
