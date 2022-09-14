<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
</script>

<div class="main">
	<main>
		<h1>Kompis.VOTE</h1>
		<slot />
		<nav data-sveltekit-prefetch>
			<div class="btnwrapper">
				<button>Send inn</button>
			</div>
			<ul>
				<li class:active={$page.url.pathname === '/binary'}>
					<a href="/binary">Binary</a>
				</li>
				<li class:active={$page.url.pathname === '/multiple'}>
					<a href="/multiple">Multiple</a>
				</li>
				<li class:active={$page.url.pathname === '/rating'}>
					<a href="/rating">Rating</a>
				</li>
			</ul>
		</nav>
	</main>
</div>

<style>
	.btnwrapper {
		display: flex;
	}
	button {
		border: none;
		background-color: white;
		font-size: 2rem;
		width: 50vw;
		height: 100px;
		margin-left: auto;
		margin-bottom: -1px;
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
	}

	nav a {
		display: flex;
		height: 100%;
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
		color: black;
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
	.main {
		height: 100vh;
		padding-bottom: 150px;
	}
	main {
		flex: 1;
		display: grid;
		grid-template-rows: 15% 1fr 15%;
		padding: 0rem 1rem;
		width: 100%;
		height: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
