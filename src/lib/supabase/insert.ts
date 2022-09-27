import type { definitions } from 'src/types/supabase';
import { supabase } from './client';

export const createQuestion = async (
	text: string,
	type_id: number,
	created_by_id: number,
	possible_answer?: string[]
) => {
	const question = await supabase
		.from<definitions['question']>('question')
		.insert([{ text, type_id, created_by_id }])
		.limit(1)
		.single();

	if (!question?.data?.id) throw Error('something went wrong when creating question');

	if (!possible_answer) return question.data;

	const answers = await createPossibleAnswersForQuestion(question.data.id, possible_answer);

	if (!answers?.data) throw Error('something went wrong when creating answers for question');

	return {
		...question.data,
		possible_answer: answers
	};
};

export const createPossibleAnswersForQuestion = async (
	question_id: number,
	possible_answer: string[]
) => {
	const answers = possible_answer.map((ans) => {
		return {
			text: ans,
			question_id
		};
	});
	return await supabase
		.from<{ text: string; question_id: number }>('possible_answer')
		.insert(answers);
};

export const answerWithAnswerID = async (
	question_id: number,
	possible_answer_ids: number[],
	user_id: number
) => {
	await supabase.from('answer').delete().match({ question_id, answered_by_user_id: user_id });
	const answers = possible_answer_ids.map((id) => {
		return {
			possible_answer_id: id,
			answered_by_user_id: user_id,
			question_id
		};
	});
	return await supabase.from<definitions['answer']>('answer').insert(answers);
};

export const answerRating = async (question_id: number, rating: number, user_id: number) => {
	const answer = [
		{
			numeric: rating,
			answered_by_user_id: user_id,
			question_id
		}
	];
	return await supabase.from<definitions['answer']>('answer').insert(answer);
};
