import { error } from '@sveltejs/kit';
import data from '../../../data/data.json';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const post = data.questions.find((data) => Number(params.id) === data.id);
	console.log(post);

	if (post) {
		return post;
	}

	throw error(404, 'Not found');
}
