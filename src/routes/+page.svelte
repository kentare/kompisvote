<script lang="ts">
	import data from '../data/data.json';
	import Stars from '$lib/stars/stars.svelte';
	function getMostFrequent(arr) {
		const hashmap = arr.reduce((acc, val) => {
			acc[val] = (acc[val] || 0) + 1;
			return acc;
		}, {});
		return Object.keys(hashmap).reduce((a, b) => (hashmap[a] > hashmap[b] ? a : b));
	}

	const questions = data.questions.map((q) => {
		return {
			...q,
			average:
				q.type === 'rating'
					? q.answers.reduce((a, b) => {
							return a + b;
					  }, 0) / q.answers.length
					: '',
			winner: getMostFrequent(q.answers.flat()),
			possibleAnswers: q.possibleAnswers.map((pos) => {
				return {
					answer: pos,
					percent: Math.round(
						(q.answers.flat().filter((answer) => pos == answer).length / q.answers.flat().length) *
							100
					),
					count: q.answers.flat().filter((answer) => pos == answer).length
				};
			})
		};
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div>
	{#each questions as question}
		<div class="card">
			<div class="question">{question.question}</div>
			{#if question.type === 'rating'}
				<div class="stars">
					<Stars average={question.average} />
					<div>{question.average?.toFixed(2)} / 10</div>
				</div>
			{/if}

			{#if question.type !== 'rating'}
				{#each question.possibleAnswers as possible}
					{#if question.answers.flat().find((data) => data == possible.answer)}
						<div class:active={question.winner == possible.answer}>
							<h3>{possible.answer}</h3>
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
					{/if}
				{/each}
			{/if}
		</div>
	{/each}
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
