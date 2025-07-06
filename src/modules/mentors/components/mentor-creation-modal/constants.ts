import {
	BookOpen,
	BrainCircuit,
	Briefcase,
	DollarSign,
	FileText,
	FlaskConical,
	Heart,
	HeartPulse,
	Mic,
	Palette,
	PartyPopper,
	Plus,
	Target,
	Users,
	Zap,
} from "lucide-react";
import type {
	CriticalThinkingMethodology,
	DecisionApproach,
	ExpertiseDomain,
	ITemplate,
	WizardStep,
} from "./types";

export const WIZARD_STEPS: WizardStep[] = [
	{ id: 0, name: "Templates", icon: Users },
	{ id: 1, name: "Basic Info", icon: FileText },
	{ id: 2, name: "Expertise", icon: BrainCircuit },
	{ id: 3, name: "Communication", icon: Mic },
	{ id: 4, name: "Methodologies", icon: Target },
	{ id: 5, name: "Test Mentor", icon: FlaskConical },
	{ id: 6, name: "Review & Create", icon: PartyPopper },
];

export const expertiseDomains: ExpertiseDomain[] = [
	{ id: "career", icon: Briefcase, title: "Career & Professional" },
	{ id: "financial", icon: DollarSign, title: "Financial & Investment" },
	{ id: "relationships", icon: Heart, title: "Relationships & Personal" },
	{ id: "creative", icon: Palette, title: "Creative & Innovation" },
	{ id: "business", icon: Target, title: "Strategic Business" },
	{ id: "health", icon: HeartPulse, title: "Health & Lifestyle" },
	{ id: "learning", icon: BookOpen, title: "Learning & Development" },
	{ id: "daily", icon: Zap, title: "Quick Daily Decisions" },
	{ id: "custom", icon: Plus, title: "Custom Domain" },
];

export const criticalThinkingPurposes: string[] = [
	"Analyze complex problems",
	"Evaluate arguments and evidence",
	"Brainstorm creative solutions",
	"Develop long-term strategies",
];

export const decisionApproaches: DecisionApproach[] = [
	{ id: "pros_cons", title: "Pros & Cons Analyst" },
	{ id: "devils_advocate", title: "Devil's Advocate" },
	{ id: "risk_assessor", title: "Risk Assessor" },
	{ id: "values_aligner", title: "Values Aligner" },
	{ id: "quick_decider", title: "Quick Decider" },
	{ id: "systems_thinker", title: "Systems Thinker" },
];

export const criticalThinkingMethodologies: CriticalThinkingMethodology[] = [
	{ id: "socratic", title: "Socratic Method" },
	{ id: "first_principles", title: "First Principles" },
	{ id: "root_cause", title: "Root Cause Analysis" },
	{ id: "six_hats", title: "Six Thinking Hats" },
	{ id: "mind_mapping", title: "Mind Mapping" },
	{ id: "lateral_thinking", title: "Lateral Thinking" },
];

export const templates: ITemplate[] = [
	{
		name: "Career Coach",
		domain: "career",
		approach: 20,
		tone: 30,
		thinking: 70,
	},
	{
		name: "Financial Advisor",
		domain: "financial",
		approach: 80,
		tone: 10,
		thinking: 20,
	},
	{
		name: "Life Partner",
		domain: "relationships",
		approach: 40,
		tone: 80,
		thinking: 60,
	},
	{
		name: "Creative Muse",
		domain: "creative",
		approach: 90,
		tone: 90,
		thinking: 90,
	},
];
