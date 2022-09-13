<script lang="ts">
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="center">
	<fieldset>
		<legend>Do you want to hear a question?</legend>
		<div>
			<input type="radio" id="yes" name="binary" />
			<label for="yes">Yes</label>
		</div>
		<div>
			<input type="radio" id="no" name="binary" />
			<label for="no">No</label>
		</div>
	</fieldset>
</div>

<style>
	.center {
	}
	fieldset {
		border: none;
	}
	fieldset > div {
		margin: 1rem 0rem;
		padding: 1rem 0.5rem;
		background-color: white;
		border-radius: 1rem;
	}
	fieldset > div > input[type='radio'] {
		opacity: 0;
		position: fixed;
		width: 0;
	}
</style>
