import { error as svelteError, type ServerLoadEvent } from '@sveltejs/kit';
import { getQuestionForVote } from '$lib/supabase/read';
import { getSessionCookie } from '$lib/utils/cookie';

export async function load({ cookies }: ServerLoadEvent) {
	const user = getSessionCookie(cookies);
	if (!user?.id) {
		throw svelteError(404, 'Not found');
	}
	const { data } = await getQuestionForVote(user.id);

	return {
		questions: data
	};
}
