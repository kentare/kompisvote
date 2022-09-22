import { error as svelteError } from '@sveltejs/kit';
import { getQuestionForVote } from '$lib/supabase/get';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { data, error } = await getQuestionForVote();
	if (data) {
		return data;
	}

	throw svelteError(404, 'Not found');
}
