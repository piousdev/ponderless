import {
	ArrowLeft,
	MessageCircle,
	MicOff,
	Phone,
	PhoneOff,
	Send,
	User,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/shadcn/ui/avatar";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { cn } from "@/lib/utils";
import type { ChatMessage, FormData, TestMode } from "../types";
import { formatDuration } from "../utils";

interface TestMentorStepProps {
	formData: FormData;
	testMode: TestMode;
	setTestMode: (mode: TestMode) => void;
	chatInput: string;
	setChatInput: (input: string) => void;
	chatMessages: ChatMessage[];
	isMentorTyping: boolean;
	callDuration: number;
	chatContainerRef: React.RefObject<HTMLDivElement | null>;
	onSendMessage: (e: React.FormEvent) => void;
	onSkipStep: () => void;
	onEndCall: () => void;
}

export const TestMentorStep = ({
	formData,
	testMode,
	setTestMode,
	chatInput,
	setChatInput,
	chatMessages,
	isMentorTyping,
	callDuration,
	chatContainerRef,
	onSendMessage,
	onSkipStep,
	onEndCall,
}: TestMentorStepProps) => {
	return (
		<div className="flex flex-col h-full">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">Test Your Mentor</h3>
				{testMode && (
					<Button variant="ghost" size="sm" onClick={() => setTestMode(null)}>
						<ArrowLeft className="mr-2 h-4 w-4" /> Back to selection
					</Button>
				)}
			</div>

			{!testMode ? (
				<div className="flex flex-col items-center justify-center flex-grow">
					<p className="text-sm text-muted-foreground mb-4">
						How would you like to interact?
					</p>
					<div className="flex gap-4">
						<Button
							variant="secondaryOutline"
							size="lg"
							onClick={() => setTestMode("chat")}
						>
							<MessageCircle className="mr-2 h-5 w-5" /> Chat
						</Button>
						<Button
							variant="secondaryOutline"
							size="lg"
							onClick={() => setTestMode("call")}
						>
							<Phone className="mr-2 h-5 w-5" /> Call
						</Button>
					</div>
				</div>
			) : testMode === "chat" ? (
				<div className="flex flex-col flex-grow mt-2 border rounded-lg bg-muted/20 overflow-hidden">
					<div
						ref={chatContainerRef}
						className="flex-grow overflow-y-auto p-4 space-y-4"
					>
						{chatMessages.map((msg, index) => (
							<div
								key={`${msg.sender}-${index}-${msg.text.slice(0, 20)}`}
								className={cn(
									"flex items-end gap-2",
									msg.sender === "user" ? "justify-end" : "justify-start",
								)}
							>
								{msg.sender === "mentor" && (
									<Avatar className="h-8 w-8">
										<AvatarFallback>
											{formData.name ? formData.name.charAt(0) : "M"}
										</AvatarFallback>
									</Avatar>
								)}
								<p
									className={cn(
										"max-w-xs rounded-lg px-3 py-2",
										msg.sender === "user"
											? "bg-primary text-primary-foreground"
											: "bg-background border",
									)}
								>
									{msg.text}
								</p>
							</div>
						))}
						{isMentorTyping && (
							<div className="flex items-end gap-2 justify-start">
								<Avatar className="h-8 w-8">
									<AvatarFallback>
										{formData.name ? formData.name.charAt(0) : "M"}
									</AvatarFallback>
								</Avatar>
								<p className="max-w-xs rounded-lg px-3 py-2 bg-background border animate-pulse">
									...
								</p>
							</div>
						)}
					</div>
					<form
						onSubmit={onSendMessage}
						className="flex gap-2 p-2 border-t bg-background"
					>
						<Input
							value={chatInput}
							onChange={(e) => setChatInput(e.target.value)}
							placeholder="Ask a question..."
							disabled={isMentorTyping}
						/>
						<Button type="submit" disabled={isMentorTyping}>
							<Send className="h-4 w-4" />
						</Button>
					</form>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center flex-grow mt-2 border rounded-lg bg-muted/20">
					<Avatar className="w-24 h-24 mb-4">
						<AvatarFallback className="text-4xl">
							{formData.name ? formData.name.charAt(0) : <User />}
						</AvatarFallback>
					</Avatar>
					<h4 className="text-xl font-semibold">
						{formData.name || "AI Mentor"}
					</h4>
					<p className="text-muted-foreground text-lg font-mono mt-2">
						{formatDuration(callDuration)}
					</p>
					<div className="flex gap-4 mt-8">
						<Button
							variant="secondary"
							size="icon"
							className="w-14 h-14 rounded-full"
						>
							<MicOff className="h-6 w-6" />
						</Button>
						<Button
							variant="destructive"
							size="icon"
							className="w-14 h-14 rounded-full"
							onClick={onEndCall}
						>
							<PhoneOff className="h-6 w-6" />
						</Button>
					</div>
				</div>
			)}
			<div className="text-center mt-4">
				<Button variant="secondaryOutline" onClick={onSkipStep}>
					Skip this step
				</Button>
			</div>
		</div>
	);
};
