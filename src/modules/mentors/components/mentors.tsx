import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";

const mentorsData = [
	{
		id: 1,
		name: "Dr. Evelyn Reed",
		expertise: ["Cognitive Biases", "Mental Models", "Decision Science"],
		bio: "Expert in identifying and mitigating cognitive biases to improve strategic decision-making.",
		isAvailable: true,
	},
	{
		id: 2,
		name: "Marcus Thorne",
		expertise: ["First-Principles Thinking", "Heuristics", "Problem Solving"],
		bio: "Helps leaders break down complex problems to their fundamental truths for innovative solutions.",
		isAvailable: false,
	},
];

export default function Mentors() {
	return (
		<div className="space-y-3">
			{mentorsData.map((mentor) => (
				<Card key={mentor.id} className="hover:shadow-sm transition-shadow">
					<CardContent className="p-4">
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<div className="flex items-center gap-2 mb-2">
									<h3 className="font-semibold text-lg">{mentor.name}</h3>
									{mentor.isAvailable && (
										<div className="h-2 w-2 rounded-full bg-green-500" />
									)}
								</div>
								<p className="text-sm text-muted-foreground mb-3 leading-relaxed">
									{mentor.bio}
								</p>
								<div className="flex flex-wrap gap-1.5">
									{mentor.expertise.map((skill) => (
										<Badge key={skill} variant="secondary" className="text-xs">
											{skill}
										</Badge>
									))}
								</div>
							</div>
							<div className="flex gap-2 ml-4">
								<Button
									variant="ghost"
									size="sm"
									className="w-full md:w-auto cursor-pointer"
								>
									Learn More
								</Button>
								<Button
									variant="secondary"
									size="sm"
									className="w-full md:w-auto cursor-pointer"
								>
									Connect
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
