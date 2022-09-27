<script lang="ts">
	export let name: string;
	export let inlineText: string;
	export let value = '';
</script>

<label for={name}>
	<textarea rows="4" {name} {value} type="text" />
	<span class="text">{inlineText}</span>
</label>

<style>
	label {
		display: flex;
		flex-direction: column;
	}
	.text {
		position: absolute;
		left: 10px;
		top: 10px;
	}
	label {
		margin-top: 1.1rem;
		position: relative;
		display: flex;
	}

	textarea {
		border-radius: 1rem;
		border: 0;
		padding: 0.5rem 1rem;
		font-size: 1rem;
	}

	span {
		opacity: 0.3;
	}

	textarea {
		padding-top: 2rem;
	}
</style>
