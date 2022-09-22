<script lang="ts">
	import Binary from '$lib/components/questions/Binary.svelte';
	import Multiple from '$lib/components/questions/Multiple.svelte';
	import Rating from '$lib/components/questions/Rating.svelte';
	import type {
		Rating as RatingType,
		Binary as BinaryType,
		Multiple as MultipleType
	} from '$lib/supabase/types';

	export let data: {
		rating: RatingType;
		binary: BinaryType;
		multiple: MultipleType;
	};
</script>

{#if data.rating}
	<Rating question={data.rating} />{/if}
{#if data.binary}
	<Binary question={data.binary} />{/if}
{#if data.multiple}
	<Multiple question={data.multiple} />
{/if}
