<script lang="ts">
	import QuestionOverviewCard from '$lib/components/questions/presentation/QuestionOverviewCard.svelte';
	import type { Binary, Multiple, Rating, User } from '$lib/supabase/types';

	export let data: {
		questions: (Rating | Multiple | Binary)[];
		user: User;
	};
</script>

<div>
	{#each Object.values(data.questions) as question}
		<QuestionOverviewCard {question} />
	{/each}
</div>

<style>
	:root {
		--question-color: #d3d3d3;
	}
</style>
