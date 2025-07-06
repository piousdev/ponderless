"use client";

import {
	ArrowLeft,
	ArrowRight,
	Check,
	CheckCircle2,
	Loader2,
	Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/shadcn/ui/dialog";
import { Progress } from "@/components/shadcn/ui/progress";
import { cn } from "@/lib/utils";
import { BasicInfoStep } from "./components/basic-info-step";
import { CommunicationStep } from "./components/communication-step";
import { ExpertiseStep } from "./components/expertise-step";
import { MethodologiesStep } from "./components/methodologies-step";
import { ReviewStep } from "./components/review-step";
// Import all the separated components
import { TemplatesStep } from "./components/templates-step";
import { TestMentorStep } from "./components/test-mentor-step";
// Import constants and utils
import { WIZARD_STEPS } from "./constants";
// Import hooks
import { useMentorForm } from "./hooks/use-mentor-form";
import { useMentorTest } from "./hooks/use-mentor-test";
import { useWizardNavigation } from "./hooks/use-wizard-navigation";
import type { ITemplate } from "./types";
import { isNextDisabled } from "./utils";

export default function MentorCreationModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	// Use custom hooks
	const {
		formData,
		formErrors,
		updateFormData,
		updateCommunicationStyle,
		validateCurrentStep,
		resetForm,
		handleTemplateSelect,
		toggleDecisionApproach,
		toggleCriticalThinkingMethodology,
	} = useMentorForm();

	const {
		step,
		direction,
		completedSteps,
		goToStep,
		nextStep,
		prevStep,
		addCompletedStep,
		resetWizard,
	} = useWizardNavigation();

	const {
		testMode,
		setTestMode,
		chatInput,
		setChatInput,
		chatMessages,
		isMentorTyping,
		callDuration,
		chatContainerRef,
		handleSendMessage,
		resetTest,
	} = useMentorTest(formData);

	const handleTemplateSelectAndNext = (template: ITemplate) => {
		handleTemplateSelect(template);
		addCompletedStep(0);
		nextStep(true);
	};

	const handleNextStep = () => {
		const isValid = validateCurrentStep(step);
		nextStep(isValid);
	};

	const handleGoToStep = (targetStep: number) => {
		const isValid = validateCurrentStep(step);
		goToStep(targetStep, isValid);
	};

	const handleCreateMentor = async () => {
		setIsCreating(true);
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setIsCreating(false);
		setIsSuccess(true);
	};

	const resetAndClose = () => {
		resetWizard();
		resetForm();
		resetTest();
		setIsCreating(false);
		setIsSuccess(false);
		setIsOpen(false);
	};

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? "100%" : "-100%",
			opacity: 0,
		}),
		center: { x: 0, opacity: 1 },
		exit: (direction: number) => ({
			x: direction < 0 ? "100%" : "-100%",
			opacity: 0,
		}),
	};

	const renderStepContent = () => {
		if (isCreating) {
			return (
				<div className="flex flex-col items-center justify-center h-full">
					<Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
					<p className="text-lg font-semibold">Creating your mentor...</p>
				</div>
			);
		}

		if (isSuccess) {
			return (
				<div className="flex flex-col items-center justify-center h-full text-center">
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ type: "spring", stiffness: 260, damping: 20 }}
					>
						<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
							<Check className="w-12 h-12 text-green-600" />
						</div>
					</motion.div>
					<h3 className="text-2xl font-bold mb-2">Mentor Created!</h3>
					<p className="text-muted-foreground mb-6">
						Your new AI mentor, {formData.name}, is ready.
					</p>
					<div className="flex gap-4">
						<Button onClick={resetAndClose}>Chat with {formData.name}</Button>
						<Button variant="secondaryOutline" onClick={resetAndClose}>
							Create Another
						</Button>
					</div>
				</div>
			);
		}

		return (
			<AnimatePresence initial={false} custom={direction}>
				<motion.div
					key={step}
					custom={direction}
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{
						x: { type: "spring", stiffness: 300, damping: 30 },
						opacity: { duration: 0.2 },
					}}
					className="h-full overflow-y-auto p-1 pr-4"
				>
					{step === 0 && (
						<TemplatesStep
							onTemplateSelect={handleTemplateSelectAndNext}
							onStartFromScratch={handleNextStep}
						/>
					)}
					{step === 1 && (
						<BasicInfoStep
							formData={formData}
							formErrors={formErrors}
							onUpdateFormData={updateFormData}
						/>
					)}
					{step === 2 && (
						<ExpertiseStep
							formData={formData}
							onUpdateFormData={updateFormData}
						/>
					)}
					{step === 3 && (
						<CommunicationStep
							formData={formData}
							onUpdateCommunicationStyle={updateCommunicationStyle}
						/>
					)}
					{step === 4 && (
						<MethodologiesStep
							formData={formData}
							onToggleDecisionApproach={toggleDecisionApproach}
							onToggleCriticalThinkingMethodology={
								toggleCriticalThinkingMethodology
							}
						/>
					)}
					{step === 5 && (
						<TestMentorStep
							formData={formData}
							testMode={testMode}
							setTestMode={setTestMode}
							chatInput={chatInput}
							setChatInput={setChatInput}
							chatMessages={chatMessages}
							isMentorTyping={isMentorTyping}
							callDuration={callDuration}
							chatContainerRef={chatContainerRef}
							onSendMessage={handleSendMessage}
							onSkipStep={handleNextStep}
							onEndCall={handleNextStep}
						/>
					)}
					{step === 6 && <ReviewStep formData={formData} />}
				</motion.div>
			</AnimatePresence>
		);
	};

	const currentStepInfo = WIZARD_STEPS.find((s) => s.id === step);
	const getStepTitle = () => {
		if (isCreating) return "Creating Mentor";
		if (isSuccess) return "Success!";
		return currentStepInfo?.name || "Create Your AI Mentor";
	};

	return (
		<>
			<Button
				onClick={() => setIsOpen(true)}
				variant="super"
				size="sm"
				className="gap-2 cursor-pointer"
			>
				<Sparkles className="size-4" /> Create Mentor
			</Button>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="sm:max-w-4xl w-[95vw] max-h-[90vh] flex flex-row p-0 gap-0">
					{/* Sidebar */}
					<div className="hidden md:flex flex-col gap-2 w-64 bg-muted/50 p-4 border-r">
						<h2 className="text-lg font-semibold tracking-tight mb-4">
							Create Mentor
						</h2>
						<nav className="flex flex-col gap-1">
							{WIZARD_STEPS.map((s) => {
								const isCompleted =
									completedSteps.includes(s.id) ||
									(isSuccess && s.id < WIZARD_STEPS.length - 1);
								const isCurrent = s.id === step;
								const canNavigate = isCompleted || isCurrent;
								return (
									<Button
										key={s.id}
										variant={isCurrent ? "secondary" : "ghost"}
										className={cn(
											"justify-start gap-2",
											!canNavigate &&
												"text-muted-foreground cursor-not-allowed",
										)}
										onClick={() => canNavigate && handleGoToStep(s.id)}
										disabled={!canNavigate}
									>
										{isCompleted ? (
											<CheckCircle2 className="h-4 w-4 text-green-500" />
										) : (
											<s.icon className="h-4 w-4" />
										)}
										{s.name}
									</Button>
								);
							})}
						</nav>
					</div>

					{/* Main Content */}
					<div className="flex flex-col flex-1 overflow-hidden">
						<DialogHeader className="p-6 pb-0 pr-16">
							<DialogTitle className="text-2xl">{getStepTitle()}</DialogTitle>
							<div className="pt-2 md:hidden">
								<Progress
									value={(step / (WIZARD_STEPS.length - 1)) * 100}
									className="w-full"
								/>
								<p className="text-sm text-muted-foreground text-center mt-1">
									Step {step} of {WIZARD_STEPS.length - 1}
								</p>
							</div>
						</DialogHeader>

						<div className="flex-grow overflow-hidden relative p-6">
							{renderStepContent()}
						</div>

						{!isCreating && !isSuccess && (
							<DialogFooter className="p-6 border-t bg-background">
								<div className="w-full flex justify-between items-center">
									<Button
										variant="secondaryOutline"
										onClick={prevStep}
										disabled={step === 0}
									>
										<ArrowLeft className="mr-2 h-4 w-4" /> Back
									</Button>
									{step < WIZARD_STEPS.length - 1 ? (
										<Button
											onClick={handleNextStep}
											disabled={isNextDisabled(step, formData)}
										>
											Next <ArrowRight className="ml-2 h-4 w-4" />
										</Button>
									) : (
										<Button onClick={handleCreateMentor}>
											<Sparkles className="mr-2 h-4 w-4" /> Create Mentor
										</Button>
									)}
								</div>
							</DialogFooter>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
