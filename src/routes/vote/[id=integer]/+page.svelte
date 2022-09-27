<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import DeleteButton from '$lib/components/inputs/DeleteButton.svelte';
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

{#if data.type?.name}
	{#if data.type.name === 'rating'}
		<Rating question={data} />{/if}
	{#if data.type.name === 'binary'}
		<Binary question={data} />{/if}
	{#if data.type.name === 'multiple'}
		<Multiple question={data} />
	{/if}

	{#if data.user.id === $page.data.logged_in_user.id}
		<DeleteButton question_id={data.id} question_text={data.text} />
	{/if}
{:else}
	Nothing to see here
{/if}
