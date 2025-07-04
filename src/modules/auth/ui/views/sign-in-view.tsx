"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	AlertTriangle,
	CheckCircle,
	Eye,
	EyeOff,
	Fingerprint,
	HelpCircle,
	Key,
	Loader2,
	Mail,
	MapPin,
	Shield,
	Smartphone,
	User,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Alert, AlertDescription } from "@/components/shadcn/ui/alert";
import { Button } from "@/components/shadcn/ui/button";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { Separator } from "@/components/shadcn/ui/separator";
import { signInSchema } from "@/modules/auth/schema";
import {
	createOAuthProviders,
	OAuthProviders,
} from "@/modules/auth/ui/components/oauth-providers";

export default function SignInView() {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [loginMethod, setLoginMethod] = useState<
		"password" | "magicLink" | "biometric"
	>("password");
	const [showTwoFactor, setShowTwoFactor] = useState(false);
	const [isWebAuthnSupported, setIsWebAuthnSupported] = useState(false);
	const [accountStatus, setAccountStatus] = useState<{
		type: "locked" | "suspended" | "verification" | null;
		message?: string;
	}>({ type: null });
	const [loginAttempts, setLoginAttempts] = useState(0);
	const [deviceLocation, setDeviceLocation] = useState<string>("");
	const [magicLinkSent, setMagicLinkSent] = useState(false);
	const [magicLinkEmail, setMagicLinkEmail] = useState<string>("");

	// Check WebAuthn support on mount
	React.useEffect(() => {
		setIsWebAuthnSupported(
			typeof window !== "undefined" && window.PublicKeyCredential !== undefined,
		);

		// Simulate getting device location
		setDeviceLocation("San Francisco, CA");
	}, []);

	// Reset magic link state when switching methods
	React.useEffect(() => {
		if (loginMethod !== "magicLink") {
			setMagicLinkSent(false);
			setMagicLinkEmail("");
		}
	}, [loginMethod]);

	// OAuth providers configuration
	const handleOAuthLogin = (providerId: string) => {
		console.log(`OAuth login with ${providerId}`);
		setIsLoading(true);
		// Simulate OAuth process
		setTimeout(() => setIsLoading(false), 2000);
	};

	const oauthProviders = createOAuthProviders(
		["google", "apple", "microsoft", "github"],
		handleOAuthLogin,
	);

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			identifier: "",
			password: "",
			rememberMe: false,
			oauthProviders: [],
		},
	});

	const onSubmit = async (data: z.infer<typeof signInSchema>) => {
		setIsLoading(true);
		setLoginAttempts((prev) => prev + 1);

		try {
			// Simulate API call
			await new Promise((resolve, reject) => {
				setTimeout(() => {
					// Simulate different scenarios
					const scenarios = ["success", "2fa", "locked", "invalid"];
					const scenario =
						scenarios[Math.floor(Math.random() * scenarios.length)];

					switch (scenario) {
						case "success":
							resolve("success");
							break;
						case "2fa":
							setShowTwoFactor(true);
							resolve("2fa");
							break;
						case "locked":
							setAccountStatus({
								type: "locked",
								message: "Account locked due to multiple failed attempts",
							});
							reject(new Error("Account locked"));
							break;
						case "invalid":
							reject(new Error("Invalid credentials"));
							break;
						default:
							resolve("success");
					}
				}, 2000);
			});

			if (!showTwoFactor) {
				console.log("Login successful:", data);
				alert("Signed in successfully!");
			}
		} catch (error) {
			console.error("Login error:", error);
			form.setError("password", {
				message: error instanceof Error ? error.message : "Invalid credentials",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleMagicLink = async () => {
		// Clear any previous errors
		form.clearErrors("identifier");

		// Trigger form validation for the identifier field
		const identifierValue = form.getValues("identifier");

		if (!identifierValue?.trim()) {
			form.setError("identifier", {
				message: "Email is required for magic link",
			});
			return;
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(identifierValue.trim())) {
			form.setError("identifier", {
				message: "Please enter a valid email address for magic link",
			});
			return;
		}

		setIsLoading(true);

		try {
			// Simulate API call to send magic link
			await new Promise((resolve, reject) => {
				setTimeout(() => {
					// Simulate potential failures
					const success = Math.random() > 0.1; // 90% success rate
					if (success) {
						resolve("success");
					} else {
						reject(new Error("Failed to send magic link. Please try again."));
					}
				}, 1500);
			});

			// Success - show confirmation
			setMagicLinkSent(true);
			setMagicLinkEmail(identifierValue.trim());
		} catch (error) {
			console.error("Magic link error:", error);
			form.setError("identifier", {
				message:
					error instanceof Error ? error.message : "Failed to send magic link",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleResendMagicLink = async () => {
		if (!magicLinkEmail) return;

		setIsLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			// In a real app, you'd call your API here
			alert("Magic link resent successfully!");
		} catch (error) {
			console.error("Resend error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleBiometricAuth = async () => {
		if (!isWebAuthnSupported) {
			alert("Biometric authentication not supported on this device");
			return;
		}

		setIsLoading(true);
		try {
			// Simulate WebAuthn authentication
			await new Promise((resolve) => setTimeout(resolve, 1500));
			console.log("Biometric authentication successful");
			alert("Biometric authentication successful!");
		} catch (error) {
			console.error("Biometric auth error:", error);
			alert("Biometric authentication failed");
		} finally {
			setIsLoading(false);
		}
	};

	const handleTwoFactorSubmit = async (code: string) => {
		setIsLoading(true);
		try {
			// Validate the code format
			if (!/^\d{6}$/.test(code)) {
				throw new Error("Please enter a valid 6-digit code");
			}

			// Simulate API call with the verification code
			await new Promise((resolve, reject) => {
				setTimeout(() => {
					// Simulate validation - in real app, send code to backend
					const isValidCode = code === "123456" || Math.random() > 0.3; // Mock validation
					if (isValidCode) {
						resolve("success");
					} else {
						reject(new Error("Invalid verification code"));
					}
				}, 1000);
			});

			console.log("2FA successful with code:", code);
			alert("Two-factor authentication successful!");
			setShowTwoFactor(false);
		} catch (error) {
			console.error("2FA error:", error);
			// In a real implementation, you'd show this error in the UI
			alert(error instanceof Error ? error.message : "2FA verification failed");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto">
			<div className="bg-card rounded-lg shadow-lg p-8">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
					<p className="mt-2 text-muted-foreground">
						Sign in to your account to continue
					</p>
					{deviceLocation && (
						<div className="flex items-center justify-center mt-2 text-xs text-muted-foreground">
							<MapPin className="w-3 h-3 mr-1" />
							Signing in from {deviceLocation}
						</div>
					)}
				</div>

				{/* Account Status Alert */}
				{accountStatus.type && (
					<Alert className="mb-6" variant="destructive">
						<AlertTriangle className="h-4 w-4" />
						<AlertDescription>{accountStatus.message}</AlertDescription>
					</Alert>
				)}

				{/* Login Attempts Warning */}
				{loginAttempts >= 3 && (
					<Alert className="mb-6" variant="destructive">
						<Shield className="h-4 w-4" />
						<AlertDescription>
							Multiple failed attempts detected. Account will be locked after 5
							attempts.
						</AlertDescription>
					</Alert>
				)}

				{/* Magic Link Sent Confirmation */}
				{magicLinkSent && loginMethod === "magicLink" && (
					<Alert className="mb-6" variant="default">
						<CheckCircle className="h-4 w-4 text-green-600" />
						<AlertDescription>
							<div className="space-y-2">
								<p className="font-medium">Magic link sent!</p>
								<p className="text-sm">
									We've sent a sign-in link to <strong>{magicLinkEmail}</strong>
									. Check your email and click the link to sign in.
								</p>
								<Button
									variant="link"
									size="sm"
									onClick={handleResendMagicLink}
									disabled={isLoading}
									className="p-0 h-auto text-sm"
								>
									Didn't receive it? Resend magic link
								</Button>
							</div>
						</AlertDescription>
					</Alert>
				)}

				{/* Two-Factor Authentication */}
				{showTwoFactor ? (
					<TwoFactorForm
						onSubmit={handleTwoFactorSubmit}
						isLoading={isLoading}
						onBack={() => setShowTwoFactor(false)}
					/>
				) : (
					<>
						{/* OAuth Login */}
						<div className="mb-6">
							<OAuthProviders
								providers={oauthProviders}
								className="space-y-3"
							/>
						</div>

						<div className="relative mb-6">
							<div className="absolute inset-0 flex items-center">
								<Separator />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									Or continue with
								</span>
							</div>
						</div>

						{/* Login Method Selector */}
						<div className="flex space-x-2 mb-6">
							<Button
								type="button"
								variant={loginMethod === "password" ? "default" : "outline"}
								size="sm"
								onClick={() => setLoginMethod("password")}
								className="flex-1"
								disabled={isLoading}
							>
								<Key className="w-4 h-4 mr-2" />
								Password
							</Button>
							<Button
								type="button"
								variant={loginMethod === "magicLink" ? "default" : "outline"}
								size="sm"
								onClick={() => setLoginMethod("magicLink")}
								className="flex-1"
								disabled={isLoading}
							>
								<Mail className="w-4 h-4 mr-2" />
								Magic Link
							</Button>
							{isWebAuthnSupported && (
								<Button
									type="button"
									variant={loginMethod === "biometric" ? "default" : "outline"}
									size="sm"
									onClick={() => setLoginMethod("biometric")}
									className="flex-1"
									disabled={isLoading}
								>
									<Fingerprint className="w-4 h-4 mr-2" />
									Biometric
								</Button>
							)}
						</div>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								{loginMethod === "biometric" ? (
									<BiometricLogin
										onAuthenticate={handleBiometricAuth}
										isLoading={isLoading}
									/>
								) : (
									<>
										{/* Username/Email Field */}
										<FormField
											name="identifier"
											control={form.control}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="flex items-center">
														<User className="w-4 h-4 mr-2" />
														{loginMethod === "magicLink"
															? "Email Address"
															: "Username or Email"}
													</FormLabel>
													<FormControl>
														<Input
															type={
																loginMethod === "magicLink" ? "email" : "text"
															}
															placeholder={
																loginMethod === "magicLink"
																	? "Enter your email address"
																	: "Enter your username or email"
															}
															{...field}
															disabled={isLoading || magicLinkSent}
														/>
													</FormControl>
													<FormMessage />
													{loginMethod === "magicLink" && !magicLinkSent && (
														<p className="text-xs text-muted-foreground">
															We'll send you a secure link to sign in instantly
														</p>
													)}
												</FormItem>
											)}
										/>

										{/* Password Field (only for password method) */}
										{loginMethod === "password" && (
											<FormField
												name="password"
												control={form.control}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Password</FormLabel>
														<FormControl>
															<div className="relative">
																<Input
																	type={showPassword ? "text" : "password"}
																	placeholder="Enter your password"
																	{...field}
																	disabled={isLoading}
																/>
																<Button
																	type="button"
																	variant="ghost"
																	size="icon"
																	className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
																	onClick={() => setShowPassword(!showPassword)}
																	disabled={isLoading}
																>
																	{showPassword ? (
																		<EyeOff className="h-4 w-4" />
																	) : (
																		<Eye className="h-4 w-4" />
																	)}
																</Button>
															</div>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										)}

										{/* Remember Me and Options */}
										{loginMethod === "password" && (
											<div className="flex items-center justify-between">
												<FormField
													name="rememberMe"
													control={form.control}
													render={({ field }) => (
														<FormItem className="flex flex-row items-start space-x-3 space-y-0">
															<FormControl>
																<Checkbox
																	checked={field.value}
																	onCheckedChange={field.onChange}
																	disabled={isLoading}
																/>
															</FormControl>
															<div className="space-y-1 leading-none">
																<FormLabel className="text-sm">
																	Remember me
																</FormLabel>
															</div>
														</FormItem>
													)}
												/>

												<Link
													href="/forgot-password"
													className="text-sm text-primary hover:text-primary/80"
												>
													Forgot password?
												</Link>
											</div>
										)}

										{/* Submit Button */}
										{!magicLinkSent && (
											<Button
												type={loginMethod === "magicLink" ? "button" : "submit"}
												onClick={
													loginMethod === "magicLink"
														? handleMagicLink
														: undefined
												}
												disabled={isLoading}
												className="w-full"
											>
												{isLoading ? (
													<>
														<Loader2 className="mr-2 h-4 w-4 animate-spin" />
														{loginMethod === "magicLink"
															? "Sending magic link..."
															: "Signing in..."}
													</>
												) : loginMethod === "magicLink" ? (
													<>
														<Mail className="mr-2 h-4 w-4" />
														Send Magic Link
													</>
												) : (
													"Sign In"
												)}
											</Button>
										)}

										{/* Try Different Method Button for Magic Link */}
										{magicLinkSent && (
											<Button
												type="button"
												variant="outline"
												onClick={() => {
													setMagicLinkSent(false);
													setMagicLinkEmail("");
													setLoginMethod("password");
												}}
												className="w-full"
											>
												Try a different sign-in method
											</Button>
										)}
									</>
								)}
							</form>
						</Form>

						{/* Additional Options */}
						<div className="mt-6 space-y-4">
							<Separator />

							<div className="flex justify-center space-x-4 text-sm">
								<Link
									href="/forgot-username"
									className="text-muted-foreground hover:text-primary"
								>
									Forgot username?
								</Link>
								<span className="text-muted-foreground">•</span>
								<Link
									href="/help"
									className="text-muted-foreground hover:text-primary flex items-center"
								>
									<HelpCircle className="w-3 h-3 mr-1" />
									Need help?
								</Link>
							</div>
						</div>
					</>
				)}

				<p className="mt-6 text-center text-sm text-muted-foreground">
					Don't have an account?{" "}
					<Link
						href="/signup"
						className="font-medium text-primary hover:text-primary/80"
					>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}

// Two-Factor Authentication Component
function TwoFactorForm({
	onSubmit,
	isLoading,
	onBack,
}: {
	onSubmit: (code: string) => void;
	isLoading: boolean;
	onBack: () => void;
}) {
	const [code, setCode] = useState("");

	return (
		<div className="space-y-6">
			<div className="text-center">
				<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
					<Smartphone className="w-8 h-8 text-primary" />
				</div>
				<h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
				<p className="text-muted-foreground mt-2">
					Enter the verification code from your authenticator app
				</p>
			</div>

			<div className="space-y-4">
				<div>
					<label
						htmlFor="verification-code"
						className="block text-sm font-medium mb-2"
					>
						Verification Code
					</label>
					<Input
						type="text"
						placeholder="000000"
						value={code}
						onChange={(e) => setCode(e.target.value)}
						maxLength={6}
						className="text-center text-2xl tracking-widest"
						disabled={isLoading}
					/>
				</div>

				<div className="flex space-x-3">
					<Button
						type="button"
						variant="outline"
						onClick={onBack}
						disabled={isLoading}
						className="flex-1"
					>
						Back
					</Button>
					<Button
						type="button"
						onClick={() => onSubmit(code)}
						disabled={isLoading || code.length !== 6}
						className="flex-1"
					>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Verifying...
							</>
						) : (
							"Verify"
						)}
					</Button>
				</div>
			</div>

			<div className="text-center">
				<Button variant="link" className="text-sm">
					Didn't receive a code? Resend
				</Button>
			</div>
		</div>
	);
}

// Biometric Authentication Component
function BiometricLogin({
	onAuthenticate,
	isLoading,
}: {
	onAuthenticate: () => void;
	isLoading: boolean;
}) {
	return (
		<div className="text-center space-y-6">
			<div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
				<Fingerprint className="w-12 h-12 text-primary" />
			</div>

			<div>
				<h2 className="text-xl font-semibold mb-2">Biometric Authentication</h2>
				<p className="text-muted-foreground">
					Use your fingerprint, face, or security key to sign in
				</p>
			</div>

			<Button
				type="button"
				onClick={onAuthenticate}
				disabled={isLoading}
				className="w-full"
				size="lg"
			>
				{isLoading ? (
					<>
						<Loader2 className="mr-2 h-5 w-5 animate-spin" />
						Authenticating...
					</>
				) : (
					<>
						<Fingerprint className="mr-2 h-5 w-5" />
						Authenticate
					</>
				)}
			</Button>

			<p className="text-xs text-muted-foreground">
				Touch the fingerprint sensor or use your device's biometric
				authentication
			</p>
		</div>
	);
}
