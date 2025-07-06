import { useState } from "react";
import type { FormData, FormErrors, ITemplate } from "../types";
import {
	getInitialFormData,
	getInitialFormErrors,
	validateStep,
} from "../utils";

export const useMentorForm = () => {
	const [formData, setFormData] = useState<FormData>(getInitialFormData());
	const [formErrors, setFormErrors] = useState<FormErrors>(
		getInitialFormErrors(),
	);

	const updateFormData = (updates: Partial<FormData>) => {
		setFormData((prev) => ({ ...prev, ...updates }));
	};

	const updateCommunicationStyle = (
		updates: Partial<FormData["communicationStyle"]>,
	) => {
		setFormData((prev) => ({
			...prev,
			communicationStyle: { ...prev.communicationStyle, ...updates },
		}));
	};

	const validateCurrentStep = (currentStep: number) => {
		const { isValid, errors } = validateStep(currentStep, formData);
		setFormErrors(errors);
		return isValid;
	};

	const resetForm = () => {
		setFormData(getInitialFormData());
		setFormErrors(getInitialFormErrors());
	};

	const handleTemplateSelect = (template: ITemplate) => {
		setFormData((prev) => ({
			...prev,
			name: template.name,
			purpose: `Help with ${template.name.toLowerCase()}-related decisions.`,
			domain: template.domain,
			communicationStyle: {
				approach: template.approach,
				tone: template.tone,
				thinkingStyle: template.thinking,
			},
			decisionApproaches: [],
			criticalThinkingMethodologies: [],
		}));
	};

	const toggleDecisionApproach = (approachId: string) => {
		setFormData((prev) => {
			const isSelected = prev.decisionApproaches.includes(approachId);
			const newApproaches = isSelected
				? prev.decisionApproaches.filter((a) => a !== approachId)
				: [...prev.decisionApproaches, approachId];

			return { ...prev, decisionApproaches: newApproaches };
		});
	};

	const toggleCriticalThinkingMethodology = (methodId: string) => {
		setFormData((prev) => {
			const isSelected = prev.criticalThinkingMethodologies.includes(methodId);
			const newMethods = isSelected
				? prev.criticalThinkingMethodologies.filter((m) => m !== methodId)
				: [...prev.criticalThinkingMethodologies, methodId];

			return { ...prev, criticalThinkingMethodologies: newMethods };
		});
	};

	return {
		formData,
		formErrors,
		updateFormData,
		updateCommunicationStyle,
		validateCurrentStep,
		resetForm,
		handleTemplateSelect,
		toggleDecisionApproach,
		toggleCriticalThinkingMethodology,
	};
};
