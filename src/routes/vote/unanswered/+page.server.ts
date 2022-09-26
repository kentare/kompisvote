import { error as svelteError, type ServerLoadEvent } from '@sveltejs/kit';
import { getQuestionForVote } from '$lib/supabase/read';

export async function load({ locals }: ServerLoadEvent) {
	if (!locals.user) {
		throw svelteError(404, 'Not found');
	}
	const { data } = await getQuestionForVote(locals.user.id);

	return {
		questions: data
	};
}
