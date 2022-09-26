import { invalid, type Actions } from '@sveltejs/kit';
import type { Binary, Multiple, Rating } from '$lib/supabase/types';
import { getUser } from '$lib/supabase/read';

export type VoteLoadResult = Rating | Multiple | Binary;

export interface VoteFormResult {
	success: boolean;
	id: number;
}

export interface LoginFormResponse {
	missing?: boolean | undefined;
	success?: boolean | undefined;
}

export const actions: Actions = {
	login: async ({ request, cookies }): Promise<LoginFormResponse> => {
		const form = await request.formData();
		const formData = Object.fromEntries(form.entries());
		const name = formData.name as string;
		const { data, error } = await getUser(name);

		if (!data) {
			return invalid(400, { missing: true, success: false });
		}

		cookies.set('session', JSON.stringify(data));

		if (error) {
			return {
				success: false
			};
		}
		return {
			success: true
		};
	},
	logout: async ({ cookies }) => {
		cookies.delete('session');
		return {
			success: true
		};
	}
};
