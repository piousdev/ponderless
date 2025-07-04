"use client";

import { useId, useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { authClient } from "@/lib/auth/auth-client";

export function SignUpForm() {
	const { data: session } = authClient.useSession();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const nameId = useId();
	const emailId = useId();
	const passwordId = useId();

	const handleSignUp = async () => {
		setIsLoading(true);
		try {
			const response = await authClient.signUp.email(
				{
					email,
					name,
					password,
				},
				{
					onRequest: () => {
						console.log("Sending signup request...");
					},
					onResponse: (ctx) => {
						console.log("Response received:", ctx.response);
					},
					onError: (ctx) => {
						console.error("Sign up error context:", ctx);
						if (ctx.error) {
							console.error("Error details:", ctx.error);
							const errorMessage =
								ctx.error.message || "Failed to sign up. Please try again.";
							window.alert(errorMessage);
						} else {
							window.alert(
								"Error signing up. Please check your connection and try again.",
							);
						}
					},
					onSuccess: () => {
						console.log("Sign up successful!");
						window.alert("Signed up successfully!");
						// Reset form
						setName("");
						setEmail("");
						setPassword("");
					},
				},
			);
			console.log("Signup response:", response);
		} catch (error) {
			console.error("Sign up exception:", error);
			window.alert(
				`Error signing up: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
		} finally {
			setIsLoading(false);
		}
	};

	if (session) {
		return (
			<div className="flex flex-col gap-y-4 p-4">
				<h2 className="text-2xl font-semibold text-center">
					{session.user.name} Session has started!
				</h2>
				<div>You are already signed in!</div>
				<Button onClick={() => authClient.signOut()}>Sign Out</Button>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-y-4 max-w-md mx-auto p-4">
			<h2 className="text-2xl font-semibold text-center">Sign Up</h2>
			<div className="space-y-2">
				<Label htmlFor={nameId}>Name</Label>
				<Input
					id={nameId}
					type="text"
					value={name}
					placeholder="Enter your name"
					onChange={(e) => setName(e.target.value)}
					disabled={isLoading}
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor={emailId}>Email</Label>
				<Input
					id={emailId}
					type="email"
					value={email}
					placeholder="Enter your email"
					onChange={(e) => setEmail(e.target.value)}
					disabled={isLoading}
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor={passwordId}>Password</Label>
				<Input
					id={passwordId}
					type="password"
					value={password}
					placeholder="Enter your password"
					onChange={(e) => setPassword(e.target.value)}
					disabled={isLoading}
				/>
			</div>
			<Button
				onClick={handleSignUp}
				disabled={isLoading || !name || !email || !password}
				className="w-full"
			>
				{isLoading ? "Signing up..." : "Sign Up"}
			</Button>
		</div>
	);
}
