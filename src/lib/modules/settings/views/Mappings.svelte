<script lang="ts">
  import { ShortcutRecorder } from "@/shared/components/ShortcutRecorder";
  import { settings$ } from "..";
  import { Label } from "@/shared/components/Label";

  const actionMapping = settings$.activationMapping;
</script>

<div class="wrapper">
  <div class="form-field">
    <Label>Activation hotkey</Label>
    <ShortcutRecorder
      keys={$actionMapping}
      on:record={({ detail }) => settings$.setActivationMapping(detail)}
    />
  </div>
</div>
