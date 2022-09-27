<script lang="ts">
	import Delete from '../icons/Delete.svelte';
	import InvisibleInput from './InvisibleInput.svelte';

	export let question_id: number;
	export let question_text: string;

	function onSubmit(event: SubmitEvent) {
		let confirmed = confirm(
			`Du holder på å slette spørsmålet: ${question_text}.\n Denne handlingen er permanent, vennligst bekreft.`
		);
		if (!confirmed) {
			event.preventDefault();
		}
	}
</script>

<form method="POST" action="?/delete" on:submit={onSubmit}>
	<InvisibleInput name="question_id" value={question_id} />
	<button> <Delete /> </button>
</form>

<style>
	button {
		--size: 40px;
		position: absolute;
		right: 10px;
		top: 10px;
		height: var(--size);
		width: var(--size);
		background: none;
		border: 2px solid;
		border-radius: 100%;
		color: white;
	}
</style>
