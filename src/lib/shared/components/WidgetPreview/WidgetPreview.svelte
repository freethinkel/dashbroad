<script lang="ts">
  import { compile } from "./compiler";
  import { SvelteComponent, onMount } from "svelte";

  export let code = "";

  let widgetEl: HTMLDivElement;
  let errorMessage = "";
  let component: SvelteComponent;

  const render = async (code: string) => {
    try {
      if (widgetEl) {
        widgetEl.innerHTML = "";
      }
      errorMessage = "";
      await compile(code).then(({ Component }) => {
        component = new Component({ target: widgetEl, props: { onMount } });
      });
    } catch (err: any) {
      console.log(err);
      errorMessage = err.message;
    }
  };

  $: render(code);
</script>

<div class="wrapper">
  <div class="widget" class:__hidden={component?.hidden} bind:this={widgetEl} />
  {#if errorMessage}
    <div class="error-message">{errorMessage}</div>
  {/if}
</div>

<style>
  .wrapper {
    height: 100%;
    animation: fix_rerender_styles infinite alternate 1s;
  }
  .widget {
    height: 100%;
  }
  .error-message {
    color: var(--color-error);
    font-size: 0.9rem;
    font-weight: bold;
  }

  @keyframes fix_rerender_styles {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.000001);
    }
  }
</style>
