<script lang="ts">
	import './fonts/tabler-icons.min.css';
	export let name = '';
</script>

<span class="icon ti ti-{name}" />

<style lang="postcss">
	.icon {
		font-size: var(--size, 24px);
		color: var(--color, inherit);
	}
</style>
