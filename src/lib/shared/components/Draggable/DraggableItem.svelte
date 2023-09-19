<script lang="ts">
  let isDragging = false;
  let pos = { x: 0, y: 0 };
  let startPosition = { x: 0, y: 0 };
  let rect: DOMRect | null = null;

  let element: HTMLElement;

  const onMouseDown = (event: MouseEvent) => {
    startPosition = { x: event.pageX, y: event.pageY };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    rect = element.getBoundingClientRect();

    // element.style.position = "fixed";
    // element.style.zIndex = "10000";
    element.style.height = rect.height + "px";
    element.style.width = rect.width + "px";
  };

  const onMouseUp = (_: MouseEvent) => {
    pos = {
      x: 0,
      y: 0,
    };
    isDragging = false;
    element.style.transition = "0.3s transform";
    element.style.height = "";
    element.style.width = "";
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    setTimeout(() => {
      element.style.transition = "none";
      rect = null;
    }, 300);
  };

  const onMouseMove = (event: MouseEvent) => {
    isDragging = true;

    pos = {
      x: event.pageX,
      y: event.pageY,
    };
  };
</script>

{#if isDragging && rect}
  <div
    class="placeholder"
    style:height={rect.height + "px"}
    style:width={rect.width + "px"}
  />
{/if}

<div
  class="wrapper"
  bind:this={element}
  on:mousedown={onMouseDown}
  on:dragstart|preventDefault
  class:dragging={isDragging}
  style:--x={isDragging ? pos.x - startPosition.x + (rect?.left ?? 0) : 0}
  style:--y={isDragging ? pos.y - startPosition.y + (rect?.top ?? 0) : 0}
  draggable="false"
>
  <slot />
</div>

<style>
  .wrapper {
    transform: translate(calc(var(--x) * 1px), calc(var(--y) * 1px));
    user-select: none;
    -webkit-user-select: none;
  }
  .dragging {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
</style>
