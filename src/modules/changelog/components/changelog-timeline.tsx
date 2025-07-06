import type { changelogData } from "@/config/changelog-data";

type IChangelogTimeline = {
	items: typeof changelogData;
};

export default function ChangelogTimeline({ items }: IChangelogTimeline) {
	if (items.length === 0) {
		return (
			<div className="text-center text-muted-foreground py-10">
				No updates for this category yet.
			</div>
		);
	}

	return (
		<div className="relative">
			{/* The vertical line */}
			<div
				className="absolute h-full w-0.5 bg-border"
				style={{ left: "200px", top: "2rem" }}
			/>
			{items.map((item) => (
				<div key={item.title} className="relative flex items-start mb-8">
					{/* Left side: Date */}
					<div className="flex-shrink-0 w-[180px] text-right pr-6 pt-6 flex items-center justify-end">
						<div className="inline-block bg-foreground text-background text-sm font-semibold rounded-full px-3 py-1 shadow-sm whitespace-nowrap">
							{item.date}
						</div>
					</div>
					{/* Dot */}
					<div className="absolute top-[1.875rem] left-[195px] size-3 bg-foreground rounded-full border-2 border-border" />
					{/* Right side: Card */}
					<div className="ml-16 flex-grow bg-background p-6 rounded-xl shadow-sm">
						<h3 className="font-bold text-lg text-foreground mb-2">
							{item.title}
						</h3>
						<p className="text-muted-foreground text-base leading-relaxed mb-4">
							{item.description}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
