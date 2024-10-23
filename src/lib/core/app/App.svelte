<script lang="ts">
  import { Header } from "@/modules/header";
  import { settings$, SettingsView } from "@/modules/settings";
  import { PluginsList } from "@/modules/plugins";

  const isSettingsOpened = settings$.isSettingsOpened;
</script>

<Header />
{#if $isSettingsOpened}
  <SettingsView />
{:else}
  <PluginsList />
{/if}
