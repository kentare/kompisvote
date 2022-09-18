<script lang="ts">
	import data from '../data/data.json';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div>
	{#each data.questions as question}
		<div class="card">
			<div>{question.question}</div>
			{#if question.type === 'multiple'}
				<div>{question.answers.join(', ')}</div>
			{:else}
				<div>{question.answers.join(', ')}</div>
			{/if}

			{#if question.type !== 'rating'}
				{#each question.possibleAnswers as possible}
					<div class:active={question.possibleAnswers[0] == possible}>
						<h2>{possible}</h2>
						<div class="barline" style="--barlength: 50%;">
							<div class="barwrapper">
								<div class="bar" />
								<span>68%</span>
							</div>
							<div class="votes">
								<span>{question.answers.filter((data) => data === possible).length}</span>
								<span>votes</span>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	{/each}
</div>

<style>
	:root {
		--question-color: #d3d3d3;
	}
	.barwrapper {
		width: 60%;
		display: flex;
		gap: 4px;
		position: relative;
	}
	.card {
		padding: 0.5rem 1rem;
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
		display: flex;
		padding: 0 1rem;
		width: var(--barlength);

		justify-content: space-between;
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
