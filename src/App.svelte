<script lang="ts">
  import Card from "@/shared/components/Card.svelte";
  import { loadPlugins } from "@/modules/plugins";
  import { onMount } from "svelte";
  import WidgetPreview from "@/shared/components/WidgetPreview/WidgetPreview.svelte";
  import { Header } from "@/modules/header";

  let plugins: string[] = [];

  onMount(async () => {
    plugins = await loadPlugins();
  });
</script>

<Header />
<main class="container">
  {#each plugins as plugin}
    <Card>
      <WidgetPreview code={plugin} />
    </Card>
  {/each}
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
  <Card>Tes</Card>
</main>

<style>
  .container {
    margin: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
