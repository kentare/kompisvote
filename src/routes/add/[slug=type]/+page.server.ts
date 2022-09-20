/** @type {import('./$types').Actions} */
export const actions = {
	binary: async ({ request, cookies }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const answersArray = answersToArray(formData);
		console.log(answersArray);
	},
	multiple: async ({ request, cookies }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const answersArray = answersToArray(formData);
	},
	rating: async ({ request, cookies }) => {
		const data = await request.formData();
		const formData = Object.fromEntries(data.entries());
		const answersArray = answersToArray(formData);
	}
};

const answersToArray = (obj: Record<string, string>) => {
	return Object.entries(obj)
		.filter(([key, _]) => key.startsWith('answer'))
		.map(([_, value]) => value);
};
