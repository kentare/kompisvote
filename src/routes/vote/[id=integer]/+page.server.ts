import { error as svelteError, type Actions, type ServerLoadEvent } from '@sveltejs/kit';
import { getQuestion } from '$lib/supabase/read';
import type { Binary, Multiple, Rating } from '$lib/supabase/types';
import { answerFreetext, answerRating, answerWithAnswerID } from '$lib/supabase/insert';
import { getSessionCookie } from '$lib/utils/cookie';
import { deleteQuestion } from '$lib/supabase/delete';

export type VoteLoadResult = Rating | Multiple | Binary;
export async function load({ params }: ServerLoadEvent): Promise<VoteLoadResult | undefined> {
	if (!params.id) throw svelteError(404, 'Not found');
	const { data, error } = await getQuestion(Number(params.id));
	if (data) {
		return data;
	}
}

export interface VoteFormResult {
	success: boolean;
	id: number;
}

export const actions: Actions = {
	binary: async ({ request, cookies }) => {
		const user = getSessionCookie(cookies);
		if (!user?.id) {
			return {
				success: false
			};
		}
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const { error } = await answerWithAnswerID(
			Number(formData.question_id),
			[Number(formData.input)],
			user.id
		);
		if (error) {
			return {
				success: false
			};
		}
		return {
			success: true,
			id: formData.question_id
		};
	},
	multiple: async ({ request, cookies }) => {
		const user = getSessionCookie(cookies);
		if (!user?.id) {
			return {
				success: false
			};
		}
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const answersArray = answersToIdArray(formData);

		const { error } = await answerWithAnswerID(Number(formData.question_id), answersArray, user.id);
		if (error) {
			return {
				success: false
			};
		}
		return {
			success: true,
			id: formData.question_id
		};
	},
	rating: async ({ request, cookies }) => {
		const user = getSessionCookie(cookies);
		if (!user?.id) {
			return {
				success: false
			};
		}
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const { error } = await answerRating(
			Number(formData.question_id),
			Number(formData.input),
			user.id
		);
		if (error) {
			return {
				success: false
			};
		}
		return {
			success: true,
			id: formData.question_id
		};
	},

	freetext: async ({ request, cookies }) => {
		const user = getSessionCookie(cookies);
		if (!user?.id) {
			return {
				success: false
			};
		}
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const { error } = await answerFreetext(
			Number(formData.question_id),
			formData.input as string,
			user.id
		);
		if (error) {
			return {
				success: false
			};
		}
		return {
			success: true,
			id: formData.question_id
		};
	},
	delete: async ({ request, cookies }) => {
		const user = getSessionCookie(cookies);
		if (!user?.id) {
			return {
				success: false
			};
		}
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());

		const question_id = formData.question_id;
		if (!question_id) {
			return {
				success: false
			};
		}

		await deleteQuestion(user.id, Number(question_id));

		return {
			success: true,
			id: formData.question_id
		};
	}
};
// TODO: REDIRECT WHEN SUCCESS

const answersToIdArray = (obj: { [k: string]: FormDataEntryValue }) => {
	return Object.entries(obj)
		.filter(([key, _]) => key.startsWith('answer'))
		.map(([_, value]) => Number(value));
};
