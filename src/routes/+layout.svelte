<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Home from '$lib/components/icons/footer/Home.svelte';
	import Plus from '$lib/components/icons/footer/Plus.svelte';
	import QuestionMark from '$lib/components/icons/footer/QuestionMark.svelte';
	import LogoutIcon from '$lib/components/icons/LogoutIcon.svelte';
	import { unansweredCount } from '$lib/stores/stores';
	import { onMount } from 'svelte';

	let logged_in_user = $page.data.logged_in_user;

	let unanswered: number;

	unansweredCount.subscribe((value) => {
		unanswered = Number(value);
	});
	onMount(() => {
		unansweredCount.set($page.data.unanswered);
	});
	$: console.log(unanswered);
</script>

<div class="main">
	<main>
		<h1 class:user={logged_in_user}>
			{#if logged_in_user}
				{logged_in_user.name}
				<form method="POST" action="/login?/logout"><button><LogoutIcon /> </button></form>
			{:else}
				Kompis.vote
			{/if}
		</h1>
		<slot />
		<nav data-sveltekit-prefetch>
			<ul>
				<li class:active={$page.url.pathname === '/'}>
					<a href="/">
						<svelte:component this={Home} />
					</a>
				</li>
				<li class:active={$page.url.pathname === '/vote/unanswered'}>
					<a
						href="/vote/unanswered"
						class:unanswered={unanswered > 0 && $page.url.pathname !== '/vote/unanswered'}
					>
						<svelte:component this={QuestionMark} />
						<span class="bubble" />
					</a>
				</li>
				<li class:active={$page.url.pathname === '/add'}>
					<a href="/add">
						<svelte:component this={Plus} />
					</a>
				</li>
			</ul>
		</nav>
	</main>
</div>

<style>
	.user > form > button {
		height: 32px;
		background: none;
		border: none;
		color: currentColor;
	}
	.user {
		display: flex;
		gap: 1rem;
		height: 100%;
		justify-content: center;
	}
	.unanswered {
		position: relative;
		color: #f200ff;
	}

	.unanswered {
		/* Start the shake animation and make the animation last for 0.5 seconds */
		animation: shake 0.5s;

		/* When the animation is finished, start again */
		animation-iteration-count: infinite;
	}

	@keyframes shake {
		0% {
			transform: translate(1px, 1px) rotate(0deg);
		}
		10% {
			transform: translate(-1px, -2px) rotate(-1deg);
		}
		20% {
			transform: translate(-3px, 0px) rotate(1deg);
		}
		30% {
			transform: translate(3px, 2px) rotate(0deg);
		}
		40% {
			transform: translate(1px, -1px) rotate(1deg);
		}
		50% {
			transform: translate(-1px, 2px) rotate(-1deg);
		}
		60% {
			transform: translate(-3px, 1px) rotate(0deg);
		}
		70% {
			transform: translate(3px, 1px) rotate(-1deg);
		}
		80% {
			transform: translate(-1px, -1px) rotate(1deg);
		}
		90% {
			transform: translate(1px, 2px) rotate(0deg);
		}
		100% {
			transform: translate(1px, -2px) rotate(-1deg);
		}
	}
	nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		--background: rgba(255, 255, 255);
	}
	li {
		position: relative;
		height: 100%;
		width: 100%;
		color: #91908d;
	}

	nav a {
		display: flex;
		height: 50px;
		align-items: center;
		padding: 0 1em;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		justify-content: center;
		text-decoration: none;
		transition: color 0.2s linear;
		text-align: center;
		color: #91908d;
	}

	ul {
		width: 100%;
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		list-style: none;
		background: var(--background);
	}
	li.active {
		background-color: #f200ff;
	}

	li.active a {
		color: rgb(255, 255, 255);
	}
	h1 {
		align-self: start;
	}
	main {
		height: 100%;
	}
</style>
