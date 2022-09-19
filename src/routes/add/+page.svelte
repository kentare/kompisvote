<script>
	let numberOfQuestions = 1;
	function addQuestion() {
		numberOfQuestions++;
	}
</script>

<form>
	<label for="question">Question</label>
	<textarea rows="4" cols="50" name="question" type="text" />
	{#each Array(numberOfQuestions) as _, i}
		<label for="answer{i}">Answer {i + 1}</label>
		<input type="text" />
	{/each}
</form>
<button on:click={addQuestion}> Add question </button>
