export interface ITemplate {
	readonly name: string;
	readonly domain: string;
	readonly approach: number;
	readonly tone: number;
	readonly thinking: number;
}

export interface FormData {
	name: string;
	purpose: string;
	domain: string;
	customDomain: string;
	communicationStyle: {
		approach: number;
		tone: number;
		thinkingStyle: number;
	};
	decisionApproaches: string[];
	criticalThinkingMethodologies: string[];
}

export interface FormErrors {
	name: string;
	purpose: string;
}

export interface ChatMessage {
	sender: "user" | "mentor";
	text: string;
}

export interface WizardStep {
	id: number;
	name: string;
	icon: React.ComponentType<{ className?: string }>;
}

export interface ExpertiseDomain {
	id: string;
	icon: React.ComponentType<{ className?: string }>;
	title: string;
}

export interface DecisionApproach {
	id: string;
	title: string;
}

export interface CriticalThinkingMethodology {
	id: string;
	title: string;
}

export type TestMode = "chat" | "call" | null;
