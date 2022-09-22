<script lang="ts">
	export let type: 'radio' | 'checkbox' = 'radio';
	export let id: string;
</script>

<label class="container" for={id}>
	<input {type} {id} name="input" />
	<span class={type} />
	<slot />
</label>

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
	.center {
		align-self: center;
	}

	/* Create a custom checkbox/radio */
	.radio,
	.checkbox {
		position: absolute;
		left: 10px;
		height: 25px;
		width: 25px;
		background-color: #eee;
	}

	.radio {
		border-radius: 100%;
	}

	/* On mouse-over, add a grey background color */
	.container:hover input ~ .radio,
	.container:hover input ~ .checkbox {
		background-color: #ccc;
	}

	/* Checked */
	.container input:checked ~ .radio,
	.container input:checked ~ .checkbox {
		background: conic-gradient(var(--gradient-colors), var(--gradient-colors));
		animation-name: spin;
		animation-duration: 0.65s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Create the checkmark/indicator (hidden when not checked) */
	.radio:after,
	.checkbox:after {
		content: '';
		position: absolute;
		display: none;
	}

	/* Show the checkmark when checked */
	.container input:checked ~ .radio:after,
	.container input:checked ~ .checkbox:after {
		display: block;
	}
	/* Style the checkmark/indicator */
	.container .radio:after,
	.container .checkbox:after {
	}

	input[type='radio'] {
		opacity: 0;
		position: fixed;
		width: 0;
	}

	input[type='checkbox'] {
		opacity: 0;
		position: fixed;
		width: 0;
	}
</style>
