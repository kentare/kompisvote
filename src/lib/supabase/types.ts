/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Question {
	id: number;
	text: string;
	type: QuestionType;
	answer?: Answer[];
	created_at: string;
}

export interface QuestionType {
	name: 'multiple' | 'binary' | 'rating';
}

export interface PossibleAnswer {
	id: number;
	text: string;
}
export interface Binary extends Question {
	possible_answer?: PossibleAnswer[];
}

export interface Multiple extends Question {
	possible_answer?: PossibleAnswer[];
}
export interface Rating extends Question {}

export interface Answer {
	id: number;
	numeric?: number;
	freetext?: string;
	yn?: boolean;
	user?: User;
	answer: PossibleAnswer;
}

export interface QuestionStructuredOverview {
	id: number;
	text: string;
	percent: number;
	count: number;
	winner: boolean;
}

export interface User {
	name: string;
}
