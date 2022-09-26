import { error as svelteError } from '@sveltejs/kit';
import { getAllQuestions } from '$lib/supabase/read';

export async function load() {
	const { data } = await getAllQuestions();

	if (data) {
		return {
			questions: data
		};
	}

	throw svelteError(404, 'Not found');
}
