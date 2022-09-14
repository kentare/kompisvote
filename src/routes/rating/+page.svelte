<script lang="ts">
	import { onMount } from 'svelte';
	import { text } from 'svelte/internal';
	let observer;
	let chosen;
	let possibleAnswers = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

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

	const callback = (entries: IntersectionObserverEntry[]) => {
		const box = entries[0];
		if (!box.isIntersecting) return;

		chosen = Number(entries[0].target.innerHTML);
		console.log(chosen);
	};
	onMount(() => {
		let options = {
			root: document.querySelector('#scrollArea'),
			rootMargin: '-45% 0% -45% 0%',
			threshold: 0
		};
		observer = new IntersectionObserver(callback, options);

		let target = document.querySelector('#scrollArea')?.children;
		if (!target) return;

		for (const element of target) {
			observer.observe(element);
		}
	});

	let textStyle = `

`;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div style="--gradient-colors: {colors.join(', ')}">
	<h1>På en skala fra 1 til 10, hvor nice er assen til Ole?</h1>
	<ul id="scrollArea">
		{#each possibleAnswers as answer}
			<li><div class:selected={chosen === answer}>{answer}</div></li>
		{/each}
	</ul>
</div>

<style>
	.selected {
		background: conic-gradient(var(--gradient-colors), var(--gradient-colors));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	ul li:first-child {
		padding-top: 100px;
	}
	ul li:last-child {
		padding-bottom: 100px;
	}
	ul {
		color: white;
		border: 1px 1px solid #fff;
		margin-top: 0px;
		padding: 0px 0px;
		height: 200px;
		width: 100%;
		overflow-y: scroll;
		font-size: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		scroll-snap-type: y mandatory;
		border-top: 2px;
		border: solid;

		mask-image: linear-gradient(black 60%, transparent 100%, black 60%),
			linear-gradient(to top, black 60%, transparent 100%, black 60%);
		mask-size: 120% 120%;
		mask-position: center;
		mask-repeat: no-repeat;
		mask-composite: intersect;

		position: relative;
	}

	@supports (-webkit-mask-composite: source-in) {
		ul {
			-webkit-mask-image: linear-gradient(black 60%, transparent 100%, black 60%),
				linear-gradient(to top, black 60%, transparent 100%, black 60%);
			-webkit-mask-size: 120% 120%;
			-webkit-mask-position: center;
			-webkit-mask-repeat: no-repeat;
			-webkit-mask-composite: source-in;
		}
	}
	li {
		list-style: none;
		scroll-snap-align: center;
	}
</style>
