<script lang="ts">
	import type { Binary } from '$lib/supabase/types';
	import BoxInput from '../inputs/BoxInput.svelte';
	import Fieldset from '../inputs/Fieldset.svelte';
	import Legend from '../inputs/Legend.svelte';
	import SubmitButton from '../inputs/SubmitButton.svelte';

	export let question: Binary;
</script>

<form>
	<Fieldset>
		<Legend>{question.text}</Legend>
		{#each question.possible_answer as possible_answer}
			<BoxInput id="answer,{possible_answer.id}" type="radio">
				{possible_answer.text}
			</BoxInput>
		{/each}
		<SubmitButton />
	</Fieldset>
</form>
