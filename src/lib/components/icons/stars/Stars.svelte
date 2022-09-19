<script>
	import Full from './Full.svelte';
	import Half from './Half.svelte';
	import Empty from './Empty.svelte';

	export let average;

	// Used to calculate what star to use
	const newAverage = Math.round(average / 2 / 0.5) * 0.5;
</script>

<div>
	{#each Array(5) as _, i}
		<span style="--currentColor: #ffb56b">
			{#if newAverage - i > 0.5}
				<svelte:component this={Full} />
			{:else if newAverage - i <= 0.5 && newAverage - i > 0}
				<svelte:component this={Half} />
			{:else}
				<svelte:component this={Empty} />
			{/if}
		</span>
	{/each}
</div>

<style>
	:root {
		--currentColor: yello;
	}
	div {
		display: flex;
		height: 32px;
	}
	span {
		color: var(--currentColor);
		height: 32px;
		width: 32px;
		display: block;
	}
</style>
