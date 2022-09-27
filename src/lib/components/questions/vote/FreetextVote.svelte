<script lang="ts">
	import type { Freetext } from '$lib/supabase/types';
	import Fieldset from '$lib/components/inputs/Fieldset.svelte';
	import InvisibleInput from '$lib/components/inputs/InvisibleInput.svelte';
	import Legend from '$lib/components/inputs/Legend.svelte';
	import SubmitButton from '$lib/components/inputs/SubmitButton.svelte';
	import TextArea from '$lib/components/inputs/TextArea.svelte';
	export let question: Freetext;
</script>

<form method="POST" action="?/freetext">
	<Fieldset>
		<Legend>{question.text}</Legend>
		<InvisibleInput name="question_id" value={question.id} />
		<TextArea name={'input'} inlineText="svar" />
		<SubmitButton />
	</Fieldset>
</form>
