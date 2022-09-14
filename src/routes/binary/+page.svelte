<script lang="ts">
	let colors = [
		'#f200ff',
		'#f200ff',
		'#f200ff',
		'#ff00d4',
		'#ff00d4',
		'#ff00d4',
		'#ff00ad',
		'#ff00ad',
		'#ff00ad',
		'#ff408d',
		'#ff408d',
		'#ff408d',
		'#ff6775',
		'#ff6775',
		'#ff6775',
		'#ff8666',
		'#ff8666',
		'#ff8666',
		'#ffa063',
		'#ffa063',
		'#ffa063',
		'#ffb56b',
		'#ffb56b',
		'#ffb56b'
	];

	setInterval(() => {
		if (colors.length > 0) {
			const [first, ...rest] = colors;
			colors = [...rest, first];
		}
	}, 40);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="center" style="--gradient-colors: {colors.join(', ')}">
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
		align-self: center;
	}
	fieldset {
		border: none;
	}
	legend {
		text-align: center;
		font-size: larger;
	}
	fieldset > div > label {
		display: block;
		margin: 1rem 0rem;
		padding: 1rem 0.5rem;
		background-color: white;
		border-radius: 1rem;
		text-align: center;
	}
	fieldset > div > input[type='radio'] {
		opacity: 0;
		position: fixed;
		width: 0;
	}
	fieldset input[type='radio']:focus + label {
	}
	fieldset input[type='radio']:checked + label {
		/* color: #ffb56b; */
		font-weight: 700;
		color: #fff;
	}
	fieldset input[type='radio']:checked + label {
		/* color: #ffb56b; */
		background: conic-gradient(var(--gradient-colors), var(--gradient-colors));
	}
</style>
