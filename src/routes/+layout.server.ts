import { getQuestionForVote } from '$lib/supabase/read';
import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({ locals }: ServerLoadEvent) => {
	if (locals.user) {
		const { data } = await getQuestionForVote(locals.user.id);
		return {
			user: locals.user,
			unanswered: data?.length ?? 0
		};
	}
	return {
		user: locals.user,
		unanswered: 0
	};
};
