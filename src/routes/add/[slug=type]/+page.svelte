<script lang="ts">
	import AddQuestion from '$lib/components/questions/add/AddQuestion.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { FormResult } from './+page.server';
	let type = $page.url.pathname.split('/').pop();
	export let form: FormResult;
	onMount(() => {
		if (form?.success) {
			goto(`/vote/${form.id}`);
		}
	});
</script>

<div class="wrapper">
	{#if type === 'binary'}
		<div class="info">Flervalgsspørsmål med <strong>ett</strong> svar</div>
		<AddQuestion action="?/binary" type="binary" />
	{/if}
	{#if type === 'multiple'}
		<div class="info">Flervalgsspørsmål med <strong>flere</strong> svar</div>
		<AddQuestion action="?/multiple" type="multiple" />
	{/if}
	{#if type === 'rating'}
		<div class="info">Spørsmål som rates fra <strong>1 - 10</strong></div>
		<AddQuestion action="?/rating" type="rating" />
	{/if}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
	}
	.info {
		text-align: center;
		background-color: white;
		padding: 1rem 1rem;
	}
</style>
