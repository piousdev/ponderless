import {
	BookOpen,
	Calendar,
	CheckCircle2,
	ClipboardList,
	LineChart,
	Target,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/shadcn/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/shadcn/ui/table";

const StatCard = ({
	icon: Icon,
	title,
	value,
	description,
}: {
	icon: React.ElementType;
	title: string;
	value: string;
	description: string;
}) => (
	<Card>
		<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle className="text-sm font-medium">{title}</CardTitle>
			<Icon className="h-4 w-4 text-muted-foreground" />
		</CardHeader>
		<CardContent>
			<div className="text-2xl font-bold">{value}</div>
			<p className="text-xs text-muted-foreground">{description}</p>
		</CardContent>
	</Card>
);

const NavCard = ({
	icon: Icon,
	title,
	description,
	href,
}: {
	icon: React.ElementType;
	title: string;
	description: string;
	href: string;
}) => (
	<Link
		href={href}
		className="block hover:shadow-lg transition-shadow rounded-lg"
	>
		<Card className="h-full">
			<CardHeader>
				<Icon className="h-8 w-8 mb-2 text-spec-primary" />
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>{description}</CardDescription>
			</CardContent>
		</Card>
	</Link>
);

const recentResults = [
	{
		name: "Watson-Glaser Critical Thinking Test",
		score: "88%",
		date: "2024-06-28",
		change: "+5%",
	},
	{
		name: "Cognitive Reflection Test",
		score: "75%",
		date: "2024-06-15",
		change: "-2%",
	},
	{
		name: "Implicit Association Test",
		score: "92%",
		date: "2024-05-30",
		change: "+8%",
	},
];

export default function AssessmentsOverviewPage() {
	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-bold tracking-tight">
					Assessments Overview
				</h1>
				<p className="text-muted-foreground">
					Your central hub for tracking progress, scheduling new tests, and
					reviewing results.
				</p>
			</div>

			{/* Navigation Cards */}
			<div className="grid gap-6 md:grid-cols-3">
				<NavCard
					href="/progress/assessments/schedule"
					icon={Calendar}
					title="Schedule"
					description="View your upcoming assessments and plan your schedule."
				/>
				<NavCard
					href="/progress/assessments/results"
					icon={LineChart}
					title="Results"
					description="Analyze your performance and track your progress over time."
				/>
				<NavCard
					href="/progress/assessments/library"
					icon={BookOpen}
					title="Library"
					description="Browse and take new assessments to challenge your skills."
				/>
			</div>

			{/* Stats Overview */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<StatCard
					icon={CheckCircle2}
					title="Assessments Completed"
					value="28"
					description="12 this year"
				/>
				<StatCard
					icon={Target}
					title="Average Score"
					value="84%"
					description="+3% from last month"
				/>
				<StatCard
					icon={Calendar}
					title="Upcoming Assessments"
					value="3"
					description="1 due this week"
				/>
				<StatCard
					icon={ClipboardList}
					title="Skills Assessed"
					value="8"
					description="Critical Thinking, Decision Making..."
				/>
			</div>

			{/* Recent Activity */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Results</CardTitle>
					<CardDescription>
						Here are your latest assessment scores.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Assessment</TableHead>
								<TableHead className="text-center">Score</TableHead>
								<TableHead className="text-right">Date</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{recentResults.map((result) => (
								<TableRow key={result.name}>
									<TableCell className="font-medium">{result.name}</TableCell>
									<TableCell className="text-center">
										<Badge
											variant={
												result.change.startsWith("+")
													? "default"
													: "destructive"
											}
											className="w-20 justify-center"
										>
											{result.score} ({result.change})
										</Badge>
									</TableCell>
									<TableCell className="text-right text-muted-foreground">
										{result.date}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
