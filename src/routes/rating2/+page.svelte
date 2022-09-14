<script lang="ts">
	let value = 5;
	let numleft = '35%';
	let numbottom = '-0%';

	const onChange = (
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		value = Number(event.currentTarget.value);
		if (value < 10) {
			numleft = '35%';
			numbottom = '-0%';
		} else {
			numleft = '18%';
			numbottom = '4%';
		}
		//  rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="outer-wrapper">
	<h1>På en skala på 1 til 10: Hvor nice ass har Ole?</h1>
	<div class="center" style="--gradient-colors: {[].join(', ')}">
		<div class="wrapper">
			<input
				type="range"
				style="--text: '{value}'; --numleft: {numleft}; --numbottom: {numbottom}"
				on:change={onChange}
				on:touchmove={onChange}
				min="1"
				max="10"
				{value}
			/>
			<span class="showValue">{value}</span>
		</div>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		justify-content: center;
	}

	@media (max-width: 576px) {
		.showValue {
			display: none;
		}
		:root {
			--text: '5';
			--thumbthick: 5vh;
			--numleft: 28%;
			--numbottom: -14%;
		}

		.center {
			width: 100%;
			height: 90vw;
		}
		.wrapper {
			position: relative;
		}

		input[type='range'] {
			-webkit-appearance: none;
			background: transparent;
			transform: rotate(270deg);
			transform-origin: center;
		}

		input[type='range'] {
			-webkit-appearance: none;
			margin: 48px 0;
			width: 90vw;
		}
		input[type='range']:focus {
			outline: none;
		}
		input[type='range']::-webkit-slider-runnable-track {
			width: 100%;
			height: 65vw;
			cursor: pointer;
			background: linear-gradient(0deg, var(--gradient-colors));
			border-radius: 1.3px;
			border: 2px solid #fff;
		}
		input[type='range']::before {
			content: var(--text);
			transform: rotate(90deg);
			transform-origin: center;
			font-size: 25ch;
			left: var(--numleft);
			bottom: var(--numbottom);
			color: white;
			position: absolute;
		}
		input[type='range']::-webkit-slider-thumb {
			border: 1px solid #000000;
			position: relative;
			height: 70vw;
			margin-top: -11px;
			width: var(--thumbthick);
			border-radius: 3px;
			background: #ffffff;
			cursor: pointer;
			-webkit-appearance: none;
		}
		input[type='range']:focus::-webkit-slider-runnable-track {
			background: #367ebd;
		}
		input[type='range']::-moz-range-track {
			width: 100%;
			height: 65vw;
			cursor: pointer;
			box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
			background: #3071a9;
			border-radius: 1.3px;
			border: 0.2px solid #010101;
		}
		input[type='range']::-moz-range-thumb {
			box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
			border: 1px solid #000000;
			height: 70vw;
			width: var(--thumbthick);
			border-radius: 3px;
			background: #ffffff;
			cursor: pointer;
		}
		input[type='range']::-ms-track {
			width: 100%;
			height: 65vw;
			cursor: pointer;
			background: transparent;
			border-color: transparent;
			border-width: 16px 0;
			color: transparent;
		}
		input[type='range']::-ms-fill-lower {
			background: #2a6495;
			border: 0.2px solid #010101;
			border-radius: 2.6px;
			box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
		}
		input[type='range']::-ms-fill-upper {
			background: #3071a9;
			border: 0.2px solid #010101;
			border-radius: 2.6px;
			box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
		}
		input[type='range']::-ms-thumb {
			box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
			border: 1px solid #000000;
			height: 70vw;
			width: var(--thumbthick);
			border-radius: 3px;
			background: #ffffff;
			cursor: pointer;
		}
		input[type='range']:focus::-ms-fill-lower {
			background: #3071a9;
		}
		input[type='range']:focus::-ms-fill-upper {
			background: #367ebd;
		}
	}
</style>
