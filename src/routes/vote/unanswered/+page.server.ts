import { error as svelteError, type ServerLoadEvent } from '@sveltejs/kit';
import { getQuestionForVote } from '$lib/supabase/read';

export async function load({ params }: ServerLoadEvent) {
	const { data, error } = await getQuestionForVote(1);
	console.log(data);
	console.log(error);
	if (data) {
		return data;
	}

	throw svelteError(404, 'Not found');
}
