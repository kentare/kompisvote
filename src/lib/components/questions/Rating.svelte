<script lang="ts">
	import type { Rating } from '$lib/supabase/types';
	import Fieldset from '../inputs/Fieldset.svelte';
	import Legend from '../inputs/Legend.svelte';
	import SubmitButton from '../inputs/SubmitButton.svelte';

	import { onMount } from 'svelte';
	import InvisibleInput from '../inputs/InvisibleInput.svelte';

	export let question: Rating;
	let observer;
	let chosen = 10;
	let possibleAnswers = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

	const callback = (entries: IntersectionObserverEntry[]) => {
		const box = entries[0];
		if (!box.isIntersecting) return;

		chosen = Number(entries[0].target.innerHTML);
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
</script>

<form method="POST" action="?/rating">
	<Fieldset>
		<Legend>{question.text}</Legend>
		<InvisibleInput name="question_id" value={question.id} />
		<InvisibleInput name="input" value={chosen} />
		<!-- <input name="input" type="number" bind:value={chosen} /> -->
		<ul id="scrollArea">
			{#each possibleAnswers as answer}
				<li>{answer}</li>
			{/each}
		</ul>
		<SubmitButton />
	</Fieldset>
</form>

<style>
	input {
		width: 0px;
		height: 0px;
		position: absolute;
		background: none;
		border: none;
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
