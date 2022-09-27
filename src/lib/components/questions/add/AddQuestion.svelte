<script lang="ts">
	import { fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Close from '$lib/components/icons/Close.svelte';
	import Plus from '$lib/components/icons/footer/Plus.svelte';
	import TextArea from '$lib/components/inputs/TextArea.svelte';

	export let action = '';
	export let type = '';
	let answers = ['', ''];
	let question = '';
	function addQuestion() {
		answers.push('');
		answers = answers;
	}
	function removeQuestion(index: number) {
		let newAnsw = [...answers.slice(0, index), ...answers.slice(index + 1, answers.length)];
		answers = newAnsw;
	}
</script>

<form class="form" method="POST" {action}>
	<TextArea name="question" value={question} inlineText="Spørsmål" />
	{#if type === 'binary' || type === 'multiple'}
		{#each answers as _, i}
			<label transition:fade={{ duration: 500, easing: quintOut }} for="answer{i}">
				<input type="text" name="answer{i}" bind:value={answers[i]} />
				<span class="number">{i + 1}</span>
				<button type="button" class="rm-btn" on:click|preventDefault={() => removeQuestion(i)}>
					<svelte:component this={Close} />
				</button>
			</label>
		{/each}
		<button type="button" class="add btn" on:click={addQuestion}>
			<svelte:component this={Plus} />
		</button>
	{/if}
	<button class="submit btn">Legg til</button>
</form>

<style>
	.submit {
		margin: 1rem 0;
	}
	.add {
		/* align-self: end; */
		height: 34px;
		padding: 0.5rem 0.5rem;
		margin: 1rem 0;
		border: 0;
		background-color: #fff;
	}
	.btn {
		border-radius: 1rem;
		padding: 0.5rem 1rem;
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
