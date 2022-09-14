<script lang="ts">
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div>
	<h1>På en skala fra 1 til 10, hvor nice er assen til Ole?</h1>
	<ul>
		<li>10</li>
		<li>9</li>
		<li>8</li>
		<li>7</li>
		<li>6</li>
		<li>5</li>
		<li>4</li>
		<li>3</li>
		<li>2</li>
		<li>1</li>
	</ul>
</div>

<style>
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
