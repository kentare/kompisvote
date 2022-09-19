<script>
	import { fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Close from '$lib/components/icons/Close.svelte';
	let answers = ['', ''];
	let question = '';
	function addQuestion() {
		answers.push('');
		answers = answers;
	}
	function removeQuestion(index) {
		let newAnsw = [...answers.slice(0, index), ...answers.slice(index + 1, answers.length)];
		answers = newAnsw;
	}
</script>

<div class="wrapper">
	<form class="form">
		<label class="question" for="question">
			<textarea rows="4" name="question" type="text" bind:value={question} />
			<span class="questiontext">Question</span>
		</label>
		{#each answers as _, i}
			<label transition:fade={{ duration: 500, easing: quintOut }} for="answer{i}">
				<input type="text" bind:value={answers[i]} />
				<span class="number">{i + 1}</span>
				<button type="button" class="rm-btn" on:click|preventDefault={() => removeQuestion(i)}>
					<svelte:component this={Close} />
				</button>
			</label>
		{/each}
	</form>
	<button type="button" class="add-btn" on:click={addQuestion}> Add question </button>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
	}
	.add-btn {
		flex: 1;
		margin: 0.5rem 1rem;
		padding: 0.5rem 1rem;
		border-radius: 1rem;
		border: 0;
		background-color: #fff;
	}
	span {
		opacity: 0.3;
	}
	.number {
		display: block;
		position: absolute;
		left: 16px;
		top: 24%;
	}
	.question {
		display: flex;
		flex-direction: column;
	}
	.questiontext {
		position: absolute;
		left: 10px;
		top: 10px;
	}
	.form {
		display: flex;
		margin: 1rem;
		flex-direction: column;
		align-items: stretch;
		align-content: stretch;
		flex-grow: 1;
	}
	.rm-btn {
		background: none;
		border: 0;
		height: 30px;
		color: red;
		position: absolute;
		top: 10%;
		right: 0px;
	}
	label {
		margin-top: 1.1rem;
		position: relative;
		display: flex;
	}

	input,
	textarea {
		border-radius: 1rem;
		border: 0;
		padding: 0.5rem 1rem;
	}

	textarea {
		padding-top: 2rem;
	}

	input {
		flex: 1;
		padding-left: 2rem;
	}
</style>
