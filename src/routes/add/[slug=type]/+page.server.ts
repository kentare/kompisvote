// 1 = binary
// 2 = multiple
// 3 = rating

import { createQuestion } from '$lib/supabase/insert';
import type { Action, Actions } from '@sveltejs/kit';
export interface FormResult {
	success: boolean;
	id: number;
}

export const actions: Actions = {
	binary: async ({ request, cookies }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const text = formData.question as string;
		const answersArray = answersToArray(formData);
		const question = await createQuestion(text, 1, 1, answersArray);
		return {
			success: true,
			id: question.id
		};
	},
	multiple: async ({ request, cookies }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const text = formData.question as string;
		const answersArray = answersToArray(formData);
		const question = await createQuestion(text, 2, 1, answersArray);
		return {
			success: true,
			id: question.id
		};
	},
	rating: async ({ request, cookies }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const text = formData.question as string;
		const question = await createQuestion(text, 3, 1);
		return {
			success: true,
			id: question.id
		};
	}
};

const answersToArray = (obj: { [k: string]: FormDataEntryValue }) => {
	return Object.entries(obj)
		.filter(([key, _]) => key.startsWith('answer'))
		.map(([_, value]) => value as string);
};
