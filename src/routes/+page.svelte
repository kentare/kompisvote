<script lang="ts">
	import QuestionOverviewCard from '$lib/components/questions/presentation/QuestionOverviewCard.svelte';
	import type { Binary, Multiple, Rating } from '$lib/supabase/types';

	export let data: (Rating | Multiple | Binary)[];
</script>

<div>
	{#each Object.values(data) as question}
		<QuestionOverviewCard {question} />
	{/each}
</div>

<style>
	:root {
		--question-color: #d3d3d3;
	}
</style>
