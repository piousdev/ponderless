import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import MentorHeader from "@/modules/mentors/components/mentor-header";

export default function MentorsLoading() {
	return (
		<>
			<MentorHeader
				title="Your Mentors"
				description="Manage your one-on-one mentor relationships."
			/>
			<div className="space-y-4">
				{[...Array(2)].map(() => (
					<Card key={`mentor-loading-${crypto.randomUUID()}`}>
						<CardContent className="p-4 flex items-center gap-4">
							<Skeleton className="h-12 w-12 rounded-full" />
							<div className="flex-1 space-y-2">
								<Skeleton className="h-4 w-1/4" />
								<Skeleton className="h-4 w-3/4" />
								<div className="flex gap-2">
									<Skeleton className="h-5 w-20 rounded-full" />
									<Skeleton className="h-5 w-24 rounded-full" />
								</div>
							</div>
							<Skeleton className="h-9 w-24 rounded-md" />
							<Skeleton className="h-9 w-24 rounded-md" />
						</CardContent>
					</Card>
				))}
			</div>
		</>
	);
}
