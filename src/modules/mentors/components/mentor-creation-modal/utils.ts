import type { FormData, FormErrors } from "./types";

export const formatDuration = (seconds: number): string => {
	const mins = Math.floor(seconds / 60)
		.toString()
		.padStart(2, "0");
	const secs = (seconds % 60).toString().padStart(2, "0");
	return `${mins}:${secs}`;
};

export const validateStep = (
	currentStep: number,
	formData: FormData,
): { isValid: boolean; errors: FormErrors } => {
	const errors: FormErrors = { name: "", purpose: "" };
	let isValid = true;

	if (currentStep === 1) {
		if (formData.name.trim() === "") {
			errors.name = "Mentor name is required.";
			isValid = false;
		}
		if (formData.purpose.trim() === "") {
			errors.purpose = "Mentor purpose is required.";
			isValid = false;
		}
	}

	return { isValid, errors };
};

export const isNextDisabled = (step: number, formData: FormData): boolean => {
	switch (step) {
		case 2:
			return (
				formData.domain === "" ||
				(formData.domain === "custom" && formData.customDomain.trim() === "")
			);
		case 4:
			return (
				formData.decisionApproaches.length === 0 &&
				formData.criticalThinkingMethodologies.length === 0
			);
		default:
			return false;
	}
};

export const getInitialFormData = (): FormData => ({
	name: "",
	purpose: "",
	domain: "",
	customDomain: "",
	communicationStyle: { approach: 50, tone: 50, thinkingStyle: 50 },
	decisionApproaches: [],
	criticalThinkingMethodologies: [],
});

export const getInitialFormErrors = (): FormErrors => ({
	name: "",
	purpose: "",
});
