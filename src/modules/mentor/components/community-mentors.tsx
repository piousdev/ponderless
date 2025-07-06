"use client";

import { useState } from "react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/shadcn/ui/avatar";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";

type Mentor = {
	id: number;
	name: string;
	avatarUrl: string;
	expertise: string[];
	bio: string;
	isAvailable: boolean;
};

export const communityMentorsData: Mentor[] = [
	{
		id: 10,
		name: "Dr. Kenji Tanaka",
		avatarUrl: "/japanese-male-scholar.png",
		expertise: ["Stoicism", "Emotional Regulation", "Resilience"],
		bio: "Focuses on ancient wisdom to build mental resilience in high-pressure environments.",
		isAvailable: true,
	},
	{
		id: 11,
		name: "Sofia Navarro",
		avatarUrl: "/creative-strategist-portrait.png",
		expertise: ["Lateral Thinking", "Creativity", "Challenging Assumptions"],
		bio: "Guides individuals and teams to approach problems from unconventional angles.",
		isAvailable: false,
	},
	{
		id: 12,
		name: "Dr. Ben Carter",
		avatarUrl: "/placeholder-dbolm.png",
		expertise: ["Ethics", "Logic", "Socratic Method"],
		bio: "A philosophy professor dedicated to teaching the art of clear, logical argumentation.",
		isAvailable: true,
	},
];

export default function CommunityMentors({
	searchTerm,
}: {
	searchTerm: string;
}) {
	const filteredMentors = communityMentorsData.filter(
		(mentor) =>
			mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			mentor.expertise.some((e) =>
				e.toLowerCase().includes(searchTerm.toLowerCase()),
			),
	);

	return (
		<>
			<div className="space-y-4">
				{filteredMentors.map((mentor) => (
					<Card key={mentor.id}>
						<CardContent className="p-4 flex items-center gap-4">
							<Avatar className="h-12 w-12 border">
								<AvatarImage
									src={mentor.avatarUrl || "/placeholder.svg"}
									alt={mentor.name}
								/>
								<AvatarFallback>{mentor.name.substring(0, 2)}</AvatarFallback>
							</Avatar>
							<div className="flex-1">
								<div className="flex items-center gap-2">
									<h3 className="font-semibold">{mentor.name}</h3>
									{mentor.isAvailable && (
										<div
											className="h-2 w-2 rounded-full bg-green-500"
											title="Available now"
										/>
									)}
								</div>
								<p className="text-sm text-muted-foreground truncate max-w-md">
									{mentor.bio}
								</p>
								<div className="flex flex-wrap gap-1 mt-2">
									{mentor.expertise.map((skill) => (
										<Badge key={skill} variant="secondary" className="text-xs">
											{skill}
										</Badge>
									))}
								</div>
							</div>
							<Button variant="ghost" size="sm" className="cursor-pointer">
								Learn More
							</Button>
							<Button variant="secondary" size="sm" className="cursor-pointer">
								Add
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</>
	);
}
