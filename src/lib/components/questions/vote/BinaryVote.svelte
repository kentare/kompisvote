<script lang="ts">
	import type { Binary } from '$lib/supabase/types';
	import BoxInput from '$lib/components/inputs/BoxInput.svelte';
	import Fieldset from '$lib/components/inputs/Fieldset.svelte';
	import InvisibleInput from '$lib/components/inputs/InvisibleInput.svelte';
	import Legend from '$lib/components/inputs/Legend.svelte';
	import SubmitButton from '$lib/components/inputs/SubmitButton.svelte';
	export let question: Binary;
</script>

<form method="POST" action="?/binary">
	<Fieldset>
		<Legend>{question.text}</Legend>
		<InvisibleInput name="question_id" value={question.id} />
		{#if question.possible_answer}
			{#each question.possible_answer as possible_answer}
				<BoxInput id={possible_answer.id.toString()} name={'input'} type="radio">
					{possible_answer.text}
				</BoxInput>
			{/each}
		{:else}
			For some reason this question does not have answers
		{/if}
		<SubmitButton />
	</Fieldset>
</form>
