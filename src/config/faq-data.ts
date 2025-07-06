import type { AccordionSectionData } from "@/modules/mentors/components/help-accordion";

export const faqData = [
	{
		title: "Getting Started",
		items: [
			{
				value: "what-is-ponderless",
				question: "What is Ponderless?",
				answer:
					"Ponderless is a cognitive training platform that helps you overcome decision fatigue and improve your daily decision-making through personalized AI mentors and evidence-based exercises. We focus specifically on micro-decisions - the hundreds of small choices that drain your mental energy throughout the day.",
			},
			{
				value: "begin-journey",
				question: "How do I begin my journey with Ponderless?",
				answer:
					"Sign up on our website and complete a short cognitive assessment. We’ll pinpoint your decision-making patterns and cognitive biases, then customize practice exercises to your goals. You can even build your own AI mentor—calibrated to your thinking style—to guide you through everyday choices, critical-thinking drills, thought experiments and more, with real-time feedback that sharpens your judgement day after day.",
			},
			{
				value: "prior-experience",
				question: "Do I need any prior experience with cognitive training?",
				answer:
					"Not at all! Ponderless is designed for everyone, from complete beginners to those already familiar with cognitive enhancement. Our adaptive system adjusts to your skill level and progresses at your pace.",
			},
			{
				value: "time-commitment",
				question: "How much time do I need to commit daily?",
				answer:
					"We recommend 10-15 minutes per day for optimal results. Our micro-learning approach fits seamlessly into your routine with quick exercises you can complete during coffee breaks. Many users see improvements in decision clarity within the first two weeks.",
			},
			{
				value: "what-makes-different",
				question:
					"What makes Ponderless different from other brain training apps?",
				answer:
					"Unlike general brain training apps, we specifically target decision fatigue and micro-decisions. Our AI mentors provide personalized, conversational guidance that adapts to your unique thinking patterns, combined with a supportive community where users share their custom-trained mentors.",
			},
		],
	},
	{
		title: "Profile & Plans",
		items: [
			{
				value: "subscription-plans",
				question: "What subscription plans are available?",
				answer: {
					content: [
						{
							type: "paragraph",
							content: "We offer flexible plans to meet your needs:",
						},
						{
							type: "list",
							content: [
								"Free Plan: 1 basic assessment (one-time), up to 10 mentor consultations and basic exercises only",
								"Starter Tier (€14.99/month): up to 25 mentor consultations, Quarterly assessments (CRT + Decision Style), personalized exercises, progress tracking, and ability to save 2 custom mentors",
								"Professional Tier (€29.99/month): Everything in Starter Tier plus 100 mentor consultations/month, Monthly assessments (full battery), Unlimited custom mentors, advanced analytics, and ability to share mentors with the community, Priority support",
								"Premium Tier (€49.99/month): Everything in Professional Tier plus Unlimited consultations, Weekly assessments, Custom assessment creation, White-label mentors, Dedicated support",
								"Enterprise Tier €99/user/month (minimum 10 users): Everything in Premium, Custom assessments, Private infrastructure, SLA guarantees, On-premise option, Dedicated success manager",
							],
							listType: "ul",
						},
					],
				},
			},
			{
				value: "change-plan",
				question: "Can I change my plan anytime?",
				answer:
					"Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at your next billing cycle. If you upgrade mid-cycle, you'll be prorated for the remaining days.",
			},
			{
				value: "free-trial",
				question: "Is there a free trial?",
				answer:
					"New users get a 7-day free trial of our Professional plan to experience all features. No credit card required to start - we only ask for payment details when you choose to continue after the trial.",
			},
			{
				value: "update-profile",
				question: "How do I update my profile and preferences?",
				answer:
					"Navigate to your profile settings to update your information, adjust notification preferences, set learning goals, and customize your training focus areas. Your profile helps our mentors provide more relevant recommendations.",
			},
			{
				value: "pause-subscription",
				question: "Can I pause my subscription?",
				answer:
					"Yes, you can pause your subscription for up to 3 months if you need a break. Your progress, custom mentors, and data are saved, and you can resume exactly where you left off.",
			},
		],
	},
	{
		title: "Accounts",
		items: [
			{
				value: "data-protection",
				question: "How is my data protected?",
				answer:
					"We use bank-level encryption for all data transmission and storage. Your personal information is processed with privacy-first AI techniques. We're GDPR and CCPA compliant, and you can request data deletion at any time.",
			},
			{
				value: "device-access",
				question: "Can I access Ponderless from any device?",
				answer:
					"Yes! As a web application, Ponderless works on any device with a modern browser - desktop, laptop, tablet, or mobile. Your progress syncs automatically across all devices when you're logged in.",
			},
			{
				value: "data-cancellation",
				question: "What happens to my data if I cancel?",
				answer:
					"Your data remains accessible for 90 days after cancellation, giving you time to export or reactivate. After that, it's permanently deleted unless you choose to maintain a free account to preserve your progress and custom mentors.",
			},
			{
				value: "team-accounts",
				question: "Can I create a family or team account?",
				answer:
					"Professional and Enterprise plans support team features. You can invite colleagues, track group progress, and share custom mentors within your organization. Family sharing is available through our Professional plan for up to 5 members.",
			},
			{
				value: "reset-password",
				question: "How do I reset my password?",
				answer:
					"Click 'Forgot Password' on the login screen. We'll send a secure reset link to your registered email. For security, reset links expire after 24 hours.",
			},
		],
	},
	{
		title: "Meetings",
		items: [
			{
				value: "what-are-consultations",
				question: "What are mentor consultations?",
				answer:
					"Consultations are focused sessions with your AI mentor where you can work through specific decisions, explore complex problems, or dive deep into particular cognitive biases affecting your choices. Think of them as personalized coaching sessions.",
			},
			{
				value: "book-consultation",
				question: "How do I book a consultation with my mentor?",
				answer:
					"From your dashboard, click 'Start Consultation' to begin an immediate session with your primary mentor. You can also schedule consultations for specific times if you prefer to prepare questions in advance.",
			},
			{
				value: "consultation-topics",
				question: "What topics can I explore in consultations?",
				answer: {
					content: [
						{
							type: "paragraph",
							content: "Your mentor can help with:",
						},
						{
							type: "list",
							content: [
								"Breaking down complex decisions into manageable steps",
								"Identifying hidden biases in your thinking",
								"Developing decision frameworks for recurring situations",
								"Working through specific professional or personal choices",
								"Creating custom exercises for your unique challenges",
							],
							listType: "ul",
						},
					],
				},
			},
			{
				value: "consultation-length",
				question: "How long are mentor consultations?",
				answer:
					"Consultations are flexible - engage for as long as you need. Most users find 15-30 minute sessions most effective. Free plan users get up to 3 consultations for 10 minutes each, while paid plans offer unlimited access based on your plan.",
			},
			{
				value: "save-insights",
				question: "Can I save consultation insights?",
				answer:
					"Yes! Important insights, frameworks, and action items from your consultations are automatically saved to your profile. You can review, organize, and build upon these insights over time.",
			},
		],
	},
	{
		title: "Mentors",
		items: [
			{
				value: "what-are-mentors",
				question: "What exactly are Ponderless mentors?",
				answer:
					"Mentors are specialized AI agents trained in different decision-making philosophies, cognitive frameworks, and industry expertise. Each mentor has a unique personality and approach, from analytical system-thinkers to creative problem-solvers. You can choose from a library of pre-trained, community-shared mentors or create your own.",
			},
			{
				value: "choose-mentor",
				question: "How do I choose the right mentor?",
				answer: {
					content: [
						{
							type: "paragraph",
							content:
								"During onboarding, we'll match you with a primary mentor based on your assessment results. You can also browse our mentor library to find specialists in areas like:",
						},
						{
							type: "list",
							content: [
								"Strategic business decisions",
								"Personal life choices",
								"Creative problem-solving",
								"Risk assessment",
								"Time management decisions",
							],
							listType: "ul",
						},
					],
				},
			},
			{
				value: "multiple-mentors",
				question: "Can I work with multiple mentors?",
				answer:
					"Absolutely! Different mentors excel at different types of decisions. Essential users can save up to 3 custom mentors, while Professional users can create unlimited specialized mentors for various aspects of their life.",
			},
			{
				value: "mentor-adaptation",
				question: "How do mentors learn and adapt to me?",
				answer:
					"Your mentors learn from every interaction, remembering your goals, preferences, decision-making patterns, and past conversations. Over time, they become increasingly personalized to your unique needs while maintaining complete privacy.",
			},
			{
				value: "unique-mentors",
				question: "What makes each mentor unique?",
				answer: {
					paragraphs: [
						"Each mentor is trained with different cognitive frameworks (analytical, intuitive, systems-thinking), communication styles (direct, socratic, supportive), and specializations (career, relationships, health, finance).",
						"They also bring different cultural perspectives and decision-making philosophies to help you explore choices from multiple angles.",
					],
				},
			},
		],
	},
	{
		title: "Community",
		items: [
			{
				value: "how-community-works",
				question: "How does the community feature work?",
				answer:
					"Connect with other Ponderless users facing similar decision-making challenges. Share experiences, participate in challenges, and most uniquely - discover and use mentors that other users have trained and shared.",
			},
			{
				value: "share-mentor",
				question: "What does it mean to share my mentor publicly?",
				answer:
					"When you've trained a mentor that's particularly effective for certain types of decisions, you can share it with the community. Other users can then work with your mentor, while you receive recognition as a mentor curator.",
			},
			{
				value: "access-community-mentors",
				question: "How do I access community-shared mentors?",
				answer:
					"Browse the 'Community Mentors' section to discover specialized mentors created by other users. Filter by decision type, industry, rating, or specific challenges. You can preview a mentor's style before adding them to your roster.",
			},
			{
				value: "community-moderation",
				question: "Is the community moderated?",
				answer:
					"Yes, we maintain a positive, supportive environment through AI-assisted moderation. Our community guidelines prohibit spam, harassment, and harmful advice. Users can report concerns which are reviewed promptly.",
			},
			{
				value: "specialized-groups",
				question: "Can I create or join specialized groups?",
				answer:
					"Professional and Enterprise members can create private groups for teams, industries, or specific interests. All users can join public groups focused on topics like 'Startup Decisions,' 'Career Transitions,' or 'Daily Productivity Choices.'",
			},
			{
				value: "community-challenges",
				question: "How do community challenges work?",
				answer:
					"Monthly challenges focus on specific decision-making skills (e.g., 'Overcome Analysis Paralysis' or 'Master Quick Decisions'). Participate to earn badges, unlock exclusive mentor templates, and connect with others working on similar goals.",
			},
		],
	},
] as AccordionSectionData[];
