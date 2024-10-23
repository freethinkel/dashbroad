<script>
  import { TabCard } from "@/shared/components/TabCard";
  import General from "./General.svelte";
  import Mappings from "./Mappings.svelte";

  const tabs = [
    {
      key: "general",
      icon: "settings",
      label: "General",
    },
    {
      key: "mappings",
      icon: "keyboard",
      label: "Mappings",
    },
  ];

  let activeTab = tabs[0].key;
</script>

<div class="wrapper">
  <div class="tabs">
    {#each tabs as tab}
      <TabCard
        on:click={() => (activeTab = tab.key)}
        active={activeTab === tab.key}
        icon={tab.icon}
      >
        {tab.label}
      </TabCard>
    {/each}
  </div>
  <div class="body">
    {#if activeTab === "general"}
      <General />
    {:else if activeTab === "mappings"}
      <Mappings />
    {/if}
  </div>
</div>

<style>
  .tabs {
    display: flex;
    justify-content: center;
    gap: 6px;
    border-bottom: 1px solid var(--color-black);
    padding: 10px;
  }
  .body {
    padding: 10px;
  }
</style>
