<script lang="ts">
	import { goto } from '$app/navigation';
	import BoxInput from '$lib/components/inputs/BoxInput.svelte';
	import SubmitButton from '$lib/components/inputs/SubmitButton.svelte';
	import { onMount } from 'svelte';
	import type { LoginFormResponse } from './+page.server';

	let name: string;
	export let form: LoginFormResponse;

	onMount(() => {
		if (form?.success) {
			window.location.href = `/vote/unanswered`;
		}
	});
</script>

<form method="POST" action="/login?/login">
	<input class="boxed" type="text" name="name" placeholder="Ditt navn" bind:value={name} />
	{#if form?.missing}
		<div class="boxed error">Finner ikke denne brukeren</div>
	{/if}
	<div class="button">
		<SubmitButton text="Logg inn" />
	</div>
</form>

<style>
	.button {
		display: flex;
		flex-direction: column;
		margin: 0 1rem;
	}

	.error {
		color: red;
		padding: 1rem;
	}
	form {
		display: flex;
		flex-direction: column;
	}
	input {
		text-align: left;
		border: 0;
	}
</style>
