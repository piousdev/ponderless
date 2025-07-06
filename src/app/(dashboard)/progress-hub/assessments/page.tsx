import {
	BrainCircuit,
	Filter,
	Info,
	Puzzle,
	Scale,
	Star,
	TargetIcon,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { Label } from "@/components/shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shadcn/ui/select";

const FilterPanel = () => (
	<Card className="hidden lg:block">
		<CardHeader>
			<CardTitle className="text-base flex items-center">
				<Filter className="h-4 w-4 mr-2" /> FILTER ASSESSMENTS
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-6">
			<div>
				<Label className="font-semibold">Type</Label>
				<div className="space-y-2 mt-2">
					<div className="flex items-center space-x-2">
						<Checkbox id={crypto.randomUUID()} defaultChecked />
						<Label htmlFor="type-ct">Critical Thinking</Label>
					</div>
					<div className="flex items-center space-x-2">
						<Checkbox id={crypto.randomUUID()} defaultChecked />
						<Label htmlFor="type-dm">Decision Making</Label>
					</div>
					<div className="flex items-center space-x-2">
						<Checkbox id={crypto.randomUUID()} />
						<Label htmlFor="type-cb">Cognitive Bias</Label>
					</div>
				</div>
			</div>
			<div>
				<Label className="font-semibold">Duration</Label>
				<RadioGroup defaultValue="5-15" className="mt-2 space-y-1">
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="all" id={crypto.randomUUID()} />
						<Label htmlFor="dur-all">All</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="<5" id={crypto.randomUUID()} />
						<Label htmlFor="dur-5">&lt; 5 minutes</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="5-15" id={crypto.randomUUID()} />
						<Label htmlFor="dur-15">5-15 minutes</Label>
					</div>
				</RadioGroup>
			</div>
			<div>
				<Label className="font-semibold">Difficulty</Label>
				<div className="space-y-2 mt-2">
					<div className="flex items-center space-x-2">
						<Checkbox id={crypto.randomUUID()} defaultChecked />
						<Label htmlFor="diff-b">Beginner</Label>
					</div>
					<div className="flex items-center space-x-2">
						<Checkbox id={crypto.randomUUID()} defaultChecked />
						<Label htmlFor="diff-i">Intermediate</Label>
					</div>
				</div>
			</div>
			<div className="flex space-x-2">
				<Button variant="secondary" className="w-full">
					Clear All
				</Button>
				<Button className="w-full bg-spec-primary hover:bg-spec-primary/90">
					Apply
				</Button>
			</div>
		</CardContent>
	</Card>
);

interface IRecommendedCard {
	title: string;
	icon: React.ElementType;
	tag: string;
	color: string;
}

const RecommendedCard = ({
	title,
	icon: Icon,
	tag,
	color,
}: IRecommendedCard) => (
	<Card className="hover:shadow-md transition-shadow">
		<CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
			<Icon className="h-10 w-10 text-spec-primary" />
			<p className="font-semibold">{title}</p>
			<Badge style={{ backgroundColor: color, color: "white" }}>{tag}</Badge>
		</CardContent>
	</Card>
);

interface IAssessmentCard {
	title: string;
	category: string;
	difficulty: string;
	time: string;
	rating: number;
	completions: string;
	lastScore: string;
	started: boolean;
}

const AssessmentCard = ({
	title,
	category,
	difficulty,
	time,
	rating,
	completions,
	lastScore,
	started,
}: IAssessmentCard) => (
	<Card>
		<CardContent className="p-4">
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="flex-shrink-0">
					<div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
						<BrainCircuit className="h-6 w-6 text-spec-primary" />
					</div>
				</div>
				<div className="flex-1">
					<h3 className="font-bold text-lg">{title}</h3>
					<p className="text-sm text-gray-500">
						{category} • {difficulty} • {time}
					</p>
					<div className="flex items-center gap-2 text-sm mt-1">
						<div className="flex text-amber-400">
							{Array(5)
								.fill(0)
								.map((_, i) => (
									<Star
										key={crypto.randomUUID()}
										className={`h-4 w-4 ${i < Math.round(rating) ? "fill-current" : ""}`}
									/>
								))}
						</div>
						<span>
							({rating}) • {completions} completions
						</span>
					</div>
					<p
						className={`${started ? "text-gray-800" : "text-blue-600"} text-sm mt-2 font-medium`}
					>
						{started ? `Last Score: ${lastScore}` : "Not Started"}
					</p>
					<p className="text-sm text-gray-600 mt-1 line-clamp-1">
						The gold standard for measuring critical thinking...
					</p>
				</div>
				<div className="flex sm:flex-col gap-2 self-start sm:self-center">
					<Button
						variant="default"
						className="bg-spec-primary hover:bg-spec-primary/90"
					>
						{started ? "Retake" : "Start"}
					</Button>
					<Button variant="secondary" size="icon">
						<Info className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function TestLibraryPage() {
	return (
		<div className="flex gap-6">
			<div className="w-full lg:w-1/4">
				<FilterPanel />
			</div>
			<div className="w-full lg:w-3/4 space-y-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex justify-between items-center">
							<span>Recommended for You</span>
							<Link
								href="#"
								className="text-sm font-medium text-spec-primary flex items-center gap-1 hover:underline"
							>
								See Why? <Info className="h-4 w-4" />
							</Link>
						</CardTitle>
					</CardHeader>
					<CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
						<RecommendedCard
							title="Pattern Recognition"
							icon={Puzzle}
							tag="NEW!"
							color="#4F46E5"
						/>
						<RecommendedCard
							title="Ethical Dilemmas"
							icon={Scale}
							tag="DUE SOON"
							color="#F59E0B"
						/>
						<RecommendedCard
							title="Decision Speed Test"
							icon={TargetIcon}
							tag="IMPROVE"
							color="#10B981"
						/>
					</CardContent>
				</Card>

				<div>
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
						<h2 className="text-xl font-bold">
							All Assessments (24 available)
						</h2>
						<Select defaultValue="recommended">
							<SelectTrigger className="w-full sm:w-[180px]">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="recommended">Sort: Recommended</SelectItem>
								<SelectItem value="newest">Sort: Newest</SelectItem>
								<SelectItem value="popular">Sort: Popular</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-4">
						<AssessmentCard
							title="Watson-Glaser Critical Thinking Test"
							category="Critical Thinking"
							difficulty="Intermediate"
							time="25 mins"
							rating={4.8}
							completions="15,420"
							lastScore="82% (Dec 15, 2024)"
							started={true}
						/>
						<AssessmentCard
							title="Cognitive Reflection Test (CRT)"
							category="Decision Making"
							difficulty="Beginner"
							time="5 mins"
							rating={4.2}
							completions="8,901"
							started={false}
							lastScore="Not Started"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
