import { Card, CardContent, CardHeader } from "@/components/shadcn/ui/card";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export default function ProgressHubLoading() {
	return (
		<div className="space-y-6">
			{/* Header skeleton - updated to match new layout */}
			<div className="flex flex-col mb-12 sm:flex-row justify-between items-start sm:items-center">
				<div className="space-y-2">
					<Skeleton className="h-9 w-80" />
					<Skeleton className="h-4 w-32" />
				</div>
				<Skeleton className="h-10 w-32 rounded-full mt-2 sm:mt-0" />
			</div>

			{/* Metrics cards skeleton - updated with dark mode support */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{[
					{ bg: "bg-sky-50 dark:bg-sky-950/50" },
					{ bg: "bg-rose-50 dark:bg-rose-950/50" },
					{ bg: "bg-green-50 dark:bg-green-950/50" },
					{ bg: "bg-yellow-50 dark:bg-yellow-950/50" },
				].map((metric, index) => (
					<Card key={crypto.randomUUID()} className={metric.bg}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-5 w-5" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-8 w-16 mb-2" />
							<Skeleton className="h-3 w-12" />
							{/* Add progress bar skeleton for second card */}
							{index === 1 && (
								<Skeleton className="h-1.5 w-full mt-2 rounded-full" />
							)}
							{/* Add dots skeleton for third card */}
							{index === 2 && (
								<div className="flex space-x-1 mt-2">
									{[...Array(10)].map(() => (
										<Skeleton
											key={crypto.randomUUID()}
											className="h-2 w-full rounded-full"
										/>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				))}
			</div>

			{/* Two column grid for Today's Focus and Recent Activity */}
			<div className="grid gap-6 md:grid-cols-2">
				{/* Today's focus card skeleton - updated with dark mode */}
				<Card className="flex flex-col justify-between bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-950/50 dark:to-sky-900/30">
					<CardHeader>
						<Skeleton className="h-6 w-32" />
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<Skeleton className="h-6 w-64 mb-2" />
							<Skeleton className="h-4 w-48" />
						</div>
					</CardContent>
					<div className="p-6 pt-0">
						<Skeleton className="h-10 w-full rounded-md" />
					</div>
				</Card>

				{/* Recent activity card skeleton - updated with dark mode */}
				<Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30">
					<CardHeader className="flex flex-row items-center justify-between">
						<Skeleton className="h-6 w-32" />
						<Skeleton className="h-4 w-16" />
					</CardHeader>
					<CardContent className="space-y-4">
						{["completed-test", "achievement-unlocked", "weekly-report"].map(
							(activity) => (
								<div key={activity} className="flex items-start space-x-3">
									<Skeleton className="h-5 w-5 mt-1 rounded-full" />
									<div className="space-y-1 flex-1">
										<Skeleton className="h-4 w-full" />
										<Skeleton className="h-3 w-24" />
									</div>
								</div>
							),
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
