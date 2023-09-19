<script lang="ts">
  import { compile } from "./compiler";
  import { onMount } from "svelte";

  export let code = "";

  let widgetEl: HTMLDivElement;
  let errorMessage = "";

  const render = async (code: string) => {
    try {
      if (widgetEl) {
        widgetEl.innerHTML = "";
      }
      errorMessage = "";
      await compile(code).then(({ Component }) => {
        new Component({ target: widgetEl, props: { onMount } });
      });
    } catch (err: any) {
      console.log(err);
      errorMessage = err.message;
    }
  };

  $: render(code);
</script>

<div class="wrapper">
  <div class="widget" bind:this={widgetEl} />
  {#if errorMessage}
    <div class="error-message">{errorMessage}</div>
  {/if}
</div>

<style>
  .wrapper {
    overflow: hidden;
    height: 100%;
  }
  .widget {
    height: 100%;
  }
  .error-message {
    color: var(--color-error);
  }
</style>
