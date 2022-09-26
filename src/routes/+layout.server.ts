import { getQuestionForVote } from '$lib/supabase/read';
import { getSessionCookie } from '$lib/utils/cookie';
import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({ cookies }: ServerLoadEvent) => {
	const user = getSessionCookie(cookies);
	if (user) {
		const { data } = await getQuestionForVote(user.id);
		return {
			user: user,
			unanswered: data?.length ?? 0
		};
	}
	return {
		user: user,
		unanswered: 0
	};
};
