<script>
  import { Card } from "@/shared/components/Card";
  import { plugins$ } from "@/modules/plugins";

  import { WidgetPreview } from "@/shared/components/WidgetPreview";

  const plugins = plugins$.plugins;
</script>

<main class="container">
  {#each $plugins as plugin}
    <Card>
      <WidgetPreview code={plugin.source} />
    </Card>
  {/each}
</main>

<style>
  .container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: auto;
    height: 100%;
  }
</style>
