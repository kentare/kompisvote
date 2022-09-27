<script lang="ts">
	export let name: string;
</script>

<div class="flex">
	<div class="name"><span>{name}</span></div>
	<slot />
</div>

<style>
	.name {
		border-top: 2px solid;
		margin-top: 0.5rem;
		padding-top: 0.5rem;
		border-image: linear-gradient(to right, var(--gradient-colors)) 1;
	}
	span {
		opacity: 0.3;
	}
	.flex {
		display: flex;
		gap: 0.5rem;
		flex-direction: column;
		border-bottom: 2px solid;
		margin-bottom: 0.5rem;
		border-image: linear-gradient(to left, var(--gradient-colors)) 1;
	}
</style>
