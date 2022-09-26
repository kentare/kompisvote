import { error as svelteError, type ServerLoadEvent } from '@sveltejs/kit';
import { getQuestionForVote } from '$lib/supabase/read';

export async function load() {
	const { data } = await getQuestionForVote(1);

	if (data) {
		return data;
	}

	throw svelteError(404, 'Not found');
}
