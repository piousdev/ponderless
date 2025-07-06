"use client";

import { useState } from "react";
import { categories, changelogData } from "@/config/changelog-data";
import ChangelogNav from "./changelog-nav";
import ChangelogTimeline from "./changelog-timeline";

export default function Changelog() {
	const [activeCategory, setActiveCategory] = useState("News");

	const filteredData = changelogData.filter(
		(item) => item.category === activeCategory,
	);

	return (
		<div className="min-h-screen w-full text-foreground">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<header className="text-center mb-12">
					<div className="inline-block bg-card rounded-full px-4 py-1 text-sm font-semibold text-muted-foreground shadow-sm mb-4">
						What's New
					</div>
					<h1 className="text-5xl md:text-6xl font-bold tracking-tight">
						News & Updates
					</h1>
					<p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
						Rank and score updates and feature requests so you know you're
						working on the most impactful things.
					</p>
				</header>

				<div className="flex flex-col md:flex-row md:space-x-12">
					<ChangelogNav
						categories={categories}
						activeCategory={activeCategory}
						setActiveCategoryAction={setActiveCategory}
					/>
					<main className="flex-1 mt-8 md:mt-0">
						<ChangelogTimeline items={filteredData} />
					</main>
				</div>
			</div>
		</div>
	);
}
