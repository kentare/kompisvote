// 1 = binary
// 2 = multiple
// 3 = rating
// 4 = freetext

import { createQuestion } from '$lib/supabase/insert';
import { getSessionCookie } from '$lib/utils/cookie';
import type { Actions } from '@sveltejs/kit';

export interface FormResult {
	success: boolean;
	id: number;
}

export const actions: Actions = {
	binary: async ({ request, cookies }) => {
		const user = getSessionCookie(cookies);
		if (!user?.id) return;
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const text = formData.question as string;
		const answersArray = answersToArray(formData);
		const question = await createQuestion(text, 1, user.id, answersArray);
		return {
			success: true,
			id: question.id
		};
	},
	multiple: async ({ request, cookies }) => {
		const user = getSessionCookie(cookies);
		if (!user?.id) return;
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const text = formData.question as string;
		const answersArray = answersToArray(formData);
		const question = await createQuestion(text, 2, user.id, answersArray);
		return {
			success: true,
			id: question.id
		};
	},
	rating: async ({ request, cookies }) => {
		const user = getSessionCookie(cookies);
		if (!user?.id) return;
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const text = formData.question as string;
		const question = await createQuestion(text, 3, user.id);
		return {
			success: true,
			id: question.id
		};
	},
	freetext: async ({ request, cookies }) => {
		const user = getSessionCookie(cookies);
		if (!user?.id) return;
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const text = formData.question as string;
		const question = await createQuestion(text, 4, user.id);
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
