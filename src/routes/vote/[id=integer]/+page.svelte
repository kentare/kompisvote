<script lang="ts">
	import { goto } from '$app/navigation';
	import Binary from '$lib/components/questions/vote/BinaryVote.svelte';
	import Multiple from '$lib/components/questions/vote/MultipleVote.svelte';
	import Rating from '$lib/components/questions/vote/RatingVote.svelte';
	import { onMount } from 'svelte';
	import type { VoteFormResult, VoteLoadResult } from './+page.server';

	export let data: VoteLoadResult;

	export let form: VoteFormResult;
	onMount(() => {
		if (form?.success) {
			goto(`/`);
		}
	});
</script>

{#if data.type.name === 'rating'}
	<Rating question={data} />{/if}
{#if data.type.name === 'binary'}
	<Binary question={data} />{/if}
{#if data.type.name === 'multiple'}
	<Multiple question={data} />
{/if}
