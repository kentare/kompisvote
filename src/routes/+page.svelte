<script lang="ts">
	import { page } from '$app/stores';
	import QuestionOverviewCard from '$lib/components/questions/presentation/QuestionOverviewCard.svelte';
	import { unansweredCount } from '$lib/stores/stores';
	import { supabase } from '$lib/supabase/client';
	import { getQuestion, getQuestionForVote } from '$lib/supabase/read';
	import type { Binary, Freetext, Multiple, Rating, User } from '$lib/supabase/types';
	import { onMount } from 'svelte';

	export let data: {
		questions: (Rating | Multiple | Binary | Freetext)[];
		user: User;
	};

	let questions = [...data.questions];

	async function updateQuestion(question_id: number) {
		const { data: newQuestion } = await getQuestion(question_id);
		questions = questions.map((q) => {
			if (q.id === newQuestion?.id) {
				return newQuestion;
			}
			return q;
		});
	}

	async function addQuestion(question_id: number) {
		const { data: newQuestion } = await getQuestion(question_id);

		if (newQuestion) {
			questions = [newQuestion, ...questions];
		}
	}
	async function removeQuestion(question_id: number) {
		questions = questions.filter((q) => q.id !== question_id);
	}

	onMount(() => {
		supabase
			.from('answer')
			.on('INSERT', async (payload) => {
				await updateQuestion(payload.new.question_id);
				const { data } = await getQuestionForVote($page.data.logged_in_user.id);
				unansweredCount.set(data?.length ?? 0);
			})
			.subscribe();

		supabase
			.from('question')
			.on('INSERT', async (payload) => {
				await addQuestion(payload.new.id);

				const { data } = await getQuestionForVote($page.data.logged_in_user.id);
				unansweredCount.set(data?.length ?? 0);
			})
			.on('DELETE', async (payload) => {
				await removeQuestion(payload.old.id);
				const { data } = await getQuestionForVote($page.data.logged_in_user.id);
				unansweredCount.set(data?.length ?? 0);
			})
			.subscribe();
	});
</script>

<div>
	{#each questions as question}
		<a href="/vote/{question.id}">
			<QuestionOverviewCard {question} />
		</a>
	{/each}
</div>

<style>
	:root {
		--question-color: #d3d3d3;
	}
	a {
		color: inherit;
	}
	a:active {
		text-decoration: none;
	}
</style>
