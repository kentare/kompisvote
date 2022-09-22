// 1 = binary
// 2 = multiple
// 3 = rating

import { createQuestion } from '$lib/supabase/answer';

/** @type {import('./$types').Actions} */
export const actions = {
	binary: async ({ request, cookies }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const text = formData.question;
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
		const text = formData.question;
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
		const text = formData.question;
		const question = await createQuestion(text, 3, 1);
		return {
			success: true,
			id: question.id
		};
	}
};

const answersToArray = (obj: Record<string, string>) => {
	return Object.entries(obj)
		.filter(([key, _]) => key.startsWith('answer'))
		.map(([_, value]) => value);
};
