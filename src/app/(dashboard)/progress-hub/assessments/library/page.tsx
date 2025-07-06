"use client";

import { motion } from "framer-motion";
import { Clock, LayoutGrid, List, Search, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/shadcn/ui/accordion";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/shadcn/ui/card";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shadcn/ui/select";
import type { Assessment } from "@/lib/assessments-data";
import { assessmentsData, filterOptions } from "@/lib/assessments-data";

export default function LibraryPage() {
	const [layout, setLayout] = useState("grid");
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
		category: [],
		difficulty: [],
		time: [],
		tags: [],
	});

	const filteredAssessments = useMemo(() => {
		return assessmentsData.filter((assessment) => {
			const matchesSearch = assessment.title
				.toLowerCase()
				.includes(searchQuery.toLowerCase());

			const matchesCategory = activeFilters.category.length
				? activeFilters.category.includes(assessment.category)
				: true;

			const matchesDifficulty = activeFilters.difficulty.length
				? activeFilters.difficulty.includes(assessment.difficulty)
				: true;

			return matchesSearch && matchesCategory && matchesDifficulty;
		});
	}, [searchQuery, activeFilters]);

	const handleFilterChange = (category: string, value: string) => {
		setActiveFilters((prev) => {
			const newFilters = { ...prev };
			const currentCategoryFilters = newFilters[category] || [];

			if (currentCategoryFilters.includes(value)) {
				newFilters[category] = currentCategoryFilters.filter(
					(v) => v !== value,
				);
			} else {
				newFilters[category] = [...currentCategoryFilters, value];
			}

			return newFilters;
		});
	};

	return (
		<div className="flex gap-8">
			<aside className="w-1/4 sticky top-4 self-start">
				<h2 className="text-xl font-semibold mb-4">Filters</h2>
				<Accordion
					type="multiple"
					defaultValue={Object.keys(filterOptions)}
					className="w-full"
				>
					{Object.entries(filterOptions).map(([key, values]) => (
						<AccordionItem value={key} key={key}>
							<AccordionTrigger className="font-medium capitalize text-base">
								{key}
							</AccordionTrigger>
							<AccordionContent>
								<div className="space-y-2 pt-2">
									{values.map((value) => (
										<div key={value} className="flex items-center">
											<Checkbox
												id={`${key}-${value}`}
												onCheckedChange={() => handleFilterChange(key, value)}
											/>
											<Label
												htmlFor={`${key}-${value}`}
												className="ml-2 font-normal"
											>
												{value}
											</Label>
										</div>
									))}
								</div>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</aside>

			<main className="w-3/4">
				<div className="flex justify-between items-center mb-6">
					<div className="relative w-full max-w-md">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
						<Input
							placeholder="Search assessments..."
							className="pl-10"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<div className="flex items-center gap-2">
						<Select defaultValue="recommended">
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="recommended">Recommended</SelectItem>
								<SelectItem value="newest">Newest</SelectItem>
								<SelectItem value="popular">Popular</SelectItem>
							</SelectContent>
						</Select>
						<Button
							variant={layout === "grid" ? "default" : "ghost"}
							size="icon"
							onClick={() => setLayout("grid")}
						>
							<LayoutGrid className="h-5 w-5" />
						</Button>
						<Button
							variant={layout === "list" ? "default" : "ghost"}
							size="icon"
							onClick={() => setLayout("list")}
						>
							<List className="h-5 w-5" />
						</Button>
					</div>
				</div>

				<motion.div
					layout
					className={
						layout === "grid"
							? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
							: "space-y-4"
					}
				>
					{filteredAssessments.map((assessment) =>
						layout === "grid" ? (
							<AssessmentCard key={assessment.id} assessment={assessment} />
						) : (
							<AssessmentListItem key={assessment.id} assessment={assessment} />
						),
					)}
				</motion.div>
			</main>
		</div>
	);
}

import { Separator } from "@/components/shadcn/ui/separator";

function AssessmentListItem({ assessment }: { assessment: Assessment }) {
	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.2 }}
		>
			<Card className="hover:border-primary/80 hover:shadow-md transition-all duration-300 flex flex-col h-full">
				<CardHeader>
					<Badge variant="outline" className="w-fit mb-2">
						{assessment.category}
					</Badge>
					<CardTitle className="text-lg leading-tight">
						{assessment.title}
					</CardTitle>
				</CardHeader>
				<CardContent className="flex-grow">
					<p className="text-sm text-muted-foreground line-clamp-2">
						{assessment.description}
					</p>
				</CardContent>
				<CardFooter className="flex-col items-start gap-4">
					<Separator className="w-full" />
					<div className="flex justify-between w-full text-sm text-muted-foreground">
						<div className="flex items-center gap-1.5">
							<Clock className="h-4 w-4" />
							<span>{assessment.duration} min</span>
						</div>
						<div className="flex items-center gap-1.5">
							<TrendingUp className="h-4 w-4" />
							<span>{assessment.difficulty}</span>
						</div>
					</div>
					<Button className="w-full mt-2">Start Assessment</Button>
				</CardFooter>
			</Card>
		</motion.div>
	);
}

function AssessmentCard({ assessment }: { assessment: Assessment }) {
	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.2 }}
			className="h-full"
		>
			<Card className="h-full flex flex-col hover:border-primary/80 transition-colors duration-300">
				<CardHeader>
					<div className="flex justify-between items-center mb-2">
						<Badge variant="outline">{assessment.category}</Badge>
						<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
							<Clock className="h-4 w-4" />
							<span>{assessment.duration} min</span>
						</div>
					</div>
					<CardTitle className="text-lg leading-tight">
						{assessment.title}
					</CardTitle>
				</CardHeader>
				<CardContent className="flex-grow space-y-4">
					<p className="text-muted-foreground text-sm line-clamp-3">
						{assessment.description}
					</p>
					<div className="flex items-center text-sm text-muted-foreground gap-1.5">
						<TrendingUp className="h-4 w-4" />
						<span>{assessment.difficulty}</span>
					</div>
				</CardContent>
				<CardFooter className="flex-col items-start gap-4">
					<div className="flex flex-wrap gap-2">
						{assessment.tags.slice(0, 3).map((tag) => (
							<Badge key={tag} variant="secondary">
								{tag}
							</Badge>
						))}
					</div>
					<Button className="w-full">Start Assessment</Button>
				</CardFooter>
			</Card>
		</motion.div>
	);
}
