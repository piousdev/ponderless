
export type Assessment = {
	id: string;
	title: string;
	category: string;
	duration: number;
	questions?: number;
	tasks?: number | string;
	measures: string[];
	difficulty: "Beginner" | "Intermediate" | "Advanced" | "All levels" | "Beginner-Intermediate" | "Intermediate-Advanced";
	tags: string[];
	description: string;
};

export const assessmentsData: Assessment[] = [
    // 1. Critical Thinking Tests
    {
        id: "watson-glaser",
        title: "Watson-Glaser Critical Thinking Appraisal",
        category: "Critical Thinking",
        duration: 30,
        questions: 40,
        measures: ["Inference", "Assumptions", "Deduction", "Interpretation", "Argument evaluation"],
        difficulty: "Intermediate-Advanced",
        tags: ["Logic", "Analysis", "Professional", "Standard"],
        description: "Measures your ability to evaluate arguments objectively and make sound judgments."
    },
    {
        id: "cornell-cctt",
        title: "Cornell Critical Thinking Test (CCTT)",
        category: "Critical Thinking",
        duration: 20,
        questions: 30,
        measures: ["Induction", "Deduction", "Credibility", "Assumptions"],
        difficulty: "Beginner-Intermediate",
        tags: ["Logic", "Analysis", "Standard"],
        description: "Assesses critical thinking skills with a focus on induction and deduction."
    },
    {
        id: "california-ctst",
        title: "California Critical Thinking Skills Test",
        category: "Critical Thinking",
        duration: 45,
        questions: 50,
        measures: ["Analysis", "Evaluation", "Inference", "Deductive/inductive reasoning"],
        difficulty: "Advanced",
        tags: ["Logic", "Analysis", "Comprehensive", "Expert"],
        description: "A comprehensive test for measuring higher-order critical thinking skills."
    },
    {
        id: "logical-reasoning",
        title: "Logical Reasoning Assessment",
        category: "Critical Thinking",
        duration: 15,
        questions: 20,
        measures: ["Syllogisms", "Logical sequences", "Pattern recognition"],
        difficulty: "Intermediate",
        tags: ["Logic", "Short", "Practice"],
        description: "Focuses on logical sequences, pattern recognition, and syllogisms."
    },

    // 2. Decision Making Tests
    {
        id: "dmi",
        title: "Decision Making Index (DMI)",
        category: "Decision Making",
        duration: 20,
        questions: 35,
        measures: ["Decision speed", "Confidence", "Style", "Risk tolerance"],
        difficulty: "Intermediate",
        tags: ["Speed", "Accuracy", "Professional", "Standard"],
        description: "Measures key factors in your decision-making process."
    },
    {
        id: "melbourne-dmq",
        title: "Melbourne Decision Making Questionnaire",
        category: "Decision Making",
        duration: 15,
        questions: 22,
        measures: ["Vigilance", "Buck-passing", "Procrastination", "Hypervigilance"],
        difficulty: "Beginner",
        tags: ["Style", "Personal", "Short"],
        description: "Identifies your personal decision-making style and potential pitfalls."
    },
    {
        id: "crt",
        title: "Cognitive Reflection Test (CRT)",
        category: "Decision Making",
        duration: 5,
        questions: 7,
        measures: ["Intuitive vs reflective decision-making"],
        difficulty: "Beginner",
        tags: ["Quick", "Logic", "Baseline"],
        description: "A famous test to measure your tendency to override intuition."
    },
    {
        id: "decision-style-inventory",
        title: "Decision Style Inventory",
        category: "Decision Making",
        duration: 10,
        questions: 20,
        measures: ["Rational", "Intuitive", "Dependent", "Avoidant", "Spontaneous styles"],
        difficulty: "Beginner",
        tags: ["Style", "Personal", "Short"],
        description: "Reveals your dominant decision-making style."
    },
    {
        id: "micro-decision-speed",
        title: "Micro-Decision Speed Test",
        category: "Decision Making",
        duration: 8,
        tasks: "50 quick choices",
        measures: ["Speed vs accuracy in rapid decisions"],
        difficulty: "All levels",
        tags: ["Speed", "Accuracy", "Quick"],
        description: "Tests your ability to make rapid decisions without sacrificing accuracy."
    },

    // 3. Cognitive Bias Tests
    {
        id: "bias-battery",
        title: "Comprehensive Bias Assessment Battery",
        category: "Cognitive Bias",
        duration: 30,
        questions: 60,
        measures: ["12 common biases"],
        difficulty: "Intermediate",
        tags: ["Analysis", "Professional", "Standard"],
        description: "A wide-ranging test to identify your susceptibility to multiple cognitive biases."
    },
    {
        id: "anchoring-bias",
        title: "Anchoring Bias Test",
        category: "Cognitive Bias",
        duration: 10,
        questions: 15,
        measures: ["Susceptibility to numerical anchoring"],
        difficulty: "Beginner",
        tags: ["Bias", "Financial", "Short"],
        description: "Measures how initial pieces of information affect your judgments."
    },
    {
        id: "confirmation-bias",
        title: "Confirmation Bias Assessment",
        category: "Cognitive Bias",
        duration: 15,
        questions: 20,
        measures: ["Information seeking and interpretation patterns"],
        difficulty: "Intermediate",
        tags: ["Bias", "Analysis", "Short"],
        description: "Assesses your tendency to favor information that confirms your existing beliefs."
    },
    {
        id: "availability-heuristic",
        title: "Availability Heuristic Test",
        category: "Cognitive Bias",
        duration: 8,
        questions: 12,
        measures: ["Judgment based on easily recalled information"],
        difficulty: "Beginner",
        tags: ["Bias", "Quick", "Practice"],
        description: "Tests how easily recalled memories influence your judgments."
    },
    {
        id: "sunk-cost-fallacy",
        title: "Sunk Cost Fallacy Test",
        category: "Cognitive Bias",
        duration: 10,
        tasks: "10 scenarios",
        measures: ["Ability to ignore irrelevant past investments"],
        difficulty: "Beginner",
        tags: ["Bias", "Financial", "Short"],
        description: "Measures your ability to make decisions without regard for past investments."
    },
    {
        id: "dunning-kruger",
        title: "Dunning-Kruger Effect Assessment",
        category: "Cognitive Bias",
        duration: 12,
        questions: 25,
        measures: ["Self-assessment accuracy"],
        difficulty: "Intermediate",
        tags: ["Bias", "Personal", "Short"],
        description: "Assesses the accuracy of your self-perception of your skills."
    },

    // 4. Risk Assessment Tests
    {
        id: "risk-tolerance-q",
        title: "Risk Tolerance Questionnaire",
        category: "Risk Assessment",
        duration: 15,
        questions: 25,
        measures: ["Financial, social, ethical risk tolerance"],
        difficulty: "Beginner",
        tags: ["Financial", "Social", "Short"],
        description: "Evaluates your willingness to take risks across different domains."
    },
    {
        id: "bart",
        title: "Balloon Analogue Risk Task (BART)",
        category: "Risk Assessment",
        duration: 10,
        tasks: "Balloon inflation game",
        measures: ["Risk-taking behavior in real-time"],
        difficulty: "All levels",
        tags: ["Behavioral", "Quick", "Practice"],
        description: "An interactive game to measure your real-time risk-taking behavior."
    },
    {
        id: "dospert",
        title: "Domain-Specific Risk Taking Scale",
        category: "Risk Assessment",
        duration: 20,
        questions: 40,
        measures: ["Risk attitudes across 5 domains"],
        difficulty: "Intermediate",
        tags: ["Financial", "Social", "Professional", "Standard"],
        description: "Assesses your risk-taking attitudes in five different content domains."
    },
    {
        id: "uncertainty-tolerance",
        title: "Uncertainty Tolerance Test",
        category: "Risk Assessment",
        duration: 12,
        questions: 20,
        measures: ["Comfort with ambiguous situations"],
        difficulty: "Beginner",
        tags: ["Personal", "Short"],
        description: "Measures your ability to handle uncertainty and ambiguity."
    },

    // 5. Problem Solving Tests
    {
        id: "tower-of-london",
        title: "Tower of London Test",
        category: "Problem Solving",
        duration: 15,
        tasks: "12 puzzles",
        measures: ["Planning and problem-solving"],
        difficulty: "Intermediate",
        tags: ["Logic", "Planning", "Short"],
        description: "A classic neuropsychological test of planning and foresight."
    },
    {
        id: "ravens-matrices",
        title: "Raven's Progressive Matrices",
        category: "Problem Solving",
        duration: 25,
        questions: 36,
        measures: ["Abstract reasoning and fluid intelligence"],
        difficulty: "Advanced",
        tags: ["Logic", "Analysis", "Standard"],
        description: "A non-verbal test of abstract reasoning and problem-solving ability."
    },
    {
        id: "sjt",
        title: "Situational Judgment Test",
        category: "Problem Solving",
        duration: 30,
        tasks: "20 scenarios",
        measures: ["Practical problem-solving in work contexts"],
        difficulty: "Intermediate",
        tags: ["Professional", "Social", "Standard"],
        description: "Presents realistic work-related scenarios to assess your judgment."
    },
    {
        id: "creative-problem-solving",
        title: "Creative Problem Solving Assessment",
        category: "Problem Solving",
        duration: 20,
        tasks: "Mixed creative challenges",
        measures: ["Divergent thinking", "Innovation"],
        difficulty: "All levels",
        tags: ["Creativity", "Standard"],
        description: "Measures your ability to think outside the box and generate novel solutions."
    },

    // 6. Personality & Style Assessments
    {
        id: "big-five-decision",
        title: "Big Five Decision Styles",
        category: "Personality & Style",
        duration: 15,
        questions: 44,
        measures: ["How personality affects decisions"],
        difficulty: "Beginner",
        tags: ["Style", "Personal", "Short"],
        description: "Connects your Big Five personality traits to your decision-making style."
    },
    {
        id: "thinking-style-inventory",
        title: "Thinking Style Inventory",
        category: "Personality & Style",
        duration: 20,
        questions: 40,
        measures: ["Analytical, practical, creative thinking preferences"],
        difficulty: "Beginner",
        tags: ["Style", "Personal", "Standard"],
        description: "Identifies your preferred modes of thinking."
    },
    {
        id: "emotional-decision-making",
        title: "Emotional Decision Making Scale",
        category: "Personality & Style",
        duration: 12,
        questions: 24,
        measures: ["Role of emotions in decisions"],
        difficulty: "Beginner",
        tags: ["Style", "Personal", "Short"],
        description: "Assesses the influence of emotions on your decision-making process."
    },
    {
        id: "maximizer-satisficer",
        title: "Maximizer vs Satisficer Scale",
        category: "Personality & Style",
        duration: 8,
        questions: 13,
        measures: ["Decision-making approach"],
        difficulty: "Beginner",
        tags: ["Style", "Quick", "Baseline"],
        description: "Determines whether you seek the best possible option or one that is good enough."
    }
];

export const filterOptions = {
    category: [
        "Critical Thinking",
        "Decision Making",
        "Cognitive Bias",
        "Risk Assessment",
        "Problem Solving",
        "Personality & Style",
    ],
    difficulty: ["Beginner", "Intermediate", "Advanced", "All levels"],
    time: ["Quick (<10 min)", "Short (10-20 min)", "Standard (20-30 min)", "Comprehensive (30+ min)"],
    tags: ["Logic", "Analysis", "Speed", "Accuracy", "Creativity", "Professional", "Personal", "Financial", "Social", "Practice", "Baseline", "Certification"]
};
