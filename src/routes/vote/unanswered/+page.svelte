<script lang="ts">
	import data from '../../../data/data.json';
</script>

{#each data.questions as question}
	<a href="/vote/{question.id}" class="boxed">{question.question}</a>
{/each}
