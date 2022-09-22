<script lang="ts">
	import type { Question } from '$lib/supabase/types';

	export let data: Question[];
</script>

{#each Object.values(data) as question}
	<a href="/vote/{question.id}" class="boxed">{question.text}</a>
{/each}
