"use client";
import {
	ArrowDown,
	ArrowRight,
	ArrowUp,
	BarChart,
	Download,
	Filter,
	Printer,
	Search,
} from "lucide-react";
import Link from "next/link";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import { Button } from "@/components/shadcn/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { Input } from "@/components/shadcn/ui/input";
import { Progress } from "@/components/shadcn/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shadcn/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/shadcn/ui/table";

const recentResults = [
	{
		assessment: "Anchoring Bias",
		date: "2023-10-23",
		score: "88%",
		time: "12m",
	},
	{
		assessment: "Watson-Glaser",
		date: "2023-10-22",
		score: "82%",
		time: "24m",
	},
	{
		assessment: "Risk Tolerance",
		date: "2023-10-21",
		score: "71%",
		time: "18m",
	},
	{
		assessment: "Decision Speed",
		date: "2023-10-20",
		score: "76%",
		time: "8m",
	},
];

const chartData = [
	{ date: "Jan", score: 65 },
	{ date: "Feb", score: 72 },
	{ date: "Mar", score: 78 },
	{ date: "Apr", score: 75 },
	{ date: "May", score: 82 },
	{ date: "Jun", score: 85 },
];

export default function MyResultsPage() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold flex items-center gap-2">
					<BarChart /> My Assessment Results
				</h1>
				<div className="flex gap-2">
					<Button className="gap-2">
						<Download className="h-4 w-4" /> Export
					</Button>
					<Button variant="secondary" className="gap-2">
						<Printer className="h-4 w-4" /> Print
					</Button>
				</div>
			</div>

			<Card>
				<CardHeader className="flex flex-row justify-between items-center">
					<CardTitle>Overall Performance</CardTitle>
					<Select defaultValue="last-6-months">
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Time Period" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="last-30-days">Last 30 Days</SelectItem>
							<SelectItem value="last-90-days">Last 90 Days</SelectItem>
							<SelectItem value="last-6-months">Last 6 Months</SelectItem>
							<SelectItem value="all-time">All Time</SelectItem>
						</SelectContent>
					</Select>
				</CardHeader>
				<CardContent>
					<div className="h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={chartData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" />
								<YAxis />
								<Tooltip />
								<Line
									type="monotone"
									dataKey="score"
									stroke="hsl(var(--primary))"
									strokeWidth={2}
									activeDot={{ r: 8 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			<div className="grid md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Performance by Category</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<PerformanceBar
							category="Critical Thinking"
							score={85}
							change={3}
						/>
						<PerformanceBar category="Decision Speed" score={72} change={8} />
						<PerformanceBar category="Bias Recognition" score={90} change={0} />
						<PerformanceBar category="Risk Assessment" score={68} change={-2} />
						<PerformanceBar category="Problem Solving" score={80} change={5} />
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Insights</CardTitle>
						<CardDescription>
							Actionable recommendations based on your results.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<InsightItem
							text="Your Decision Speed has improved significantly. Keep practicing with timed assessments."
							type="positive"
						/>
						<InsightItem
							text="Focus on Risk Assessment, as your scores are slightly below average."
							type="negative"
						/>
						<InsightItem
							text="You excel at Bias Recognition. Consider mentoring others in this area."
							type="neutral"
						/>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Recent Results</CardTitle>
					<div className="flex justify-between items-center pt-2">
						<div className="relative">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input placeholder="Search assessments..." className="pl-8" />
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="secondary" className="gap-2">
									<Filter className="h-4 w-4" /> Filter
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuCheckboxItem checked>
									Critical Thinking
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>
									Decision Speed
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>
									Bias Recognition
								</DropdownMenuCheckboxItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Assessment</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Score</TableHead>
								<TableHead>Time</TableHead>
								<TableHead>Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{recentResults.map((result) => (
								<TableRow key={result.assessment}>
									<TableCell className="font-medium">
										{result.assessment}
									</TableCell>
									<TableCell>{result.date}</TableCell>
									<TableCell>{result.score}</TableCell>
									<TableCell>{result.time}</TableCell>
									<TableCell>
										<Link
											href="#"
											className="text-primary font-medium hover:underline"
										>
											View Details
										</Link>
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

function PerformanceBar({
	category,
	score,
	change,
}: {
	category: string;
	score: number;
	change: number;
}) {
	return (
		<div className="space-y-1">
			<div className="flex justify-between items-center text-sm">
				<p className="font-medium">{category}</p>
				<div
					className={`flex items-center gap-1 ${
						change > 0
							? "text-green-500"
							: change < 0
								? "text-red-500"
								: "text-muted-foreground"
					}`}
				>
					{change > 0 ? (
						<ArrowUp className="h-3 w-3" />
					) : change < 0 ? (
						<ArrowDown className="h-3 w-3" />
					) : (
						<ArrowRight className="h-3 w-3" />
					)}
					{Math.abs(change)}%
				</div>
			</div>
			<Progress value={score} className="h-2" />
		</div>
	);
}

function InsightItem({
	text,
	type,
}: {
	text: string;
	type: "positive" | "negative" | "neutral";
}) {
	return (
		<div className="flex items-start gap-3">
			<div
				className={`mt-1 h-2 w-2 rounded-full ${
					type === "positive"
						? "bg-green-500"
						: type === "negative"
							? "bg-red-500"
							: "bg-yellow-500"
				}`}
			/>
			<p className="text-sm text-muted-foreground">{text}</p>
		</div>
	);
}
