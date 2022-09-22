import { error as svelteError } from '@sveltejs/kit';
import { getQuestion } from '$lib/supabase/get';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { data, error } = await getQuestion(params.id);
	const result = {
		rating: undefined,
		multiple: undefined,
		binary: undefined
	};
	if (data) {
		result[data.type.name] = data;
		return result;
	}

	throw svelteError(404, 'Not found');
}
