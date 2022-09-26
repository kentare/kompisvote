<script lang="ts">
	import { calculateAnswersForQuestions, getAverage } from '$lib/calculations/answer';
	import Stars from '$lib/components/icons/stars/Stars.svelte';
	import type { Binary, Multiple, QuestionStructuredOverview, Rating } from '$lib/supabase/types';
	export let question: Rating | Multiple | Binary;

	let filtered: (Rating | Multiple | Binary) & {
		average?: number;
		filtered_question?: QuestionStructuredOverview[];
	};
	if (question.type.name === 'rating') {
		filtered = {
			...question,
			average: getAverage(question.answer! ?? [])
		};
	} else {
		filtered = {
			...question,
			filtered_question: calculateAnswersForQuestions(question) ?? []
		};
	}
</script>

<div class="card">
	<div class="question">{filtered.text}</div>
	{#if filtered.type.name === 'rating'}
		<div class="stars">
			<Stars average={filtered.average} />
			<div>{filtered.average?.toFixed(2)} / 10</div>
		</div>
	{/if}

	{#if filtered.type.name !== 'rating'}
		{#if filtered.filtered_question}
			{#each filtered.filtered_question as possible}
				<div class:active={possible.winner}>
					<h3>{possible.text}</h3>
					<div class="barline" style="--barlength: {possible.percent}%;">
						<div class="barwrapper">
							<div class="bar">
								<span class="percent">{possible.percent}%</span>
							</div>
						</div>
						<div class="votes">
							<span>{possible.count}</span>
							<span>votes</span>
						</div>
					</div>
				</div>
			{/each}
		{/if}
	{/if}
</div>

<style>
	:root {
		--question-color: #d3d3d3;
	}
	.question {
		font-size: 1.2rem;
		color: var(--heading-color);
		padding-top: 10px;
	}
	.stars {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	h3 {
		font-size: 1rem;

		color: var(--question-color);
	}
	.barwrapper {
		width: 60%;
		display: flex;
		gap: 4px;
		position: relative;
	}
	.card {
		padding: 1.2rem 1rem;
		background-color: #fff;
		margin: 1rem 1rem;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
	}

	.active {
		--question-color: #ffa063;
		color: var(--question-color);
	}

	.card > div {
		padding: 0.5rem 0rem;
	}
	/* LOADING BAR */
	.bar {
		height: 30px;
		background-color: var(--question-color);
		width: calc(var(--barlength) + 10%);
		position: relative;
		margin-right: 35px;
	}
	.barwrapper {
		flex: 1;
		max-width: 80%;
	}
	.percent {
		position: absolute;
		right: -35px;
		top: 25%;
	}
	.barline span,
	.barwrapper span {
		display: flex;
		align-items: center;
		color: var(--question-color);
	}
	.votes {
		display: flex;
		align-items: center;
		flex-direction: column;
		color: var(--question-color);
		margin-left: auto;
	}
	.votes span:first-child {
		display: block;
		font-size: 12px;
	}
	.barline {
		display: flex;
		gap: 5px;
	}
</style>
