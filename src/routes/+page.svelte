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
		<a href="/vote/{question.id}">
			<QuestionOverviewCard {question} />
		</a>
	{/each}
</div>

<style>
	:root {
		--question-color: #d3d3d3;
	}
	a {
		color: inherit;
	}
	a:active {
		text-decoration: none;
	}
</style>
