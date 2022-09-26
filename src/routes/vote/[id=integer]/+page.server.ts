import { error as svelteError, type Actions, type ServerLoadEvent } from '@sveltejs/kit';
import { getQuestion } from '$lib/supabase/read';
import type { Binary, Multiple, Rating } from '$lib/supabase/types';
import { answerRating, answerWithAnswerID } from '$lib/supabase/insert';

export type VoteLoadResult = Rating | Multiple | Binary;
export async function load({ params }: ServerLoadEvent): Promise<VoteLoadResult> {
	if (!params.id) throw svelteError(404, 'Not found');
	const { data, error } = await getQuestion(Number(params.id));
	if (data) {
		return data;
	}

	throw svelteError(404, 'Not found');
}

export interface VoteFormResult {
	success: boolean;
	id: number;
}

export const actions: Actions = {
	binary: async ({ request, cookies }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const { error } = await answerWithAnswerID(
			Number(formData.question_id),
			[Number(formData.input)],
			1
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
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const answersArray = answersToIdArray(formData);

		const { error } = await answerWithAnswerID(Number(formData.question_id), answersArray, 1);
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
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const { error } = await answerRating(Number(formData.question_id), Number(formData.input), 1);
		if (error) {
			return {
				success: false
			};
		}
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
