import type { Cookies } from '@sveltejs/kit';

export interface User {
	id: number;
	name: string;
}

export function getSessionCookie(cookies: Cookies) {
	const session = cookies.get('session');
	if (!session) return undefined;
	return JSON.parse(session) as User;
}
