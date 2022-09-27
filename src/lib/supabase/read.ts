import { supabase } from './client';
import type { Rating, Multiple, Binary } from './types';

export const getQuestion = async (id: number) => {
	return await supabase
		.from<Rating | Multiple | Binary>('question')
		.select(
			`
    id,
    text,
    type:type_id(name),
    user:created_by_id(name,id),
    possible_answer(text, id),
    answer(id,
        numeric,
        freetext,
        yn,
        user:answered_by_user_id(name),
        answer:possible_answer_id(
            id,
            text
        )
        )
    `
		)
		.eq('id', id)
		.limit(1)
		.single();
};

export const getAllQuestions = async () => {
	return await supabase
		.from<Rating | Multiple | Binary>('question')
		.select(
			`
    id,
    text,
    created_at,
    type:type_id(name),
    user:created_by_id(name, id),
    possible_answer(text, id),
    answer(id,
        numeric,
        freetext,
        yn,
        user:answered_by_user_id(name),
        answer:possible_answer_id(
            id,
            text
        )
        )
    `
		)
		.order('created_at', { ascending: false });
};

export interface QuestionForVote {
	id: number;
	text: string;
	created_at: string;
}
export const getQuestionForVote = async (user_id: number) => {
	return await supabase
		.rpc<QuestionForVote>('get_unanswered_questions_wtimestamp', { user_id })
		.order('created_at', { ascending: true });
};

export const getUser = async (user_name: string) => {
	return await supabase.from('user').select(`id, name`).ilike('name', user_name).single();
};
