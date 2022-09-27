import { supabase } from './client';
import { getQuestion } from './read';

export async function deleteQuestion(user_id: number, question_id: number) {
	const { data } = await getQuestion(question_id);
	if (!data || data?.user?.id !== user_id) return;
	// Delete all answers
	await supabase.from('answer').delete().match({ question_id });

	// Delete possible answers
	await supabase.from('possible_answer').delete().match({ question_id });
	// Delete question
	await supabase.from('question').delete().match({ id: question_id });
}
