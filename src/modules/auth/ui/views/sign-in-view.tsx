"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/shadcn/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";

// Simple validation schema
const signInSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignInView() {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<SignInForm>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// Auto-focus the email input on component mount
	useEffect(() => {
		// Use a small delay to ensure the component is fully rendered
		const timer = setTimeout(() => {
			const emailInput = document.querySelector(
				'input[type="email"]',
			) as HTMLInputElement;
			if (emailInput) {
				emailInput.focus();
			}
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	const onSubmit = async (data: SignInForm) => {
		setIsLoading(true);

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			console.log("Sign in attempt:", data);
			// Here you would typically call your authentication API
			// For now, just show success
			alert("Sign in successful!");
		} catch (error) {
			console.error("Sign in error:", error);
			form.setError("password", {
				message: "Invalid email or password",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Sign In Form */}
				<div className="bg-card rounded-2xl shadow-xl p-8">
					<div className="text-center">
						<h1 className="text-3xl font-bold text-card-foreground mb-2">
							Sign in to your account
						</h1>
					</div>
					{/* Sign Up Link */}
					<div className="text-center mb-8">
						<p className="text-sm text-muted-foreground">
							Don't have an account?{" "}
							<Link
								href="/signup"
								className="text-primary hover:text-primary/80 font-medium underline transition-colors"
							>
								Sign up
							</Link>
						</p>
					</div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{/* Email Field */}
							<FormField
								name="email"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-card-foreground font-medium">
											Email
										</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="corybarker@email.com"
												{...field}
												disabled={isLoading}
												className="h-12 text-base rounded-xl"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Password Field */}
							<FormField
								name="password"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-card-foreground font-medium">
											Password
										</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													type={showPassword ? "text" : "password"}
													placeholder="••••••••"
													{...field}
													disabled={isLoading}
													className="h-12 text-base rounded-xl pr-12"
												/>
												<Button
													type="button"
													variant="ghost"
													size="icon"
													className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
													onClick={() => setShowPassword(!showPassword)}
													disabled={isLoading}
												>
													{showPassword ? (
														<EyeOff className="h-5 w-5 text-muted-foreground" />
													) : (
														<Eye className="h-5 w-5 text-muted-foreground" />
													)}
												</Button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Sign In Button */}
							<Button
								type="submit"
								variant="primary"
								disabled={isLoading}
								className="w-full h-12 font-medium text-base rounded-xl"
							>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-5 w-5 animate-spin" />
										Signing in...
									</>
								) : (
									"Sign In"
								)}
							</Button>
						</form>
					</Form>

					{/* Forgot Password Link */}
					<div className="text-center mt-6">
						<Link
							href="/forgot-password"
							className="text-muted-foreground hover:text-primary font-medium underline transition-colors"
						>
							Forgot password
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
