import type { definitions } from 'src/types/supabase';
import { supabase } from './client';

export const getQuestion = async (id: number) => {
	return await supabase
		.from<definitions['question']>('question')
		.select(
			`
    id,
    text,
    type:type_id(name),
    user:created_by_id(name),
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

export const getQuestionForVote = async () => {
	return await supabase.from<definitions['question']>('question').select(
		`
    id,
    text
    `
	);
};
