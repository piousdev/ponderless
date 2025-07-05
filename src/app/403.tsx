"use client";

import { ArrowLeft, Home, LogIn, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shadcn/ui/button";

export default function Forbidden() {
	const router = useRouter();

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<div className="w-full max-w-2xl">
				{/* Main Error Card */}
				<div className="bg-card rounded-2xl shadow-xl p-8 md:p-12 text-center">
					{/* 403 Display with Shield Icon */}
					<div className="mb-8">
						<div className="flex items-center justify-center text-8xl md:text-9xl font-black text-muted-foreground/20 select-none mb-6">
							<span>4</span>
							<div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full mx-2 md:mx-4">
								<Shield className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
							</div>
							<span>3</span>
						</div>
					</div>

					{/* Title and Description */}
					<div className="space-y-4 mb-10">
						<h1 className="text-3xl md:text-4xl font-bold text-card-foreground">
							Access Forbidden
						</h1>
						<p className="text-lg text-muted-foreground max-w-md mx-auto">
							You don't have permission to access this resource. Please check
							your credentials or contact support.
						</p>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
						<Button
							onClick={() => router.back()}
							variant="default"
							size="lg"
							className="w-full sm:w-auto h-12"
						>
							<ArrowLeft className="w-5 h-5 mr-2" />
							Go Back
						</Button>

						<Button
							asChild
							variant="primary"
							size="lg"
							className="w-full sm:w-auto h-12"
						>
							<Link href="/signin">
								<LogIn className="w-5 h-5 mr-2" />
								Sign In
							</Link>
						</Button>

						<Button
							asChild
							variant="primaryOutline"
							size="lg"
							className="w-full sm:w-auto h-12"
						>
							<Link href="/">
								<Home className="w-5 h-5 mr-2" />
								Go Home
							</Link>
						</Button>
					</div>

					{/* Helpful Links */}
					<div className="pt-8 border-t border-border">
						<p className="text-sm text-muted-foreground mb-4">
							Need help? Try these options:
						</p>
						<div className="flex flex-wrap gap-2 justify-center">
							<Button variant="ghost" size="sm" asChild>
								<Link href="/signin">Sign In</Link>
							</Button>
							<Button variant="ghost" size="sm" asChild>
								<Link href="/signup">Sign Up</Link>
							</Button>
							<Button variant="ghost" size="sm" asChild>
								<Link href="/mentor">Mentor</Link>
							</Button>
						</div>
					</div>
				</div>

				{/* Subtle footer */}
				<p className="text-xs text-muted-foreground text-center mt-6">
					Error Code: 403 • Access Forbidden
				</p>
			</div>
		</div>
	);
}
