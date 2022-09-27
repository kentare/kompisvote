/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param: string) {
	return questionTypes.includes(param);
}

export const questionTypes = ['binary', 'multiple', 'rating', 'freetext'];
