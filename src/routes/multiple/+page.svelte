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
		<legend>Answer multiple questions</legend>
		<label class="container" for="yes">
			<input type="checkbox" id="yes" name="binary" />
			<span class="checkmark" />
			Yes
		</label>

		<label class="container" for="no">
			<input type="checkbox" id="no" name="binary" />
			No
			<span class="checkmark" />
		</label>
	</fieldset>
</div>

<style>
	.container {
		display: block;
		position: relative;
		padding-left: 50px;
		padding-top: 12px;
		padding-bottom: 12px;
		margin-bottom: 12px;
		cursor: pointer;
		font-size: 22px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;

		background-color: white;
		border-radius: 1rem;
	}

	/* Create a custom checkbox */
	.checkmark {
		position: absolute;
		left: 10px;
		height: 25px;
		width: 25px;
		background-color: #eee;
	}
	/* On mouse-over, add a grey background color */
	.container:hover input ~ .checkmark {
		background-color: #ccc;
	}

	/* When the checkbox is checked, add a blue background */
	.container input:checked ~ .checkmark {
		background: conic-gradient(var(--gradient-colors), var(--gradient-colors));
	}

	/* Create the checkmark/indicator (hidden when not checked) */
	.checkmark:after {
		content: '';
		position: absolute;
		display: none;
	}

	/* Show the checkmark when checked */
	.container input:checked ~ .checkmark:after {
		display: block;
	}

	/* Style the checkmark/indicator */
	.container .checkmark:after {
		left: 9px;
		top: 5px;
		width: 5px;
		height: 10px;
		border: solid white;
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
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

	input[type='checkbox'] {
		opacity: 0;
		position: fixed;
		width: 0;
	}
</style>
