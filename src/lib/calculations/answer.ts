import type { Answer, Binary, Multiple, QuestionStructuredOverview } from '$lib/supabase/types';

/**
 *  Gets most frequent answer. Only used for questions with set possible answers
 * @param answers
 * @returns
 */
export function getMostFrequent(answers: Answer[]) {
	const flatten = answers.map((answer) => answer.answer.id.toString());
	const hashmap = flatten.reduce((acc: { [key: string]: number }, val) => {
		acc[val] = (acc[val] || 0) + 1;
		return acc;
	}, {});
	return Object.keys(hashmap).reduce((a, b) => (hashmap[a] > hashmap[b] ? a : b), '');
}

/**
 *  Used to calculate numeric values from answers.
 * @param answers
 * @returns
 */
export function getAverage(answers: Answer[]) {
	return (
		answers.reduce((a, b) => {
			if (b.numeric) {
				return a + b.numeric;
			}
			return a;
		}, 0) / answers.length
	);
}

/**
 * Calculate and structure content for overview for a specific question
 * @param question
 * @returns
 */
export function calculateAnswersForQuestions(
	question: Binary | Multiple
): QuestionStructuredOverview[] {
	if (!question.answer || !question.possible_answer) return [];
	const winner = getMostFrequent(question?.answer);
	return question.possible_answer.map((possible) => {
		const filtered =
			question.answer?.flat().filter((answer) => possible.id === answer.answer.id) ?? [];
		return {
			id: possible.id,
			text: possible.text,
			percent: Math.round((filtered.length / (question.answer?.length ?? 1)) * 100),
			count: filtered.length,
			winner: Number(winner) === possible.id
		};
	});
}
