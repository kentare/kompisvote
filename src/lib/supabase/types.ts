/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Question {
	id: number;
	text: string;
	type: QuestionType;
}

export interface QuestionType {
	name: string;
}

export interface PossibleAnswer {
	id: number;
	text: string;
}
export interface Binary extends Question {
	possible_answer: PossibleAnswer[];
}

export interface Multiple extends Question {
	possible_answer: PossibleAnswer[];
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

export interface User {
	name: string;
}
