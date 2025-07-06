import { useEffect, useRef, useState } from "react";
import type { ChatMessage, FormData, TestMode } from "../types";

export const useMentorTest = (formData: FormData) => {
	const [testMode, setTestMode] = useState<TestMode>(null);
	const [chatInput, setChatInput] = useState("");
	const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
	const [isMentorTyping, setIsMentorTyping] = useState(false);
	const [callDuration, setCallDuration] = useState(0);
	const chatContainerRef = useRef<HTMLDivElement>(null);

	// Auto-scroll chat to bottom
	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	});

	// Call timer
	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (testMode === "call") {
			setCallDuration(0);
			timer = setInterval(() => {
				setCallDuration((prev) => prev + 1);
			}, 1000);
		}
		return () => {
			clearInterval(timer);
		};
	}, [testMode]);

	const handleSendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		if (!chatInput.trim()) return;

		const newMessages = [
			...chatMessages,
			{ sender: "user" as const, text: chatInput },
		];
		setChatMessages(newMessages);
		setChatInput("");
		setIsMentorTyping(true);

		setTimeout(() => {
			const mentorResponse = `That's an interesting question. As your '${
				formData.name || "AI Mentor"
			}', I would suggest considering...`;
			setChatMessages([
				...newMessages,
				{ sender: "mentor" as const, text: mentorResponse },
			]);
			setIsMentorTyping(false);
		}, 1500);
	};

	const resetTest = () => {
		setTestMode(null);
		setChatMessages([]);
		setChatInput("");
		setIsMentorTyping(false);
		setCallDuration(0);
	};

	return {
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
	};
};
