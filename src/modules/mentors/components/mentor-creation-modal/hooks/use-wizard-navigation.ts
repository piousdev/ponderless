import { useState } from "react";
import { WIZARD_STEPS } from "../constants";

export const useWizardNavigation = () => {
	const [step, setStep] = useState(0);
	const [direction, setDirection] = useState(1);
	const [completedSteps, setCompletedSteps] = useState<number[]>([]);

	const goToStep = (targetStep: number, isValidStep: boolean) => {
		if (targetStep < step && !completedSteps.includes(targetStep)) return;
		if (targetStep > step && !isValidStep) return;

		setDirection(targetStep > step ? 1 : -1);
		setStep(targetStep);
	};

	const nextStep = (isValidStep: boolean) => {
		if (!isValidStep) return;

		setDirection(1);
		if (step < WIZARD_STEPS.length - 1) {
			if (!completedSteps.includes(step)) {
				setCompletedSteps((prev) => [...prev, step]);
			}
			setStep((prev) => prev + 1);
		}
	};

	const prevStep = () => {
		setDirection(-1);
		if (step > 0) {
			setStep((prev) => prev - 1);
		}
	};

	const addCompletedStep = (stepId: number) => {
		if (!completedSteps.includes(stepId)) {
			setCompletedSteps((prev) => [...prev, stepId]);
		}
	};

	const resetWizard = () => {
		setStep(0);
		setDirection(1);
		setCompletedSteps([]);
	};

	return {
		step,
		direction,
		completedSteps,
		goToStep,
		nextStep,
		prevStep,
		addCompletedStep,
		resetWizard,
	};
};
