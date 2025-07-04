"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shadcn/ui/select";
import { COUNTRIES } from "@/modules/auth/countries";

// Simple validation schema
const signUpSchema = z.object({
	fullName: z.string().min(2, "Full name must be at least 2 characters"),
	email: z.string().email("Please enter a valid email address"),
	country: z.string().min(1, "Please select a country"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUpView() {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<SignUpForm>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			fullName: "",
			email: "",
			country: "",
			password: "",
		},
	});

	// Auto-focus the full name input on component mount
	useEffect(() => {
		// Use a small delay to ensure the component is fully rendered
		const timer = setTimeout(() => {
			const fullNameInput = document.querySelector(
				'input[type="text"]',
			) as HTMLInputElement;
			if (fullNameInput) {
				fullNameInput.focus();
			}
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	const onSubmit = async (data: SignUpForm) => {
		setIsLoading(true);

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			console.log("Sign up attempt:", data);
			// Here you would typically call your authentication API
			// For now, just show success
			alert("Account created successfully!");
		} catch (error) {
			console.error("Sign up error:", error);
			form.setError("email", {
				message: "Email already exists",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignUp = async () => {
		console.log("Google sign up clicked");
		// Here you would integrate with Google OAuth
		// For example, using NextAuth or Firebase Auth
		alert("Google sign up not implemented yet");
	};

	return (
		<div className="min-h-screen bg-background flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Sign Up Form */}
				<div className="bg-card rounded-2xl shadow-xl p-8">
					<div className="text-center">
						<h1 className="text-3xl font-bold text-card-foreground mb-2">
							Create your account
						</h1>
					</div>
					{/* Sign In Link */}
					<div className="text-center mb-8">
						<p className="text-sm text-muted-foreground">
							Already have an account?{" "}
							<Link
								href="/signin"
								className="text-primary hover:text-primary/80 font-medium underline transition-colors"
							>
								Sign in
							</Link>
						</p>
					</div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{/* Full Name Field */}
							<FormField
								name="fullName"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-card-foreground font-medium">
											Full name
										</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="Corey Barker"
												{...field}
												disabled={isLoading}
												className="h-12 text-base rounded-xl"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

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

							{/* Country Field */}
							<FormField
								name="country"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-card-foreground font-medium">
											Country
										</FormLabel>
										<FormControl>
											<Select
												value={field.value}
												onValueChange={field.onChange}
												disabled={isLoading}
											>
												<SelectTrigger className="h-12 text-base rounded-xl">
													<SelectValue placeholder="Select your country" />
												</SelectTrigger>
												<SelectContent>
													{COUNTRIES.map((country) => (
														<SelectItem key={country.code} value={country.code}>
															{country.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
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

							{/* Register Button */}
							<Button
								type="submit"
								variant="primary"
								disabled={isLoading}
								className="w-full h-12 font-medium text-base rounded-xl"
							>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-5 w-5 animate-spin" />
										Creating account...
									</>
								) : (
									"Register"
								)}
							</Button>
						</form>
					</Form>

					{/* Or Divider */}
					<div className="my-6 text-center">
						<span className="text-muted-foreground text-sm">Or</span>
					</div>

					{/* Google Sign Up Button */}
					<Button
						type="button"
						onClick={handleGoogleSignUp}
						disabled={isLoading}
						variant="secondary"
						className="w-full h-12 font-medium text-base rounded-xl"
					>
						Continue with Google
					</Button>

					{/* Terms and Privacy */}
					<div className="mt-6 text-center">
						<p className="text-sm text-muted-foreground">
							By signing up, you agree to the{" "}
							<Link
								href="/terms"
								className="text-card-foreground hover:text-primary font-medium underline transition-colors"
							>
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link
								href="/privacy"
								className="text-card-foreground hover:text-primary font-medium underline transition-colors"
							>
								Privacy Policy
							</Link>
							.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
