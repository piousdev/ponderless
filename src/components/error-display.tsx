"use client";

import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shadcn/ui/button";

interface IErrorDisplay {
	title: string;
	message: string;
	onResetAction?: () => void;
	showGoBack?: boolean;
	showGoHome?: boolean;
	errorCode?: string;
	icon?: React.ReactNode;
}

export function ErrorDisplay({
	title,
	message,
	onResetAction,
	showGoBack = true,
	showGoHome = false,
	errorCode,
	icon,
}: IErrorDisplay) {
	const router = useRouter();

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<div className="w-full max-w-2xl">
				{/* Main Error Card */}
				<div className="bg-card rounded-2xl shadow-xl p-8 md:p-12 text-center">
					{/* Error Code Display (if provided) */}
					{errorCode && (
						<div className="mb-8">
							<div className="text-6xl md:text-7xl font-black text-muted-foreground/20 select-none mb-6">
								{errorCode}
							</div>
						</div>
					)}

					{/* Icon */}
					<div className="mb-8">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full">
							{icon || (
								<AlertTriangle className="w-8 h-8 text-muted-foreground" />
							)}
						</div>
					</div>

					{/* Title and Description */}
					<div className="space-y-4 mb-10">
						<h1 className="text-3xl md:text-4xl font-bold text-card-foreground">
							{title}
						</h1>
						<p className="text-lg text-muted-foreground max-w-md mx-auto">
							{message}
						</p>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						{showGoBack && (
							<Button
								onClick={() => router.back()}
								variant="default"
								size="lg"
								className="w-full sm:w-auto h-12"
							>
								<ArrowLeft className="w-5 h-5 mr-2" />
								Go Back
							</Button>
						)}

						{onResetAction && (
							<Button
								onClick={onResetAction}
								variant="primary"
								size="lg"
								className="w-full sm:w-auto h-12"
							>
								<RefreshCw className="w-5 h-5 mr-2" />
								Try Again
							</Button>
						)}

						{showGoHome && (
							<Button
								onClick={() => router.push("/")}
								variant="primary"
								size="lg"
								className="w-full sm:w-auto h-12"
							>
								<Home className="w-5 h-5 mr-2" />
								Go Home
							</Button>
						)}
					</div>
				</div>

				{/* Error Code Footer */}
				{errorCode && (
					<p className="text-xs text-muted-foreground text-center mt-6">
						Error Code: {errorCode}
					</p>
				)}
			</div>
		</div>
	);
}
